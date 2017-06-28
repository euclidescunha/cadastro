'use strict';

var empresaModalController = function ($scope, $state, $uibModalInstance, empresaService, registro) {
    var bn = this;

    bn.erro = {};
    bn.sucesso = {};
    bn.erro.mensagem = null;
    bn.sucesso.mensagem = null;
    bn.empresa = null;

    bn.init = function () {
        bn.empresa = registro;
    }

    bn.salvarEmpresa = function () {
        if (bn.empresa !== null) {
            if (window.confirm("Deseja salvar empresa?")) {
                
                empresaService.salvarEmpresa(bn.empresa)
                    .then(
                        function (resultado) {
                            if (resultado.valido) {
                                bn.erro.mensagem = null;
                                bn.sucesso.mensagem = resultado.mensagem;
                            } else {
                                bn.sucesso.mensagem = null;
                                bn.erro.mensagem = resultado.mensagem;
                            }
                        },
                        function (error) {
                            bn.sucesso = null;
                            bn.erro.mensagem = 'Dados inválidos';
                        });
            }
        } else {
            bn.sucesso.mensagem = null;
            bn.erro.mensagem = 'Dados inválidos';
        };
    }

    bn.close = function () {
        $uibModalInstance.close(bn.empresa);
    };

    bn.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}

empresaModalController.$inject = ['$scope', '$state', '$uibModalInstance', 'empresaService', 'registro'];

app
	.controller('empresaModalController', empresaModalController);
