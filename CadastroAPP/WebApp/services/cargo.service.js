'use strict';

var cargoService = function ($http, configuracaoService, storageService) {

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    var cargoServiceFactory = {};
    var dadosAutorizacao = storageService.get('autKey');

    var _obterCargo = function () {
        return [{ cargo: 'Assistente', id: 1 }, { cargo: 'Analista', id: 2 }, { cargo: 'Gerente', id: 3}];

        //return $http.get(apiServico + 'Cargo/Listar' +
        //    '?NomeCargo=' + cargoRequest.NomeCargo +
        //    '&Pagina=' + cargoRequest.Pagina +
        //    '&TotalResultadosPorPagina=' + cargoRequest.TotalResultadosPorPagina, { headers: { Authorization: authKey } });
    };

    cargoServiceFactory.obterCargo = _obterCargo;

    return cargoServiceFactory;
}

cargoService.$inject = ['$http', 'configuracaoService', 'storageService'];

app.
    factory('cargoService', cargoService);