function getColor(layer) {
    return layer == 'ucs_e' ? '#800026' :
           layer == 'ucs_f'  ? '#BD0026' :
           layer == 'ti'  ? '#E31A1C' :
           layer == 100  ? '#FC4E2A' :
           layer == 50   ? '#FD8D3C' :
           layer == 20   ? '#FEB24C' :
           layer == 10   ? '#FED976' :
                      '#FFEDA0';
  }
  
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.tipo),
        weight: 2,
        opacity: 50,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
  }
  