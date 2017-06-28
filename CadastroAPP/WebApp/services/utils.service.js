'use strict';

var utilsService = function () {

    var us = {};

    var _findElementFromArray = function (arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] === propValue)
                return arr[i];

        return null;
    }
       
    var _formatarValor = function (valor) {
        if (valor == undefined || valor === '')
            return 0;

        else return parseFloat(valor).toFixed(2).replace('.', ',');
    }

    var _crypt = function (value) {
        return value.split('').reverse().join('');
    }

    var _decrypt = function (value) {
        return value.split('').reverse().join('');
    }

    us.crypt = _crypt;
    us.decrypt = _decrypt;
    us.formatarValor = _formatarValor;    
    us.findElementFromArray = _findElementFromArray;

    return us;
}

utilsService.$inject = [];

app.
    factory('utilsService', utilsService);