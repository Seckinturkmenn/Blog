Handlebars.registerHelper("fromNow", function (index) {
    return moment(contentData.earthquake[index].properties.updated).fromNow();
});

Handlebars.registerHelper("getTitle", function (index) {
    return contentData.earthquake[index].properties.title;
});

Handlebars.registerHelper("getPlace", function (index) {
    return contentData.earthquake[index].properties.place;
});
