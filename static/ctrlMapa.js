var map = L.map('map', {
  center: [-11, -63],
  zoom: 7,
  layers: [baseMap]
});

// Carrega todas as camadas do geoserver
var ip = '35.184.49.136:8080';
  axios.get(`http://${ip}/geoserver/ows?service=wfs&version=2.0.0&request=GetCapabilities`).then(e => {
    $xml = $($.parseXML(e.data)),
      title = $xml.find("Title");
    var camada = title.toArray();
    var layerGroups = {}

     camada.forEach(element => {
     	let nomeCamada = element.previousSibling.firstChild.data;
     	let nomeAmbiente = nomeCamada.split(':');
     	
      layerGroups[element.innerHTML] = L.layerGroup()
      axios.get(`http://${ip}/geoserver/${nomeAmbiente[0]}/ows?service=WFS
      &version=1.0.0&request=GetFeature&typeName=${nomeCamada}&outputFormat=application%2Fjson`).then(e => {
        layerGroups[element.innerHTML].addLayer(L.geoJson(e.data, {style: style}))
      })
    });
  L.control.layers(null,layerGroups, {collapsed: false }).addTo(map);
})

// Add KML do MAP
// async function readText(event) {
//   const file = event.target.files.item(0)
//   const kmltext = await file.text();
//   const parser = new DOMParser();
//   const kml = parser.parseFromString(kmltext, 'text/xml');
//   const track = new L.KML(kml);
//   track.addTo(map)
// }
// map.pm.addControls({ position: 'topleft', drawCircle: false,});

L.control.layers(baseLayers,null, {collapsed: false }).addTo(map);
L.control.scale().addTo(map);



var wmsLayer = L.tileLayer.wms('http://35.184.49.136:8080/geoserver/ows?', {
    layers: 'UCs_Estaduais',
    format: 'image/png',
    transparent: 'true',
    opacity: 0.5
}).addTo(map);