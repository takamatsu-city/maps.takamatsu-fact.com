import type { DataDrivenPropertyValueSpecification } from "maplibre-gl";
import { CatalogDataItem } from "../api/catalog";

export const lineWidth_thin: DataDrivenPropertyValueSpecification<number> = [
  "interpolate",
  ["linear"],
  ["zoom"],
  10, .5,
  20, 3,
];

export const lineWidth_bold: DataDrivenPropertyValueSpecification<number> = [
  "interpolate",
  ["linear"],
  ["zoom"],
  12, 1,
  20, 5,
];

export const WEB_COLORS = Object.entries({
  "MediumVioletRed": "199 21 133",
  "DeepPink": "255 20 147",
  "PaleVioletRed": "219 112 147",
  "HotPink": "255 105 180",
  "DarkRed": "139 0 0",
  "Red": "255 0 0",
  "Firebrick": "178 34 34",
  "Crimson": "220 20 60",
  "IndianRed": "205 92 92",
  "Salmon": "250 128 114",
  "DarkSalmon": "233 150 122",
  "OrangeRed": "255 69 0",
  "Tomato": "255 99 71",
  "DarkOrange": "255 140 0",
  "Coral": "255 127 80",
  "Orange": "255 165 0",
  "DarkKhaki": "189 183 107",
  "Gold": "255 215 0",
  "Khaki": "240 230 140",
  "PeachPuff": "255 218 185",
  "Maroon": "128 0 0",
  "Brown": "165 42 42",
  "SaddleBrown": "139 69 19",
  "Sienna": "160 82 45",
  "Chocolate": "210 105 30",
  "DarkGoldenrod": "184 134 11",
  "Peru": "205 133 63",
  "RosyBrown": "188 143 143",
  "Goldenrod": "218 165 32",
  "SandyBrown": "244 164 96",
  "DarkGreen": "0 100 0",
  "Green": "0 128 0",
  "DarkOliveGreen": "85 107 47",
  "ForestGreen": "34 139 34",
  "SeaGreen": "46 139 87",
  "Olive": "128 128 0",
  "OliveDrab": "107 142 35",
  "MediumSeaGreen": "60 179 113",
  "LimeGreen": "50 205 50",
  "Lime": "0 255 0",
  "SpringGreen": "0 255 127",
  "MediumSpringGreen": "0 250 154",
  "DarkSeaGreen": "143 188 143",
  "MediumAquamarine": "102 205 170",
  "YellowGreen": "154 205 50",
  "LawnGreen": "124 252 0",
  "Chartreuse": "127 255 0",
  "GreenYellow": "173 255 47",
  "PaleGreen": "152 251 152",
  "Teal": "0 128 128",
  "DarkCyan": "0 139 139",
  "CadetBlue": "95 158 160",
  "DarkTurquoise": "0 206 209",
  "MediumTurquoise": "72 209 204",
  "Turquoise": "64 224 208",
  "Aqua": "0 255 255",
  "Cyan": "0 255 255",
  "Aquamarine": "127 255 212",
  "MidnightBlue": "25 25 112",
  "Navy": "0 0 128",
  "DarkBlue": "0 0 139",
  "MediumBlue": "0 0 205",
  "Blue": "0 0 255",
  "RoyalBlue": "65 105 225",
  "SteelBlue": "70 130 180",
  "DodgerBlue": "30 144 255",
  "DeepSkyBlue": "0 191 255",
  "CornflowerBlue": "100 149 237",
  "Indigo": "75 0 130",
  "Purple": "128 0 128",
  "DarkMagenta": "139 0 139",
  "DarkViolet": "148 0 211",
  "DarkSlateBlue": "72 61 139",
  "BlueViolet": "138 43 226",
  "DarkOrchid": "153 50 204",
  "Fuchsia": "255 0 255",
  "Magenta": "255 0 255",
  "SlateBlue": "106 90 205",
  "MediumSlateBlue": "123 104 238",
  "MediumOrchid": "186 85 211",
  "MediumPurple": "147 112 219",
  "Orchid": "218 112 214",
  "Violet": "238 130 238",
  "Plum": "221 160 221",
  "Black": "0 0 0",
  "DarkSlateGray": "47 79 79",
  "DimGray": "105 105 105",
  "SlateGray": "112 128 144",
  "Gray": "128 128 128",
  "DarkGray": "169 169 169",
}).map(([key, value]) => {
  const [r, g, b] = value.split(' ').map(val => parseInt(val, 10));
  return `rgb(${r}, ${g}, ${b})`;
});

