'use strict';

var storageService = function ($localStorage, $sessionStorage) {
    /* ----------- PROPRIEDADES ----------- */
    var storageServiceFactory = {};
    var tipo = 'local';
    /* ----------- PROPRIEDADES ----------- */

    /* ----------- FUNÇÕES INTERNAS ----------- */
    var _configurar = function (_tipo) {
        tipo = _tipo;
    }

    var _get = function (k) {
        if (tipo === 'session')
            return eval("$sessionStorage." + k);
        else if (tipo === 'local')
            return eval("$localStorage." + k);;
    }

    var _set = function (k, v) {
        if (tipo === 'session')
            $sessionStorage[k] = v;
        else if (tipo === 'local')
            $localStorage[k] = v;
    }

    var _excluir = function (k, v) {        
        if (tipo === 'session')
            eval("delete $sessionStorage." + k + ";");
        else if (tipo === 'local')
            eval("delete $localStorage." + k + ";");
    }
    /* ----------- FUNÇÕES INTERNAS ----------- */

    /* ----------- FUNÇÕES EXTERNAS ----------- */
    storageServiceFactory.configurar = _configurar;
    storageServiceFactory.get = _get;
    storageServiceFactory.set = _set;
    storageServiceFactory.excluir = _excluir;
    /* ----------- FUNÇÕES EXTERNAS ----------- */

    return storageServiceFactory;
}

storageService.$inject = ['$localStorage', '$sessionStorage'];

app.
    factory('storageService', storageService);

