'use strict';

var funcionarioService = function ($http, $q, configuracaoService, storageService) {

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    var funcionarioServiceFactory = {};
    var dadosAutorizacao = storageService.get('autKey');

    var _obterFuncionario = function (funcionarioRequest) {
        return $http.get(apiServico + 'Filtro/Listar' +
            '?CodigoFuncionario=' + funcionarioRequest.CodigoFuncionario +
            '&CodEmpresa=' + funcionarioRequest.CodEmpresa +
            '&DataInicio=' + funcionarioRequest.DataInicio +
            '&DataFim=' + funcionarioRequest.DataFim +
            '&Pagina=' + funcionarioRequest.Pagina +
            '&TotalResultadosPorPagina=' + funcionarioRequest.TotalResultadosPorPagina, { headers: { Authorization: authKey } });
    };
    
    var _editarFuncionario = function (formData) {
        var url = apiServico + "Alterar/Id/";
        var deferred = $q.defer();
        
        var data = {
            Id: formData.IdFuncionario,
            DataInicio: formData.DataInicio,
            DataFim: formData.DataFim,
            MaxUtilizacao: formData.MaxUtilizacao
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

    var _excluirFuncionario = function (id) {
        var url = apiServico + "Excluir/Id";
        var deferred = $q.defer();

        var data = $.param({ Id: id });

        $http.delete(url, {
            params :{Id: id },
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

    funcionarioServiceFactory.obterFuncionario = _obterFuncionario;
    funcionarioServiceFactory.editarFuncionario = _editarFuncionario;
    funcionarioServiceFactory.excluirFuncionario = _excluirFuncionario;
    
    return funcionarioServiceFactory;
}

funcionarioService.$inject = ['$http', '$q', 'configuracaoService','storageService'];

app.
    factory('funcionarioService', funcionarioService);
