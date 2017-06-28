'use strict';

var importacaoModalController = function ($scope, $state, $uibModalInstance, importacaoService, cargoService) {
    var mc = this;
    var ae = angular.element;
    var an = angular;
    var _validFilePattern = /text.*/;
    var INVALID_FILE = "{0} não é um arquivo de texto válido ";
    mc.erro = {};
    mc.sucesso = {};
    mc.erro.mensagem = null;
    mc.sucesso.mensagem = null;
    mc.arquivo = null;
    mc.cargos = {};
    mc.cargoSelecionada = 0;

    mc.init = function () {        
        mc.arquivo = null;
        mc.obterCargo();
    };
    
    mc.importarFuncionario = function () {       
        if (mc.arquivo !== null) {
            importacaoService.importarFuncionario(mc.arquivo)
                .then(
                    function (resultado) {
                        mc.erro.mensagem = null;
                        mc.sucesso.mensagem = "Arquivo importado com sucesso.";
                        mc.arquivo = null;
                    },
                    function (error) {
                        mc.sucesso = null;
                        mc.erro.mensagem = 'Dados inválidos';
                    });
        } else {
            mc.sucesso = null;
            mc.erro.mensagem = 'Dados inválidos';
        };
    }

    mc.obterCargo = function () {
        debugger;
        mc.cargos = cargoService.obterCargo();
        
    }
    mc.close = function () {
        mc.arquivo = null;
        $uibModalInstance.close('close');
    };

    mc.cancel = function () {
        mc.arquivo = null;
        $uibModalInstance.dismiss('cancel');
    };
    
    ////validação e upload
    mc.showUploadDialog = function ($event, arquivo) {                    
        ae($event.currentTarget).parent().parent().find('input:file').trigger('click');
        $event.stopPropagation();
    }

    mc.preValidateFiles = function (files) {
        var tipoArquivo = _validFilePattern;
        var validation = {
            valid: [], invalid: [], errorMessage: null
        };

        for (var i = 0; i < files.length; i++) {
            var erro = false;
            var file = files[i];

            if (!file.type.match(tipoArquivo)) {
                validation.invalid.push({
                    file: file.name, message: INVALID_FILE.replace('{0}', file.name)
                });
                erro = true;
            }
                       
            if (!erro) {
                validation.valid.push({ file: file.name, fileData: file });
            }
        }
        return validation;
    }

    mc.onSelectUploadFiles = function (uploadFiles) {
        uploadFiles = uploadFiles == null ? uploadFiles = [] : uploadFiles;
        console.log(uploadFiles)
        mc.uploadErrors = [];
        
        if (uploadFiles && uploadFiles.length == 1) {

            mc.arquivo = uploadFiles[0];

            var validationResponse = mc.preValidateFiles(uploadFiles);
            if (validationResponse.errorMessage)
                mc.uploadErrors.push(validationResponse.errorMessage);

            if (validationResponse.invalid.length) {
                an.forEach(validationResponse.invalid, function (item) {
                    mc.uploadErrors.push(item.message);
                });
                mc.arquivo = null;
            }
        }
    }

    $scope.$watch('filesUploadAttempt', function (newValue) {
        mc.onSelectUploadFiles(newValue);
    });

}

importacaoModalController.$inject = ['$scope', '$state','$uibModalInstance', 'importacaoService', 'cargoService'];

app
	.controller('importacaoModalController', importacaoModalController);