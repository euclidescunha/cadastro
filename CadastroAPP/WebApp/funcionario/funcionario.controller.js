'use strict';

var funcionarioController = function ($scope, $state, $uibModal, autService, funcionarioService, cargoService) {
    var cp = this;
    cp.cargos = {};
    cp.cargoSelecionada = 0;

    cp.init = function () {
        var autenticacao = autService.dadosAutenticacao();
        if (autenticacao != null && autenticacao.autenticado) {

            cp.arquivo = null;
            cp.obterCargo();
            cp.responseFuncionario = {};
            cp.PaginaAtual = 1;
            cp.TotalPaginas = 1;
            cp.TotalDeRegistros = 1;
            cp.maxSize = 5
            cp.funcionarioRequest =
               {
                   CodigoFuncionario: null,
                   CodEmpresa: null,
                   DataInicio: null,
                   DataFim: null,
                   Pagina: 1,
                   TotalResultadosPorPagina: 10,
               };
            obterFuncionario();
        } else {
            $state.go('login')
        }
    }

    cp.filtrar = function () {
        cp.funcionarioRequest.Pagina = 1;
        obterFuncionario();
    }

    cp.obterCargo = function () {

        cp.cargos = cargoService.obterCargo();
        //.then(function (response) {
        //    debugger;
        //    mc.cargos = response.data;
        //    console.log(response);

        //}, function (err) {
        //    //TODO tratar erros
        //});
    }

    var obterFuncionario = function () {
        funcionarioService.obterFuncionario(cp.funcionarioRequest)
            .then(function (response) {
                cp.responseFuncionario = response.data;
                               
                cp.PaginaAtual = cp.funcionarioRequest.Pagina;
                cp.TotalPaginas = response.data.TotalPaginas;
                cp.TotalDeRegistros = response.data.TotalDeRegistros;

            }, function (err) {

            });
    }

    cp.excluirFuncionario = function (Id) {
        if (window.confirm("Deseja Exluir o funcionario " + Id + "?")) {
            funcionarioService.excluirFuncionario(Id)
                .then(function (response) {
                    obterFuncionario();
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
        cp.funcionarioRequest.Pagina = cp.PaginaAtual;
        obterFuncionario();
    };

    //modal =====================================================================
    cp.openModalEditar = function (size, registro) {
        
        var modalEditarFuncionario = $uibModal.open({
            templateUrl: 'modals/funcionarioModal.html',
            controller: funcionarioModalController,
            controllerAs: 'modalfuncionario',
            size: size,
            resolve: {
                registro: function () {
                    return registro;
                }
            }
        });

        modalEditarFuncionario.result.then(function (valor) {
            cp.filtrar();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

}

funcionarioController.$inject = ['$scope', '$state', '$uibModal', 'autService', 'funcionarioService', 'cargoService'];

app
	.controller('funcionarioController', funcionarioController);
