#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const url = 'https://raw.githubusercontent.com/geoloniamaps/gsi/use-v3-tiles/docs/style.json';

const downloadStyle = async () => {
  const response = await fetch(url);
  let rawStyleJson = (await response.text())
    .replace(/"{name}"/g, '["string", ["get", "name:ja"], ["get", "name"]]');
  const styleJson = JSON.parse(rawStyleJson);

  styleJson.sprite = "https://api.geolonia.com/v1/sprites/gsi";
  delete styleJson.sources.dem;

  /**
   * 不要なレイヤーを削除
   */
  const removeLayerIds = ['poi-z16', 'poi-z16-primary', 'hillshading'];
  styleJson.layers = styleJson.layers.filter(layer => !removeLayerIds.includes(layer.id));
  // layer.metadata['visible-on-3d] が存在するレイヤーを削除
  styleJson.layers = styleJson.layers.filter(layer => !layer.metadata || !layer.metadata['visible-on-3d']);
  // oc- から始まるレイヤーを削除
  styleJson.layers = styleJson.layers.filter(layer => !layer.id.startsWith('oc-'));


  const removeSourceIds = ['landcover', 'landuse', 'building'];
  const targetLayers = [];

  for (const layer of styleJson.layers) {
    // レイヤーのソースが削除対象のソースでなければ追加する
    if (!removeSourceIds.includes(layer["source-layer"]) || layer.id === 'landcover-wood') {
      targetLayers.push(layer);
    }
  }

  styleJson.layers = targetLayers;
  const styleJsonString = JSON.stringify(styleJson).replace('["!in","subclass","community_centre"],', "");

  await fs.promises.writeFile(
    path.resolve(__dirname, "../public/customStyles/baseStyle.json"),
    styleJsonString,
  );
};

downloadStyle();
