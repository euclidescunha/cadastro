'use strict';

var empresaController = function ($scope, $state, $uibModal, autService, empresaService, cargoService) {
    var cp = this;
    cp.cargos = {};
    cp.cargoSelecionada = 0;

    cp.init = function () {
        var autenticacao = autService.dadosAutenticacao();
        if (autenticacao != null && autenticacao.autenticado) {

            cp.arquivo = null;
            cp.obterCargo();
            cp.responseEmpresa = {};
            cp.PaginaAtual = 1;
            cp.TotalPaginas = 1;
            cp.TotalDeRegistros = 1;
            cp.maxSize = 5
            cp.empresaRequest =
               {
                   CodigoEmpresa: null,
                   CodEmpresa: null,
                   DataInicio: null,
                   DataFim: null,
                   Pagina: 1,
                   TotalResultadosPorPagina: 10,
               };
            obterEmpresa();
        } else {
            $state.go('login')
        }
    }

    cp.filtrar = function () {
        cp.empresaRequest.Pagina = 1;
        obterEmpresa();
    }

    cp.obterCargo = function () {

        cp.cargos = cargoService.obterCargo();
       
    }

    var obterEmpresa = function () {
        empresaService.obterEmpresa(cp.empresaRequest)
            .then(function (response) {
                cp.responseEmpresa = response.data;
                               
                cp.PaginaAtual = cp.empresaRequest.Pagina;
                cp.TotalPaginas = response.data.TotalPaginas;
                cp.TotalDeRegistros = response.data.TotalDeRegistros;

            }, function (err) {

            });
    }

    cp.excluirEmpresa = function (Id) {
        if (window.confirm("Deseja Exluir o empresa " + Id + "?")) {
            empresaService.excluirEmpresa(Id)
                .then(function (response) {
                    obterEmpresa();
                }, function (err) {
                    //Todo erros
                });
        }
    }

    //Paginação ===============================================================

    $scope.setPage = function (pageNo) {
        cp.PaginaAtual = pageNo;
    };

    $scope.pageChanged = function () {
        cp.empresaRequest.Pagina = cp.PaginaAtual;
        obterEmpresa();
    };

    //modal =====================================================================
    cp.openModalEditar = function (size, registro) {
        
        var modalEditarEmpresa = $uibModal.open({
            templateUrl: 'modals/empresaModal.html',
            controller: empresaModalController,
            controllerAs: 'modalempresa',
            size: size,
            resolve: {
                registro: function () {
                    return registro;
                }
            }
        });

        modalEditarEmpresa.result.then(function (valor) {
            cp.filtrar();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

}

empresaController.$inject = ['$scope', '$state', '$uibModal', 'autService', 'empresaService', 'cargoService'];

app
	.controller('empresaController', empresaController);
