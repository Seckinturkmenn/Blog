var contentData = {};
var headerData = {};
var blueIcon = {};
var greenIcon = {};
var redIcon = {};

$(document).ready(function () {
    contentData.selectedTab = 0;
    compilePage();
});

function compilePage(){
    var x2js = new X2JS();
    var seconds=300;

    var x = setInterval(function() {
    seconds = seconds-1;  
    document.querySelector("#timer").innerHTML = seconds + "s ";

    if (seconds < 0) {
        clearInterval(x);
        compilePage();
    }
    }, 1000);


    $.ajax({
        url: "https://cors-proxy.seckinturkmen.workers.dev/?http://udim.koeri.boun.edu.tr/zeqmap/xmle/son24saat.xml",
        type: "GET",
        async: false,
        success: function (data) {
            var x2js = new X2JS();
            contentData.kandilli = x2js.xml_str2json(new XMLSerializer().serializeToString(data.documentElement)).eqlist.earhquake;
        },
        error: console.log("Sayfa compile edilemedi.")
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

    getKandilliIconCounts();

    $.ajax({
        url: "Content/mapPage.html",
        type: "GET",
        async: false,
        success: function (mapPage) {
            $("#m_content").html(Handlebars.compile(mapPage)(contentData));
        },
        error: console.log("hata")
    });

    CreateMap();
    $('#table_id').DataTable();
}

function setSelectedTab(index){
    contentData.selectedTab = index;
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

    var map = L.map('mapKandilli', {
        center: [38.934027, 35.407766],
        zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: ' &copy; <a href="https://www.seckinturkmen.com/" target="_blank">OpenStreetMap</a> katılımcıları'
    }).addTo(map);   

    for(var i=0; i < contentData.kandilli.length; i++) {
        if(contentData.kandilli[i]._mag <= 3)
        {
            L.marker([contentData.kandilli[i]._lat, contentData.kandilli[i]._lng], { icon: blueIcon }).addTo(map).bindPopup(Handlebars.helpers.editLocation(contentData.kandilli[i]._lokasyon) + "<br> Tarih: " + contentData.kandilli[i]._name + "<br> Enlem : " + contentData.kandilli[i]._lat + "<br> Boylam : " + contentData.kandilli[i]._lng + "<br> Şiddeti : " + contentData.kandilli[i]._mag + "<br> Derinlik :" + contentData.kandilli[i]._Depth);
        }
        else if(contentData.kandilli[i]._mag > 3 && contentData.kandilli[i]._mag <= 6)
        {
            L.marker([contentData.kandilli[i]._lat, contentData.kandilli[i]._lng], { icon: greenIcon }).addTo(map).bindPopup(Handlebars.helpers.editLocation(contentData.kandilli[i]._lokasyon) + "<br> Tarih: " + contentData.kandilli[i]._name + "<br> Enlem : " + contentData.kandilli[i]._lat + "<br> Boylam : " + contentData.kandilli[i]._lng + "<br> Şiddeti : " + contentData.kandilli[i]._mag + "<br> Derinlik :" + contentData.kandilli[i]._Depth);
        }  
        else
        {
            L.marker([contentData.kandilli[i]._lat, contentData.kandilli[i]._lng], { icon: redIcon }).addTo(map).bindPopup(Handlebars.helpers.editLocation(contentData.kandilli[i]._lokasyon) + "<br> Tarih: " + contentData.kandilli[i]._name + "<br> Enlem : " + contentData.kandilli[i]._lat + "<br> Boylam : " + contentData.kandilli[i]._lng + "<br> Şiddeti : " + contentData.kandilli[i]._mag + "<br> Derinlik :" + contentData.kandilli[i]._Depth); 
        }   
    }
}

function getKandilliIconCounts(){
    contentData.kandilliBlueIconCount = 0;
    contentData.kandilliRedIconCount = 0;
    contentData.kandilliGreenIconCount = 0;

    for(var i=0; i < contentData.kandilli.length; i++) {
        if(contentData.kandilli[i]._mag <= 3)
        {
            contentData.kandilliBlueIconCount++;
        }
        else if(contentData.kandilli[i]._mag > 3 && contentData.kandilli[i]._mag <= 6)
        {
            contentData.kandilliGreenIconCount++;
        }  
        else
        {
            contentData.kandilliRedIconCount++;
        }   
    }
}