export type CustomStyle = {
  id: string
  filter?: any
  pattern?: string
  outlineColor?: string
  fillColor?: string
  lineColor?: string
  pointColor?: string
  pointLabel?: string
  lineWidth?: any
  opacity?: number
  lineOpacity?: number
}

const AREA_STYLES: { [key: string]: CustomStyle[] } = {
  "第一種低層住居専用地域": [
    {
      id: "",
      "fillColor": "rgb(36,190,159)",
      "outlineColor": "rgb(156,84,160)",
      "lineColor": "rgb(36,190,159)",
    },
  ],
  "第二種低層住居専用地域": [
    {
      id: "",
      "outlineColor": "rgb(156,84,160)",
      "fillColor": "rgb(215,237,229)",
    }
  ],
  "第一種中高層住居専用地域": [
    {
      id: "",
      "fillColor": "rgb(198,224,159)",
      "outlineColor": "rgb(156,84,160)",
    }
  ],
  "第二種中高層住居専用地域": [
    {
      id: "",
      "fillColor": "rgb(234,243,220)",
      "outlineColor": "rgb(156,84,160)"
    }
  ],
  "第一種住居地域": [
    {
      id: "",
      "fillColor": "rgb(255,246,152)",
      "outlineColor": "rgb(156,84,160)"
    }
  ],
  "第二種住居地域": [
    {
      id: "",
      "fillColor": "rgb(255,253,237)",
      "outlineColor": "rgb(156,84,160)"
    },
  ],
  "準住居地域": [
    {
      id: "",
      "fillColor": "rgb(251,194,144)",
      "outlineColor": "rgb(156,84,160)"
    }
  ],
  "近隣商業地域": [
    {
      id: "",
      "outlineColor": "rgb(179,114,173)",
      "fillColor": "rgb(252,226,225)",
    }
  ],
  "商業地域": [
    {
      id: "",
      "fillColor": "rgb(179,114,173)",
      "outlineColor": "rgb(241,93,125)",
    }
  ],
  "準工業地域": [
    {
      id: "",
      "fillColor": "rgb(220,201,225)",
      "outlineColor": "rgb(179,114,173)"
    }
  ],
  "工業地域": [
    {
      id: "",
      "fillColor": "rgb(217,235,248)",
      "outlineColor": "rgb(179,114,173)"
    }
  ],
  "工業専用地域": [
    {
      id: "",
      "fillColor": "rgb(145,201,237)",
      "outlineColor": "rgb(179,114,173)"
    }
  ],
  "都市計画情報/都市計画基本図": [
    {
      id: "",
      lineColor: "rgb(100,100,100)",
      lineWidth: 1,
      pointLabel: "{TextString}"
    }
  ], 
  "大字界": [
    {
      id: "",
      outlineColor: "#D99502",
      fillColor: "#F4CD78",
      lineWidth: 10,
      opacity: 0.3,
      lineOpacity: 1
    }
  ],
  "広域都市機能誘導区域":[
    {
      id: "",
      fillColor: "rgb(255,102,102)",
      outlineColor: "rgb(255,0,0)"
    }
  ],
  "一般都市機能誘導区域":[
    {
      id: "",
      fillColor: "rgb(240,174,126)",
      outlineColor: "rgb(230,121,40)"
    }
  ],
  "居住誘導区域":[
    {
      id: "",
      pattern: "custom:stripe-blue",
      outlineColor: "rgb(139,202,252)"
    }
  ]

};

