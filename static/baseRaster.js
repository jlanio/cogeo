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