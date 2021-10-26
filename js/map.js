let myMap;

const init = () => {
  myMap = new ymaps.Map("map",{
    center: [55.750915, 37.603577], 
    zoom: 14,
    controls: []
  });

  const coords = [
    [55.752004, 37.576133],
    [55.758697, 37.583254],
    [55.750915, 37.603577],
    [55.757364, 37.624507]
  ];

  const myCollection = new ymaps.GeoObjectCollection({},{
    draggable: false,
    iconLayout: 'default#image',

    iconImageHref: "./svg/map-marker.svg", 
    iconImageSize: [58, 73],
    iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);
