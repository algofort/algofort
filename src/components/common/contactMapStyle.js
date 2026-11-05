export const CONTACT_MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/dark';
export const CONTACT_BUILDINGS_LAYER = 'algofort-3d-buildings';

// Exact pin from the user's https://maps.app.goo.gl/FgY71o4sqBrt1FQs6 link.
// Nominatim independently resolves it to building 84J (OSM way 516073520).
// Verified 2026-11-05; see docs/contact-map.md for the source records.
export const STUDIO_LOCATION = {
  coordinates: [67.054048, 24.8731622],
  address: '84j Ghazali Rd, P.E.C.H.S Block 2 Block 2 P.E.C.H.S., Karachi, 75300, Pakistan',
  mapUrl: 'https://www.openstreetmap.org/?mlat=24.8731622&mlon=67.054048#map=19/24.8731622/67.054048',
};

// OpenMapTiles may derive render_height from levels or use its own default.
// These are visualization heights, not a claim of measured building heights.
const buildingHeight = [
  'case',
  ['>', ['to-number', ['get', 'render_height'], 0], 0],
  ['to-number', ['get', 'render_height']],
  ['>', ['to-number', ['get', 'height'], 0], 0],
  ['to-number', ['get', 'height']],
  9,
];

const buildingBase = [
  'min', buildingHeight,
  ['max', 0, ['to-number', ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0], 0]],
];

/** Adapt the official dark style, retaining its free sources, fonts and sprites. */
export function createContactMapStyle(baseStyle) {
  const layers = baseStyle.layers.map((layer) => {
    const paint = { ...layer.paint };
    const sourceLayer = layer['source-layer'];

    if (layer.type === 'background') paint['background-color'] = '#223649';

    if (layer.type === 'fill') {
      if (sourceLayer === 'water') paint['fill-color'] = '#122c42';
      else if (sourceLayer === 'landcover' || layer.id === 'landuse_park') {
        paint['fill-color'] = '#28443f';
        // Use solid vegetation shading; the official dark sprite omits wood-pattern.
        delete paint['fill-pattern'];
      }
      else if (sourceLayer === 'landuse') paint['fill-color'] = '#23394a';
      else if (sourceLayer === 'building') {
        paint['fill-color'] = '#172b40';
        paint['fill-outline-color'] = '#30485c';
        paint['fill-opacity'] = ['interpolate', ['linear'], ['zoom'], 14, 0.8, 15.5, 0];
      } else if (sourceLayer === 'transportation' || sourceLayer === 'aeroway') {
        paint['fill-color'] = '#354b5b';
      }
    }

    if (layer.type === 'line') {
      if (sourceLayer === 'waterway') paint['line-color'] = '#122c42';
      else if (sourceLayer === 'transportation' || sourceLayer === 'aeroway') {
        paint['line-color'] = /casing/.test(layer.id)
          ? '#192d3f'
          : /subtle|dashline|path/.test(layer.id) ? '#6e808b' : '#465b69';
      } else if (sourceLayer === 'boundary') paint['line-color'] = '#617587';
    }

    if (layer.type === 'symbol') {
      if (layer.layout?.['text-field']) {
        paint['text-color'] = sourceLayer === 'water_name' ? '#80b4ce' : '#c0d0dc';
        paint['text-halo-color'] = '#152a3c';
        paint['text-halo-width'] = 1.25;
        paint['text-halo-blur'] = 0.5;
      }
      if (layer.id.startsWith('road_oneway')) paint['icon-opacity'] = 0.65;
    }

    return { ...layer, paint };
  });

  const buildingLayer = layers.find((layer) => layer['source-layer'] === 'building');
  if (!buildingLayer) throw new Error('The map style is missing its building source.');
  const poiFilter = ['<=', ['to-number', ['get', 'rank'], 100], 12];
  const poiColor = [
    'match', ['get', 'class'],
    'hospital', '#d09aaf', 'park', '#85ba9a', 'school', '#b5a2d9',
    'place_of_worship', '#d7be84', '#94bddb',
  ];

  // Draw ground geometry first, then buildings, then ALL labels and road symbols.
  // The official dark style has some symbol layers interleaved with ground layers.
  return {
    ...baseStyle,
    name: 'Algofort Studio · OpenFreeMap Dark',
    light: { anchor: 'map', color: '#d7e7f4', intensity: 0.48, position: [1.5, 215, 38] },
    layers: [
      ...layers.filter((layer) => layer.type !== 'symbol' && layer.type !== 'fill-extrusion'),
      {
        id: CONTACT_BUILDINGS_LAYER,
        type: 'fill-extrusion',
        source: buildingLayer.source,
        'source-layer': 'building',
        minzoom: 14.5,
        filter: ['!=', ['get', 'hide_3d'], true],
        paint: {
          'fill-extrusion-color': [
            'interpolate', ['linear'], buildingHeight,
            3, '#102338', 12, '#172e43', 35, '#233f56', 80, '#2d4b62',
          ],
          'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 14.5, 0, 15.5, buildingHeight],
          'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 14.5, 0, 15.5, buildingBase],
          'fill-extrusion-opacity': 1,
          'fill-extrusion-vertical-gradient': true,
        },
      },
      {
        id: 'algofort-landmarks',
        type: 'circle',
        source: buildingLayer.source,
        'source-layer': 'poi',
        minzoom: 16,
        filter: poiFilter,
        paint: {
          'circle-radius': 3,
          'circle-color': poiColor,
          'circle-stroke-color': '#152a3c',
          'circle-stroke-width': 1.5,
        },
      },
      ...layers.filter((layer) => layer.type === 'symbol'),
      {
        id: 'algofort-landmark-labels',
        type: 'symbol',
        source: buildingLayer.source,
        'source-layer': 'poi',
        minzoom: 16,
        filter: poiFilter,
        layout: {
          'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name:latin'], ['get', 'name']],
          'text-font': ['Noto Sans Regular'],
          'text-size': 10,
          'text-max-width': 11,
          'text-offset': [0, 0.8],
          'text-anchor': 'top',
          'symbol-sort-key': ['to-number', ['get', 'rank'], 100],
        },
        paint: { 'text-color': poiColor, 'text-halo-color': '#152a3c', 'text-halo-width': 1.25 },
      },
    ],
  };
}
