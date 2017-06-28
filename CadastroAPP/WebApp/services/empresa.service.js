'use strict';

var empresaService = function ($http, $q, configuracaoService, storageService) {

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    var empresaServiceFactory = {};
    var dadosAutorizacao = storageService.get('autKey');

    var _obterEmpresa = function (empresaRequest) {
        return $http.get(apiServico + 'Empresa/Listar' +            
            '?Descricao=' + empresaRequest.Descricao +
            '&DataInico=' + empresaRequest.DataInicio +
            '&DataFim=' + empresaRequest.DataFim +
            '&Pagina=' + empresaRequest.Pagina +
            '&TotalResultadosPorPagina=' + empresaRequest.TotalResultadosPorPagina, { headers: { Authorization: authKey } });
    };
    
   
    var _excluirEmpresa = function (id) {
        var url = apiServico + "Empresa/Excluir/Id";
        var deferred = $q.defer();

        var data = $.param({ Id: id });

        $http.delete(url, {
            params: { Id: id },
            headers:
                  {
                      'Content-Type': 'application/json',
                      Authorization: authKey
                  }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }
       
    var _salvarEmpresa = function (formData) {
        if (formData.Id == null) {
            return inserirEmpresa(formData);
        } else {
            return alterarEmpresa(formData);
        }
    }

    var inserirEmpresa = function (formData) {
        var url = apiServico + "Inserir/Empresa/";
        var deferred = $q.defer();
        debugger;
        var data = {
            Descricao: formData.Descricao
        };

        $http.post(url, data, {
            headers:
                  {
                      'Content-Type': 'application/json',
                      Authorization: authKey
                  }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var alterarEmpresa = function (formData) {
        var url = apiServico + "Alterar/Empresa/Id/";
        var deferred = $q.defer();
        debugger;
        var data = {
            id :formData.Id,
            Descricao: formData.Descricao
        };

        $http.put(url, data, {
            headers:
                  {
                      'Content-Type': 'application/json',
                      Authorization: authKey
                  }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var _excluirEmpresa = function (id) {
        var url = apiServico + "Empresa/Excluir/Id";
        var deferred = $q.defer();

        var data = $.param({ Id: id });

        $http.delete(url, {
            params: { Id: id },
            headers:
                  {
                      'Content-Type': 'application/json',
                      Authorization: authKey
                  }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    empresaServiceFactory.obterEmpresa = _obterEmpresa;
    empresaServiceFactory.excluirEmpresa = _excluirEmpresa;
    empresaServiceFactory.salvarEmpresa = _salvarEmpresa;

    return empresaServiceFactory;
}

empresaService.$inject = ['$http', '$q', 'configuracaoService', 'storageService'];

app.
    factory('empresaService', empresaService);