export const getCustomStyle: (layerDefinition: CatalogDataItem) => CustomStyle[] | undefined = (def) => {
  return AREA_STYLES[def.class || def.id];
};

export type LayerSpecification = (
  maplibregl.FillLayerSpecification |
  maplibregl.LineLayerSpecification |
  maplibregl.SymbolLayerSpecification |
  maplibregl.CircleLayerSpecification
)

export type LayerTemplate = (LayerSpecification & {
  source?: string | maplibregl.SourceSpecification | undefined;
});

export const customStyleToPolygonTemplate: (customStyle: CustomStyle, defaultColor: string) => LayerTemplate[] = (style, color) => {
  const fillPaint = style.pattern ? { 'fill-pattern': style.pattern } : { 'fill-color': style.fillColor || color };
  return [
    {
      "id": `${style.id}`,
      source: "takamatsu",
      "source-layer": "main",
      type: "fill",
      filter: style.filter,
      paint: {
        "fill-opacity": style.opacity ?? 0.8,
        ...fillPaint,
      },
    },
    {
      "id": `${style.id}/outline`,
      source: "takamatsu",
      "source-layer": "main",
      type: "line",
      filter: style.filter,
      paint: {
        "line-color": style.outlineColor || color,
        "line-width": lineWidth_thin,
        "line-opacity": style.lineOpacity ?? 1,
      },
    }
  ];
}

export const customStyleToLineStringTemplate: (customStyle: CustomStyle, defaultColor: string) => LayerTemplate[] = (style, color) => [
  {
    "id": `${style.id}`,
    source: "takamatsu",
    "source-layer": "main",
    type: "line",
    filter: style.filter,
    paint: {
      "line-color": style.lineColor || color,
      "line-width": style.lineWidth || lineWidth_bold,
    },
  },
];

export const customStyleToPointTemplate: (customStyle: CustomStyle, defaultColor: string) => LayerTemplate[] = (style, color) => {
  let out: LayerTemplate[] = [];
  if (style.pointLabel) {
    out.push({
      "id": `${style.id}/label`,
      source: "takamatsu",
      "source-layer": "main",
      type: "symbol",
      filter: style.filter,
      layout: {
        'text-field': style.pointLabel,
        'text-size': 12,
        'text-offset': [0, -0.7],
        'text-anchor': 'top',
        'text-font': ["Noto Sans Regular"],
      },
      paint: {
        'text-color': 'black',
        'text-halo-color': 'white',
        'text-halo-width': 1,
      },
    });
  } else {
    out.push({
      "id": `${style.id}`,
      source: "takamatsu",
      "source-layer": "main",
      type: "circle",
      filter: style.filter,
      paint: {
        'circle-radius': 7,
        'circle-color': style.pointColor || color,
        'circle-opacity': .8,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'gray',
        'circle-stroke-opacity': 1,
      }
    });
  }
  return out;
};

export const DEFAULT_POLYGON_STYLE: (color: string) => LayerTemplate[] = (color) => [
  {
    id: "",
    source: "takamatsu",
    "source-layer": "main",
    type: "fill",
    paint: {
      "fill-color": color,
      "fill-opacity": 0.7,
    },
  },
  {
    id: "/outline",
    source: "takamatsu",
    "source-layer": "main",
    type: "line",
    paint: {
      "line-color": color,
      "line-width": lineWidth_thin,
    },
  },
];

export const DEFAULT_LINESTRING_STYLE: (color: string) => LayerTemplate[] = (color) => [{
  id: "",
  source: "takamatsu",
  "source-layer": "main",
  type: "line",
  paint: {
    "line-color": color,
    "line-width": lineWidth_bold,
  },
}];

export const DEFAULT_POINT_STYLE: (color: string) => LayerTemplate[] = (color) => [{
  id: "",
  source: "takamatsu",
  "source-layer": "main",
  type: "circle",
  paint: {
    'circle-radius': 7,
    'circle-color': color,
    'circle-opacity': .8,
    'circle-stroke-width': 1,
    'circle-stroke-color': 'gray',
    'circle-stroke-opacity': 1,
  }
}];
