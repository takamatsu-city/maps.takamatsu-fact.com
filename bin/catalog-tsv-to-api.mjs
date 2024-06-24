import fs from "node:fs";
import { fetch } from "undici";

// https://stackoverflow.com/a/27696695
// Adapted to use url-safe base64 encoding
const Base64 = (function () {
  var digitsStr =
  //   0       8       16      24      32      40      48      56     63
  //   v       v       v       v       v       v       v       v      v
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  var digits = digitsStr.split('');
  var digitsMap = {};
  for (var i = 0; i < digits.length; i++) {
      digitsMap[digits[i]] = i;
  }
  return {
      fromInt: function(int32) {
          var result = '';
          while (true) {
              result = digits[int32 & 0x3f] + result;
              int32 >>>= 6;
              if (int32 === 0)
                  break;
          }
          return result;
      },
  };
})();

function flattenSingleMemberCategories(items) {
  return items.map((item) => {
    if (item.type === "DataItem") {
      return item;
    } else if (item.type === "Category") {
      if (item.items.length === 1 && item.items[0].name === item.name) {
        return item.items[0];
      } else {
        return {
          ...item,
          items: flattenSingleMemberCategories(item.items),
        }
      }
    }
    throw new Error("shouldn't get here");
  });
}

async function main() {
  const tsv = await fs.promises.readFile('./public/api/catalog.tsv', { encoding: 'utf8' });
  const lines = tsv.split('\n');

  const shortIdMapping = {};
  try {
    const previousCatalog = await fs.promises.readFile('./public/api/catalog.json', { encoding: 'utf8' });
    const previousCatalogJson = JSON.parse(previousCatalog);
    const walk = (items, currentPath = []) => {
      for (const item of items) {
        shortIdMapping[currentPath.concat(item.name).join('/')] = item.shortId;

        if (item.type === "Category") {
          walk(item.items, currentPath.concat(item.name));
        }
      }
    }
    walk(previousCatalogJson);
    console.log('loaded previous catalog', shortIdMapping);
  } catch (e) {
    console.log('No previous catalog found, creating a new one');
  }

  const getShortId = (name) => {
    if (shortIdMapping[name]) {
      return shortIdMapping[name];
    }
    // create a new id, a random number between 0x00000 and 0x3FFFF
    // 0x3FFFF is chosen because it's the maximum value that can be fit in 3 characters
    // of base64 encoding.
    // Note: Math.random() returns a number >= 0 and < 1, so if we use Math.floor,
    // we won't go over 0x3FFFF.
    let tries = 0, id;
    while (true) {
      id = Base64.fromInt(Math.floor(Math.random() * 0x40000)).padStart(3, '0');
      if (id.length !== 3) {
        // just in case
        throw new Error('id length is not 3');
      }
      if (!Object.values(shortIdMapping).includes(id)) {
        break;
      }
      tries++;
      if (tries > 100) {
        throw new Error('too many tries');
      }
    }
    shortIdMapping[name] = id;
    return id;
  };

  const openDataCatalogResp = await fetch(`https://opendata.takamatsu-fact.com/index.json`);
  const openDataCatalog = await openDataCatalogResp.json();

  let out = [];

  for (const line of lines) {
    const lineParts = line.split('\t').map(x => x.trim());
    const [flag, _id, cat1n, cat2n, dataName, fileName, fiwareName] = lineParts;
    if (flag === '') {
      // skip lines that aren't ready yes
      continue;
    }

    let itemCat;
    const idParts = [];
    if (cat1n !== 'ー' && cat1n !== '') {
      idParts.push(cat1n);
      let cat1 = out.find((x) => x.type === "Category" && x.name === cat1n);
      if (!cat1) {
        cat1 = {
          type: "Category",
          id: cat1n,
          shortId: getShortId(cat1n),
          name: cat1n,
          items: []
        };
        out.push(cat1);
      }
      itemCat = cat1;

      if (cat2n !== 'ー' && cat2n !== '') {
        idParts.push(cat2n);
        let cat2 = cat1.items.find((x) => x.type === "Category" && x.name === cat2n);
        if (!cat2) {
          cat2 = {
            type: "Category",
            id: `${cat1n}/${cat2n}`,
            shortId: getShortId(`${cat1n}/${cat2n}`),
            name: cat2n,
            items: []
          };
          cat1.items.push(cat2);
        }
        itemCat = cat2;
      }
    }

    if (typeof itemCat !== 'undefined' && itemCat.items.findIndex((x) => x.name === dataName) >= 0) {
      continue;
    }

    idParts.push(dataName);
    const id = idParts.join('/');
    const shortId = getShortId(id);
    const openDataMeta = openDataCatalog.find(x => x.name === dataName && x.location === true);

    const itemAry = typeof itemCat === 'undefined' ? out : itemCat.items;

    // the file name is used as the class name, without parenthesis
    const className = fileName.replace(/\(.*?\)/, '');
    const customDataSource = fileName.match(/^!([^!]+)!(.*)$/);
    if (!!fiwareName) {
      itemAry.push({
        type: "DataItem",
        id,
        shortId,
        name: dataName,
        class: dataName, // className is empty for FIWARE, so use dataName instead.
        liveLocationId: fiwareName,
        metadata: {},
      });
    } else if (openDataMeta) {
      itemAry.push({
        type: "DataItem",
        id,
        shortId,
        name: dataName,
        class: className,
        geojsonEndpoint: openDataMeta.json,
        metadata: {},
      });
    } else if (customDataSource) {
      itemAry.push({
        type: "DataItem",
        id,
        shortId,
        name: dataName,
        customDataSource: customDataSource[1],
        metadata: {},
      });
    } else {
      itemAry.push({
        type: "DataItem",
        id,
        shortId,
        name: dataName,
        class: className,
        metadata: {},
      });
    }
  }

  out = flattenSingleMemberCategories(out);

  await fs.promises.writeFile(
    './public/api/catalog.json',
    JSON.stringify(out, undefined, 2) + '\n',
  );
}

main();
