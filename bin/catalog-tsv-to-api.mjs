import fs from "node:fs";
import { fetch } from "undici";

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
  const lines = tsv.trim().split('\n');

  const openDataCatalogResp = await fetch(`https://opendata.takamatsu-fact.com/index.json`);
  const openDataCatalog = await openDataCatalogResp.json();

  let out = [];

  for (const line of lines) {
    const lineParts = line.split('\t').map(x => x.trim());
    console.log(lineParts);
    const [flag, cat1n, cat2n, dataName, _fileName, fiwareName] = lineParts;
    if (flag === '') {
      // skip lines that aren't ready yes
      continue;
    }
    console.log('cat1:', cat1n, 'cat2:', cat2n, 'name', dataName);

    let itemCat;
    const idParts = [cat1n];
    let cat1 = out.find((x) => x.type === "Category" && x.name === cat1n);
    if (!cat1) {
      cat1 = { type: "Category", id: cat1n, name: cat1n, items: [] };
      out.push(cat1);
    }
    itemCat = cat1;

    if (cat2n !== 'ー' && cat2n !== '') {
      idParts.push(cat2n);
      let cat2 = cat1.items.find((x) => x.type === "Category" && x.name === cat2n);
      if (!cat2) {
        cat2 = { type: "Category", id: `${cat1n}/${cat2n}`, name: cat2n, items: [] };
        cat1.items.push(cat2);
      }
      itemCat = cat2;
    }

    if (itemCat.items.findIndex((x) => x.name === dataName) >= 0) {
      continue;
    }

    idParts.push(dataName);
    const id = idParts.join('/');
    const openDataMeta = openDataCatalog.find(x => x.name === dataName && x.location === true);
    if (!!fiwareName) {
      console.log(fiwareName);
      itemCat.items.push({
        type: "DataItem",
        id,
        name: dataName,
        class: dataName,
        liveLocationId: fiwareName,
        metadata: {},
      });
    } else if (openDataMeta) {
      itemCat.items.push({
        type: "DataItem",
        id,
        name: dataName,
        class: dataName,
        geojsonEndpoint: openDataMeta.json,
        metadata: {},
      });
    } else {
      itemCat.items.push({
        type: "DataItem",
        id,
        name: dataName,
        class: dataName,
        metadata: {},
      });
    }
  }

  out = flattenSingleMemberCategories(out);

  await fs.promises.writeFile('./public/api/catalog.json', JSON.stringify(out, undefined, 2));
}

main();
