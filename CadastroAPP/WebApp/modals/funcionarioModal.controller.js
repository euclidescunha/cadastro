'use strict';

var funcionarioModalController = function ($scope, $state, $uibModalInstance, funcionarioService, registro) {
    var mc = this;

    mc.erro = {};
    mc.sucesso = {};
    mc.erro.mensagem = null;
    mc.sucesso.mensagem = null;
    mc.funcionario = null;

    mc.init = function () {
        mc.funcionario = registro;
    }

    mc.alteraFuncionario = function () {
        if (mc.funcionario !== null) {
            if (window.confirm("Deseja alterar o funcionario?")) {
                funcionarioService.editarFuncionario(mc.funcionario)
                    .then(
                        function (resultado) {
                            if (resultado.valido) {
                                mc.sucesso.mensagem = resultado.mensagem;
                            } else {
                                us.sucesso = null;
                                us.erro.mensagem = resultado.mensagem;
                            }
                        },
                        function (error) {
                            mc.sucesso = null;
                            mc.erro.mensagem = 'Dados inválidos';
                        });
            }
        } else {
            mc.sucesso = null;
            mc.erro.mensagem = 'Dados inválidos';
        };
    }

    mc.close = function () {
        $uibModalInstance.close(mc.funcionario);
    };

    mc.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}

funcionarioModalController.$inject = ['$scope', '$state', '$uibModalInstance', 'funcionarioService', 'registro'];

app
	.controller('funcionarioModalController', funcionarioModalController);
