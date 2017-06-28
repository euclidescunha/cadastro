'use strict';

var cargoController = function ($scope, $state, $uibModal, autService, cargoService) {
    var usu = this;

    usu.init = function () {
        var autenticacao = autService.dadosAutenticacao();
        if (autenticacao != null && autenticacao.autenticado) {
            usu.responseUsuario = {};
            usu.PaginaAtual = 1;
            usu.TotalPaginas = 1;
            usu.TotalDeRegistros = 1;
            usu.maxSize = 5
            usu.cargoRequest =
               {
                   NomeUsuario: null,
                   Pagina: 1,
                   TotalResultadosPorPagina: 10,
               };
            obterUsuario();
        } else {
            $state.go('login')
        }
    }

    usu.filtrar = function () {
        usu.cargoRequest.Pagina = 1;
        obterUsuario();
    }

    var obterUsuario = function () {
        cargoService.obterUsuario(usu.cargoRequest)
            .then(function (response) {
                usu.responseUsuario = response.data;
                usu.PaginaAtual = usu.cargoRequest.Pagina;
                usu.TotalPaginas = response.data.TotalPaginas;
                usu.TotalDeRegistros = response.data.TotalDeRegistros;

            }, function (err) {
                //TODO tratar erros
            });
    }

    usu.excluirUsuario = function (Id, login) {
        if (window.confirm("Deseja Exluir o Usuário " + login + "?")) {
            cargoService.excluirUsuario(Id)
                .then(function (response) {
                    obterUsuario();
                }, function (err) {
                    //Todo erros
                });
        }

    }


    //Paginação ===============================================================

    $scope.setPage = function (pageNo) {
        usu.PaginaAtual = pageNo;
    };

    $scope.pageChanged = function () {
        usu.cargoRequest.Pagina = usu.PaginaAtual;
        obterUsuario();
    };


    //modal =====================================================================
    usu.openModalUsuario = function (registro) {

        var modalEditarUsuario = $uibModal.open({
            templateUrl: 'modals/cargoModal.html',
            controller: 'cargoModalController',
            controllerAs: 'modalcargo',
            size: 'lg',
            resolve: {
                registro: function () {
                    return registro;
                }
            }
        });

        modalEditarUsuario.result.then(
            function (valor) {
                usu.filtrar();
            }, function () {
                usu.filtrar();
            }
        );
    }

}

cargoController.$inject = ['$scope', '$state', '$uibModal', 'autService', 'cargoService'];

app
	.controller('cargoController', cargoController);