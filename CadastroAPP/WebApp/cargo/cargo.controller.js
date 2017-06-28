'use strict';

var cargoController = function ($scope, $state, $uibModal, autService, cargoService) {
    var usu = this;

    usu.init = function () {
        var autenticacao = autService.dadosAutenticacao();
        if (autenticacao != null && autenticacao.autenticado) {
            usu.responseCargo = {};
            usu.PaginaAtual = 1;
            usu.TotalPaginas = 1;
            usu.TotalDeRegistros = 1;
            usu.maxSize = 5
            usu.cargoRequest =
               {
                   NomeCargo: null,
                   Pagina: 1,
                   TotalResultadosPorPagina: 10,
               };
            obterCargo();
        } else {
            $state.go('login')
        }
    }

    usu.filtrar = function () {
        usu.cargoRequest.Pagina = 1;
        obterCargo();
    }

    var obterCargo = function () {
        cargoService.obterCargo(usu.cargoRequest)
            .then(function (response) {
                usu.responseCargo = response.data;
                usu.PaginaAtual = usu.cargoRequest.Pagina;
                usu.TotalPaginas = response.data.TotalPaginas;
                usu.TotalDeRegistros = response.data.TotalDeRegistros;

            }, function (err) {
                //TODO tratar erros
            });
    }

    usu.excluirCargo = function (Id, login) {
        if (window.confirm("Deseja Exluir o Usuário " + login + "?")) {
            cargoService.excluirCargo(Id)
                .then(function (response) {
                    obterCargo();
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
        obterCargo();
    };


    //modal =====================================================================
    usu.openModalCargo = function (registro) {

        var modalEditarCargo = $uibModal.open({
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

        modalEditarCargo.result.then(
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