'use strict';

var loginController = function ($scope, $state, autService) {

    var lc = this;

    var _init = function () {
        lc.dados = {};
        lc.erro = {};
        lc.dados.usuario = '';
        lc.dados.senha = '';
        lc.erro.mensagem = null;
        autService.sair();        
    };
    
    var _entrar = function () {
        autService.entrar(lc.dados).
            then(function (resultado) {                
                if (resultado.autenticado) {                
                    lc.erro.mensagem = null;
                    $state.go('usuario');
                } else {                    
                    lc.erro.mensagem = 'Dados inválidos';
                    document.querySelector('#loginUser').focus();
                }
            },
            function (erro) {                
                lc.erro.mensagem = erro;
                document.querySelector('#loginUser').focus();
            });        
    }

    lc.init = _init;
    lc.entrar = _entrar;
}

loginController.$inject = ['$scope', '$state', 'autService'];

app
  .controller('loginController', loginController);
