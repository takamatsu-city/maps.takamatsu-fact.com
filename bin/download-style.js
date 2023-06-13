#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const url = 'https://raw.githubusercontent.com/geoloniamaps/gsi/use-v3-tiles/docs/style.json';

const downloadStyle = async () => {

  const response = await fetch(url);
  let rawStyleJson = (await response.text())
    .replace(/"{name}"/g, '["string", ["get", "name:ja"], ["get", "name"]]');

  const styleJson = JSON.parse(rawStyleJson);

  delete styleJson.sources.dem;

  styleJson.layers = styleJson.layers.filter(layer => layer.id !== 'hillshading');

  const styleJsonString = JSON.stringify(styleJson);

  await fs.promises.writeFile(
    path.resolve(__dirname, "../src/style.json"),
    styleJsonString,
  );
};

downloadStyle();
