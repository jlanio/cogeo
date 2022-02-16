
var baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var landsar2008 = L.tileLayer('http://www.car.gov.br/mosaicos/mosaicos_landsat_2008/{z}/{x}/{-y}.jpg');
var rapideye2011 = L.tileLayer('https://www.car.gov.br/mosaicos/{z}/{x}/{-y}.jpg');
var spot2008 = L.tileLayer('https://www.car.gov.br/mosaicos2/{z}/{x}/{-y}.jpg');
var rapideye2012 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2012/{z}/{x}/{-y}.jpg');
var rapideye2013 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2013/{z}/{x}/{-y}.jpg');
var rapideye2014 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2014/{z}/{x}/{-y}.jpg');
var ladsat2015 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2015/{z}/{x}/{-y}.jpg');
var sentinel2016 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2016/{z}/{x}/{-y}.jpg');
var ladsat2017 = L.tileLayer('http://car.sedam.ro.gov.br/mosaicos/2017/{z}/{x}/{-y}.jpg');

var baseLayers = {
    "BASEMAP": baseMap,
    "Landsar 2008": landsar2008,
    "Spot 2008": spot2008,
    //"Rapideye 2011": rapideye2011,
    //"Rapideye 2012": rapideye2012,
    //"Rapideye 2013": rapideye2013,
    //"Rapideye 2014": rapideye2014,
    //"Landsar 2015": ladsat2015,
    //"Sentinel 2016": sentinel2016,
    "Landsar 2017": ladsat2017,
};

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