
ymaps.ready(init);
function init() {
    var ymap = new ymaps.Map('ymaps', {
            center: [55.7506, 37.6224],
            zoom: 8,
            type: "yandex#map",
            controls: ['zoomControl'],
            //controls: [],
            behaviors: ['scrollZoom','default']
        }, {
            searchControlProvider: 'yandex#search'
    }); 
   
    var searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search',
            resultsPerPage: 10,
            position: { top: 5, left: 5 },
            width:200
        }
    });
    
    ymap.controls.add(searchControl);
    ymap.controls.add("zoomControl");
    ymap.behaviors.enable('scrollZoom');
    ymap.behaviors.enable('default');
  
    ymap.events.add('click', onMapClick);
   
   
    function onMapClick(e) {
        if(e.get('type') === 'click') { }
 

    }
    //при назжатии на Показать еще 10 результатов згружаются последующие сады но хотелось бы все сразу в функции searchControl.search
    searchControl.events.add('load',function (e) {
            var geoObjectsArray = searchControl.getResultsArray();
            alert(geoObjectsArray.length);
            //alert(Object.keys(geoObjectsArray[0].properties.getAll()));
             //name, description, boundedBy, type, responseMetaData, type, companyMetaData, id, address, url, categories, categoriesText
            //phoneNumbers, workingTime, workingStatus, workingTimeModel, rating, yandex, loc 
            for(var  i = 0; i < geoObjectsArray.length ; i++ ) {
                var school = new ymaps.Placemark( geoObjectsArray[i].geometry.getCoordinates(),
                          { iconContent: geoObjectsArray[i].properties.get('name') }, { preset: 'islands#darkOrangeStretchyIcon' });
                ymap.geoObjects.add(school);
            }                      
    });
    
    searchControl.events.add('resultshow',function (e) {
    });
    searchControl.events.add('select',function (e) {
        alert(e.get('resultIndex').value);
    });

                                                               //{ geoObjects, responseMetadData } 
    searchControl.search('Серпуховской район детский сад').then(function (geoObjectsArr) { //Серпуховской район школа
            
           /* alert(searchControl.getResultsCount() + ' '+ geoObjectsArr.geoObjects.getLength() );
            alert(geoObjectsArr.geoObjects.get(0).properties.get('name'));
           
            for(var  i = 0; i < searchControl.getResultsCount() ; i++ ) {
                searchControl.getResult(i).then(function (result) {             
                    var school = new ymaps.Placemark( result.geometry.getCoordinates(),
                          { iconContent: result.properties.get('name') }, { preset: 'islands#yellowStretchyIcon' });
                    ymap.geoObjects.add(school);
                });
            }*/
           
    });
  
}
