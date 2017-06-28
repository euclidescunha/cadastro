'use strict';

var autService = function ($q, storageService, $http, configuracaoService, utilsService) {

    var autServiceFactory = {};
    var _dadosAutenticacao = function () {
        var autenticao = { autenticado: false, nome: '' }
        var dadosAutorizacao = storageService.get('autKey');
        
        if (dadosAutorizacao) {
            autenticao.autenticado = dadosAutorizacao.autenticado;
            autenticao.nome = dadosAutorizacao.usuario;
        }

        return autenticao;
    }

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    
    var _entrar = function (dadosLogin) {
        var url = apiServico + "Usuario/Validar/";
        var deferred = $q.defer();

        var data = {
            login: dadosLogin.usuario,
            senha: dadosLogin.senha
        };

        //$http.post(url, data, {
        //    headers:
        //          {
        //              'Content-Type': 'application/json',
        //              Authorization: authKey
        //          }
        //}).then(function (response) {
            
        //    if (response.data.valido === true)
                storageService.set('autKey',
                    {
                        autenticado: true, usuario: dadosLogin.usuario, mlcid: utilsService.crypt(dadosLogin.usuario),
                        mlpa: utilsService.crypt(dadosLogin.senha)
                    });

        //    else _sair();
                        
            deferred.resolve(_dadosAutenticacao());

        //}, function (err) {
        //    _sair();
        //    deferred.reject(err);
        //});

               
        return deferred.promise;

    };

    var _sair = function () {
        storageService.excluir('autKey');
    };

    autServiceFactory.entrar = _entrar;
    autServiceFactory.sair = _sair;
    autServiceFactory.dadosAutenticacao = _dadosAutenticacao;

    return autServiceFactory;
}

autService.$inject = ['$q', 'storageService', '$http', 'configuracaoService', 'utilsService'];

app.
    factory('autService', autService);