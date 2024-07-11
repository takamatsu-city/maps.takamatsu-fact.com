export const OSM_LAYER = [
    {
        "id": "landcover-wood",
        "type": "fill",
        "source": "v3",
        "source-layer": "landcover",
        "filter": [
            "==",
            "class",
            "wood"
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-color": {
                "stops": [
                    [
                        5,
                        "#a5d47b"
                    ],
                    [
                        8,
                        "#bce398"
                    ]
                ]
            },
            "fill-antialias": {
                "base": 1,
                "stops": [
                    [
                        0,
                        false
                    ],
                    [
                        9,
                        true
                    ]
                ]
            }
        }
    },
    {
        "id": "landcover-grass-park",
        "type": "fill",
        "source": "v3",
        "source-layer": "park",
        "filter": [
            "==",
            "class",
            "public_park"
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-color": "#d8e8c8",
            "fill-opacity": 0.8
        }
    },
    {
        "id": "geolonia-water-ocean",
        "type": "fill",
        "source": "v3",
        "source-layer": "water",
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-color": "#65cbf9"
        }
    },
    {
        "id": "water-blur",
        "type": "line",
        "source": "v3",
        "source-layer": "water",
        "minzoom": 17,
        "layout": {
            "line-join": "round",
            "visibility": "visible"
        },
        "paint": {
            "line-color": "#62cffc",
            "line-width": {
                "stops": [
                    [
                        17,
                        3
                    ],
                    [
                        20,
                        5
                    ]
                ]
            },
            "line-translate": {
                "stops": [
                    [
                        17,
                        [
                            1,
                            1
                        ]
                    ],
                    [
                        20,
                        [
                            -2,
                            -2
                        ]
                    ]
                ]
            },
            "line-blur": 2
        }
    },
    {
        "id": "nt-water-name-ocean",
        "type": "symbol",
        "source": "v3",
        "source-layer": "nt-water-name",
        "minzoom": 8,
        "filter": [
            "==",
            [
                "get",
                "class"
            ],
            "ocean"
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "point",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2
        },
        "paint": {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "nt-water-name-river",
        "type": "symbol",
        "source": "v3",
        "source-layer": "nt-water-name",
        "minzoom": 13,
        "filter": [
            "==",
            [
                "get",
                "class"
            ],
            "river"
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "point",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2
        },
        "paint": {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "park",
        "type": "fill",
        "source": "v3",
        "source-layer": "park",
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Polygon"
            ],
            [
                "!=",
                "class",
                "national_park"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-color": "rgba(102, 170, 68, 1)",
            "fill-opacity": {
                "stops": [
                    [
                        7,
                        0
                    ],
                    [
                        9,
                        0.2
                    ]
                ]
            }
        }
    },
    {
        "id": "waterway_tunnel",
        "type": "line",
        "source": "v3",
        "source-layer": "waterway",
        "minzoom": 14,
        "filter": [
            "all",
            [
                "in",
                "class",
                "river",
                "stream",
                "canal"
            ],
            [
                "==",
                "brunnel",
                "tunnel"
            ]
        ],
        "layout": {
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#65cbf9",
            "line-width": {
                "base": 1.3,
                "stops": [
                    [
                        13,
                        0.5
                    ],
                    [
                        20,
                        6
                    ]
                ]
            },
            "line-dasharray": [
                2,
                4
            ]
        }
    },
    {
        "id": "waterway-other",
        "type": "line",
        "source": "v3",
        "source-layer": "waterway",
        "filter": [
            "!in",
            "class",
            "canal",
            "river",
            "stream"
        ],
        "layout": {
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#65cbf9",
            "line-width": {
                "base": 1.3,
                "stops": [
                    [
                        13,
                        0.5
                    ],
                    [
                        20,
                        2
                    ]
                ]
            }
        }
    },
    {
        "id": "waterway-stream-canal",
        "type": "line",
        "source": "v3",
        "source-layer": "waterway",
        "filter": [
            "all",
            [
                "in",
                "class",
                "canal",
                "stream"
            ],
            [
                "!=",
                "brunnel",
                "tunnel"
            ]
        ],
        "layout": {
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#65cbf9",
            "line-width": {
                "base": 1.3,
                "stops": [
                    [
                        13,
                        0.5
                    ],
                    [
                        20,
                        6
                    ]
                ]
            }
        }
    },
    {
        "id": "waterway-name",
        "type": "symbol",
        "source": "v3",
        "source-layer": "waterway",
        "minzoom": 13,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "LineString"
            ],
            [
                "has",
                "name"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
            "text-letter-spacing": 0.2,
            "symbol-spacing": 350
        },
        "paint": {
            "text-color": "#65cbf9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "water-name-lakeline",
        "type": "symbol",
        "source": "v3",
        "source-layer": "water_name",
        "filter": [
            "all",
            [
                "==",
                "$type",
                "LineString"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2
        },
        "paint": {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "water-name-ocean",
        "type": "symbol",
        "source": "v3",
        "source-layer": "water_name",
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "==",
                "class",
                "ocean"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "point",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2
        },
        "paint": {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "water-name-other",
        "type": "symbol",
        "source": "v3",
        "source-layer": "water_name",
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "!in",
                "class",
                "ocean"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ],
            [
                "!=",
                "subclass",
                "moat"
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": {
                "stops": [
                    [
                        0,
                        10
                    ],
                    [
                        6,
                        14
                    ]
                ]
            },
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 5,
            "text-rotation-alignment": "map",
            "symbol-placement": "point",
            "symbol-spacing": 350,
            "text-letter-spacing": 0.2,
            "visibility": "visible"
        },
        "paint": {
            "text-color": "#74aee9",
            "text-halo-width": 1.5,
            "text-halo-color": "rgba(255,255,255,0.7)"
        }
    },
    {
        "id": "poi",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 16,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                ">",
                "rank",
                25
            ],
            [
                "has",
                "name"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-size": 12,
            "text-max-width": 9,
            "text-variable-anchor": [
                "top",
                "bottom",
                "left",
                "right"
            ],
            "text-radial-offset": 0.7,
            "text-justify": "center",
            "text-anchor": "center"
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-z15",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 15,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "in",
                "class",
                "bank",
                "parking",
                "grocery",
                "shop",
                "school",
                "hospital"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-z14",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 14,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "in",
                "class",
                "college",
                "castle",
                "aquarium",
                "cinema",
                "theatre",
                "zoo",
                "convenience",
                "lodging"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-z13",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 13,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "in",
                "class",
                "stadium",
                "landmark",
                "monument",
                "museum",
                "town_hall",
                "golf"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-worship",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 16,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "!has",
                "wikidata"
            ],
            [
                "in",
                "class",
                "place_of_worship"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-worship-primary",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 14,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "has",
                "wikidata"
            ],
            [
                "in",
                "class",
                "place_of_worship"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "icon-padding": [
                "interpolate",
                [
                    "linear"
                ],
                [
                    "zoom"
                ],
                11,
                30,
                15,
                2
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-park",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 16,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "!has",
                "wikidata"
            ],
            [
                "in",
                "class",
                "park"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-park-primary",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 13,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "has",
                "wikidata"
            ],
            [
                "in",
                "class",
                "park"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    [
                        "get",
                        "class"
                    ]
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "icon-padding": [
                "interpolate",
                [
                    "linear"
                ],
                [
                    "zoom"
                ],
                11,
                15,
                15,
                2
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-railway",
        "type": "symbol",
        "source": "v3",
        "source-layer": "poi",
        "minzoom": 11,
        "filter": [
            "all",
            [
                "==",
                "$type",
                "Point"
            ],
            [
                "has",
                "name"
            ],
            [
                "==",
                "class",
                "railway"
            ],
            [
                "==",
                "subclass",
                "station"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans CJK JP Bold"
            ],
            "text-anchor": "top",
            "icon-anchor": "bottom",
            "icon-image": [
                "coalesce",
                [
                    "image",
                    "railway"
                ],
                [
                    "image",
                    "circle-stroked"
                ]
            ],
            "icon-padding": [
                "interpolate",
                [
                    "linear"
                ],
                [
                    "zoom"
                ],
                11,
                50,
                13,
                30,
                15,
                2
            ],
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.3
            ],
            "text-size": 12,
            "text-max-width": 9,
            "icon-optional": false,
            "icon-ignore-placement": false,
            "icon-allow-overlap": false,
            "text-ignore-placement": false,
            "text-allow-overlap": false,
            "text-optional": true
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#415CBD",
            "text-halo-width": 2,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "poi-airport-primary",
        "type": "symbol",
        "source": "v3",
        "source-layer": "aerodrome_label",
        "minzoom": 10,
        "filter": [
            "all",
            [
                "has",
                "iata"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-image": "airport",
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.6
            ],
            "text-size": 12,
            "text-max-width": 9,
            "icon-size": 1,
            "text-optional": true,
            "visibility": "visible"
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "airport-label-major",
        "type": "symbol",
        "source": "v3",
        "source-layer": "aerodrome_label",
        "minzoom": 5,
        "filter": [
            "all",
            [
                "has",
                "iata"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-padding": 2,
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-anchor": "top",
            "icon-image": "airport",
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-offset": [
                0,
                0.6
            ],
            "text-size": 12,
            "text-max-width": 9
        },
        "paint": {
            "text-halo-blur": 0.5,
            "text-color": "#666",
            "text-halo-width": 1,
            "text-halo-color": "#ffffff"
        }
    },
    {
        "id": "place-village",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 9,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "==",
                "class",
                "village"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": {
                "base": 1.2,
                "stops": [
                    [
                        10,
                        12
                    ],
                    [
                        15,
                        22
                    ]
                ]
            },
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-town",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8.5,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "==",
                "class",
                "town"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 12,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-island-name",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "filter": [
            "all",
            [
                "==",
                [
                    "get",
                    "class"
                ],
                "island"
            ],
            [
                "!=",
                [
                    "get",
                    "disputed"
                ],
                "japan_northern_territories"
            ],
            [
                "any",
                [
                    "!=",
                    [
                        "get",
                        "subclass"
                    ],
                    "islet"
                ],
                [
                    ">=",
                    [
                        "zoom"
                    ],
                    16
                ]
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 11,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank10",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                10
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank9",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                9
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank8",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                8
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank7",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                7
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank6",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 11,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                6
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank5",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 10,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                5
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank4",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 9,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                4
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.3,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 14,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank3",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                3
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle",
            "icon-size": 0.4,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.1
            ],
            "text-font": [
                "Noto Sans Regular"
            ],
            "text-size": 16,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(102, 102, 102, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-rank2",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "minzoom": 8,
        "maxzoom": 13,
        "filter": [
            "all",
            [
                "!=",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "==",
                "rank",
                2
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "icon-image": "circle-stroked",
            "icon-size": 0.8,
            "text-anchor": "top",
            "text-offset": [
                0,
                0.2
            ],
            "text-font": [
                "Noto Sans CJK JP Bold"
            ],
            "text-size": 17,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "visibility": "visible"
        },
        "paint": {
            "icon-color": "#000000",
            "icon-opacity": {
                "stops": [
                    [
                        11.9,
                        1
                    ],
                    [
                        12,
                        0
                    ]
                ]
            },
            "text-color": "rgba(68, 68, 68, 1)",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    },
    {
        "id": "place-city-capital",
        "type": "symbol",
        "source": "v3",
        "source-layer": "place",
        "maxzoom": 11,
        "filter": [
            "all",
            [
                "==",
                "capital",
                2
            ],
            [
                "==",
                "class",
                "city"
            ],
            [
                "!=",
                "disputed",
                "japan_northern_territories"
            ]
        ],
        "layout": {
            "text-font": [
                "Noto Sans CJK JP Bold"
            ],
            "text-size": 18,
            "text-field": [
                "string",
                [
                    "get",
                    "name:ja"
                ],
                [
                    "get",
                    "name"
                ]
            ],
            "text-max-width": 8,
            "icon-image": "star",
            "text-offset": [
                0.4,
                -0.1
            ],
            "icon-size": 1,
            "text-anchor": "left",
            "visibility": "visible"
        },
        "paint": {
            "text-color": "#333",
            "text-halo-width": 1.2,
            "text-halo-color": "rgba(255,255,255,0.8)"
        }
    }
]