'use strict';

var usuarioService = function ($http, $q, configuracaoService, storageService) {

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    var usuarioServiceFactory = {};
    var dadosAutorizacao = storageService.get('autKey');

    var _obterUsuario = function (usuarioRequest) {
        return $http.get(apiServico + 'Usuario/Listar' +
            '?NomeUsuario=' + usuarioRequest.NomeUsuario +
            '&Pagina=' + usuarioRequest.Pagina +
            '&TotalResultadosPorPagina=' + usuarioRequest.TotalResultadosPorPagina, { headers: { Authorization: authKey } });
    };

    var _salvarUsuario = function (formData) {
        if (formData.IdLogin == null) {
            return incluirUsuario(formData);
        }
        else {
            return alterarUsuario(formData);
        }
    }

    var incluirUsuario = function (formData) {

        var url = apiServico + "Usuario/Incluir/";
        var deferred = $q.defer();

        var data = {
            IdLogin: formData.IdLogin,
            Login: formData.Login,
            Senha: formData.Senha,
            SenhaRedigitada: formData.SenhaRedigitada,
            DataCriacao: formData.DataCriacao
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

    var alterarUsuario = function (formData) {

        var url = apiServico + "Usuario/Alterar/";
        var deferred = $q.defer();

        var data = {
            IdLogin: formData.IdLogin,
            Login: formData.Login,
            Senha: formData.Senha,
            SenhaRedigitada: formData.SenhaRedigitada,
            DataCriacao: formData.DataCriacao
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



    var _excluirUsuario = function (id) {
        var url = apiServico + "Usuario/Excluir/Id";
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
    
    usuarioServiceFactory.obterUsuario = _obterUsuario;
    usuarioServiceFactory.salvarUsuario = _salvarUsuario;
    usuarioServiceFactory.excluirUsuario = _excluirUsuario;

    return usuarioServiceFactory;
}

usuarioService.$inject = ['$http', '$q', 'configuracaoService', 'storageService'];

app.
    factory('usuarioService', usuarioService);