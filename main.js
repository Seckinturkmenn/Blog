var contentData = {};
var headerData = {};
var blueIcon = {};
var greenIcon = {};
var redIcon = {};

$(document).ready(function () {
    compilePage();
});

function compilePage(){

    var seconds=60;

    var x = setInterval(function() {
    seconds = seconds-1;  
    document.querySelector("#timer").innerHTML = seconds + "s ";

    if (seconds < 0) {
        clearInterval(x);
        compilePage();
    }
    }, 1000);

    
    $('#table_id').DataTable();
    $.ajax({
        url: "https://api.orhanaydogdu.com.tr/deprem/live.php?limit=50",
        type: "GET",
        async: false,
        success: function (data) {
            contentData.kandilli = data.result;
        },
        error: console.log("Deprem verisi alınamadı!")
    });

    $.ajax({
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
        type: "GET",
        async: false,
        success: function (data) {
            contentData.earthquake = data.features;
        },
        error: console.log("Deprem verisi alınamadı!")
    });

    $.ajax({
        url: "Content/header.html",
        type: "GET",
        async: false,
        success: function (header) {
            $("#m_header").html(Handlebars.compile(header)(headerData));
        },
        error: console.log("Sayfa compile edilemedi.")
    });
    getEarthIconCounts();
    getKandilliIconCounts();
    $.ajax({
        url: "Content/mapPage.html",
        type: "GET",
        async: false,
        success: function (mapPage) {
            $("#m_content").html(Handlebars.compile(mapPage)(contentData));
        },
        error: console.log("Sayfa compile edilemedi.")
    });
    CreateMap();
}

function CreateMap(){
    greenIcon = new L.Icon({
        iconUrl: 'images/marker-icon-2x-green.png',
        shadowUrl: 'images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    redIcon = new L.Icon({
        iconUrl: 'images/marker-icon-2x-red.png',
        shadowUrl: 'images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    blueIcon = new L.Icon({
        iconUrl: 'images/marker-icon-2x-blue.png',
        shadowUrl: 'images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    createEarthquakeMap();
    createKandilliMap();
}

function createKandilliMap(){
    var map = L.map('mapKandilli', {
        center: [contentData.kandilli[0].lat, contentData.kandilli[0].lng],
        zoom: 6
    });

    //L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: ' &copy; <a href="https://www.seckinturkmen.com/" target="_blank">OpenStreetMap</a> katılımcıları'
    }).addTo(map);   

    for(var i=0; i < contentData.kandilli.length; i++) {
        if(contentData.kandilli[i].mag <= 3)
        {
            L.marker([contentData.kandilli[i].lat, contentData.kandilli[i].lng], { icon: blueIcon }).addTo(map).bindPopup(contentData.kandilli[i].lokasyon + "<br> Tarih: " + contentData.kandilli[i].date);
        }
        else if(contentData.kandilli[i].mag > 3 && contentData.kandilli[i].mag <= 6)
        {
            L.marker([contentData.kandilli[i].lat, contentData.kandilli[i].lng], { icon: greenIcon }).addTo(map).bindPopup(contentData.kandilli[i].lokasyon + "<br> Tarih: " + contentData.kandilli[i].date);
        }  
        else
        {
            L.marker([contentData.kandilli[i].lat, contentData.kandilli[i].lng], { icon: redIcon }).addTo(map).bindPopup(contentData.kandilli[i].lokasyon + "<br> Tarih: " + contentData.kandilli[i].date); 
        }   
    }
}

function createEarthquakeMap(){
    var map = L.map('map', {
        center: [contentData.earthquake[0].geometry.coordinates[1], contentData.earthquake[0].geometry.coordinates[0]],
        zoom: 6
    });

    //L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: ' &copy; <a href="https://www.seckinturkmen.com/" target="_blank">OpenStreetMap</a> katılımcıları'
    }).addTo(map);   

    for(var i=0; i < contentData.earthquake.length; i++) {
        if(contentData.earthquake[i].properties.mag <= 3)
        {
            L.marker([contentData.earthquake[i].geometry.coordinates[1], contentData.earthquake[i].geometry.coordinates[0]], { icon: blueIcon }).addTo(map).bindPopup(contentData.earthquake[i].properties.place);
        }
        else if(contentData.earthquake[i].properties.mag > 3 && contentData.earthquake[i].properties.mag <= 6)
        {
            L.marker([contentData.earthquake[i].geometry.coordinates[1], contentData.earthquake[i].geometry.coordinates[0]], { icon: greenIcon }).addTo(map).bindPopup(contentData.earthquake[i].properties.place);
        }  
        else
        {
            L.marker([contentData.earthquake[i].geometry.coordinates[1], contentData.earthquake[i].geometry.coordinates[0]], { icon: redIcon }).addTo(map).bindPopup(contentData.earthquake[i].properties.place); 
        }   
    }
}

function getKandilliIconCounts(){
    contentData.kandilliBlueIconCount = 0;
    contentData.kandilliRedIconCount = 0;
    contentData.kandilliGreenIconCount = 0;

    for(var i=0; i < contentData.kandilli.length; i++) {
        if(contentData.kandilli[i].mag <= 3)
        {
            contentData.kandilliBlueIconCount++;
        }
        else if(contentData.kandilli[i].mag > 3 && contentData.kandilli[i].mag <= 6)
        {
            contentData.kandilliGreenIconCount++;
        }  
        else
        {
            contentData.kandilliRedIconCount++;
        }   
    }
}

function getEarthIconCounts(){
    contentData.blueIconCount = 0;
    contentData.redIconCount = 0;
    contentData.greenIconCount = 0;

    for(var i=0; i < contentData.earthquake.length; i++) {
        if(contentData.earthquake[i].properties.mag <= 3)
        {
            contentData.blueIconCount++;
        }
        else if(contentData.earthquake[i].properties.mag > 3 && contentData.earthquake[i].properties.mag <= 6)
        {
            contentData.greenIconCount++;
        }  
        else
        {
            contentData.redIconCount++;
        }   
    }
}