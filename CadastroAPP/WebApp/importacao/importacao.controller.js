'use strict';

var importacaoController = function ($scope, $state, autService, $uibModal, importacaoService, cargoService) {
    var ic = this;
    ic.cargos = {};
    ic.cargoSelecionada = 0;

   
    ic.init = function () {
        var autenticacao = autService.dadosAutenticacao();
        if (autenticacao != null && autenticacao.autenticado) {
            
            ic.arquivo = null;
            ic.obterCargo();
            ic.responseImportacao = {};
            ic.PaginaAtual = 1;
            ic.TotalPaginas = 1;
            ic.TotalDeRegistros = 1;
            ic.maxSize = 5
            ic.importacaoRequest =
               {
                   Usuario: null,
                   NomeArquivo: null,
                   DataInicio: null,
                   DataFim: null,
                   Pagina: 1,
                   TotalResultadosPorPagina: 10,
               };
            obterLogImportacao();
        } else {
            $state.go('login');
        }
    }

    ic.filtrar = function(){
        ic.importacaoRequest.Pagina = 1;
        obterLogImportacao();
    }

    ic.obterCargo = function () {
        
        ic.cargos = cargoService.obterCargo();
              
    }

    var obterLogImportacao = function () {
        importacaoService.obterLogImportacao(ic.importacaoRequest)
            .then(function (response) {
                ic.responseImportacao = response.data;
                ic.PaginaAtual = ic.importacaoRequest.Pagina;
                ic.TotalPaginas = response.data.TotalPaginas;
                ic.TotalDeRegistros = response.data.TotalDeRegistros;
                
            }, function (err) {

            });
    }

    //Paginação ===============================================================

    $scope.setPage = function (pageNo) {
        ic.PaginaAtual = pageNo;
    };

    $scope.pageChanged = function () {
        ic.importacaoRequest.Pagina = ic.PaginaAtual;
        obterLogImportacao();        
    };

    //modal =====================================================================
    ic.openModalimportar = function (size) {
        var modalImportar = $uibModal.open({
            templateUrl: 'modals/importacaoModal.html',
            controller: importacaoModalController,
            controllerAs: 'modalimp',
            size: size,
            resolve: {             
              
            }
        });

        modalImportar.result.then(function (valor) {
            ic.filtrar();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

}

importacaoController.$inject = ['$scope', '$state', 'autService', '$uibModal', 'importacaoService', 'cargoService'];

app
	.controller('importacaoController', importacaoController);