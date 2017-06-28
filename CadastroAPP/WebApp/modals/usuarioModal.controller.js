'use strict';

var usuarioModalController = function ($scope, $state, $uibModalInstance, usuarioService, registro) {
    var us = this;

    us.hasError = false;
    us.messageError = '';

    us.usuario = {
        IdLogin: null,
        Login: null,
        Senha: null,
        SenhaRedigitada: null
    };

    us.init = function () {
        if (registro) {
            us.usuario.IdLogin = registro.IdLogin;
            us.usuario.Login = registro.Login;
        }
        us.erro = {};
        us.sucesso = {};
        us.erro.mensagem = null;
        us.sucesso.mensagem = null;

    }

    us.salvarUsuario = function () {        
        if (us.usuario !== null) {
            if (window.confirm("Deseja salvar o Usuário?")) {
                usuarioService.salvarUsuario(us.usuario)
                    .then(
                        function (resultado) {                            
                            if (resultado.valido) {
                                us.erro.mensagem = null;
                                us.sucesso.mensagem = resultado.mensagem;                                
                            } else {
                                us.sucesso = null;
                                us.erro.mensagem = resultado.mensagem;
                            }
                        },
                        function (error) {
                            us.sucesso = null;
                            us.erro.mensagem = resultado.mensagem;
                        });
            }
        } else {
            us.sucesso = null;
            us.erro.mensagem = 'Dados inválidos';
        };
    }

    us.close = function () {
        $uibModalInstance.close(us.funcionario);
    };

    us.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}

usuarioModalController.$inject = ['$scope', '$state', '$uibModalInstance', 'usuarioService', 'registro'];

app
	.controller('usuarioModalController', usuarioModalController);