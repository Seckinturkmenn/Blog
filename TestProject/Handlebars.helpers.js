Handlebars.registerHelper("editLocation", function (location) {
    return location.replace("                  Quick", "");
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    if (v1 == 'null') {
        v1 = null;
    }

    if (v2 == 'null') {
        v2 = null;
    }

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

/// Tarih formatları
var DateFormats = {
    short: "DD MMMM YYYY",
    long: "DD MMMM YYYY - HH:mm",
    daymonth: "DD MMMM",
    monthyear: "MMMM YYYY",
    time: "HH:mm"
};

Handlebars.registerHelper("formatDate", function (datetime, format) {

    if (moment) {
        format = DateFormats[format] || format;
        return moment(datetime).add(3, 'hours').format(format);
    }
    else {
        return datetime;
    }
});