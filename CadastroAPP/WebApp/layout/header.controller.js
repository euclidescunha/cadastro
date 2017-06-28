'use strict';

var headerController = function ($state, autService) {

    var hc = this;
    var _dados = {};
    hc.aba = $state.current.name;;

    var _init = function () {
        _dados.autenticado = false;
        var aut = autService.dadosAutenticacao();
        if (aut.autenticado) {
            _dados.nome = aut.nome;
            _dados.autenticado = aut.autenticado;
        } else {
            $state.go('login');
        }
    };

    var _sair = function () {
        autService.sair();
        $state.go('login');
    };
    var _usuario = function () {
        $state.go('usuario');
    }
    var _empresa = function () {
        $state.go('empresa');
    }
    var _cargo = function () {
        $state.go('cargo');
    }
    var _importacao = function () {
        $state.go('importacao');
    }
    var _funcionario = function () {
        $state.go('funcionario');
    }

    hc.init = _init;
    hc.usuario = _usuario;
    hc.empresa = _empresa;
    hc.cargo = _cargo;
    hc.importacao = _importacao;
    hc.funcionario = _funcionario;
    hc.dados = _dados;
    hc.sair = _sair;
}

headerController.$inject =['$state', 'autService'];

app
  .controller('headerController', headerController);
