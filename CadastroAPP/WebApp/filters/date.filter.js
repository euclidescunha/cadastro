'use strict';

app.filter('filtroData', function () {
    return function (date) {
        //TODO modificar Date extendendo prototype
        if (date == null || date.trim() == '') return null;
        var d = date.split('/');       
        return new Date(d[1] + '/' + d[0] + '/' + d[2]).toLocaleDateString();
    }
});