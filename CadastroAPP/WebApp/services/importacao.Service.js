'use strict';

var importacaoService = function ($http, $q, configuracaoService, storageService) {

    var apiServico = configuracaoService.getUrlBase;
    var authKey = configuracaoService.getFuncionarioKey;
    var filePath = configuracaoService.getFilePath;
    var importacaoServiceFactory = {};
    var dadosAutorizacao = storageService.get('autKey');

    var _obterLogImportacao = function (importacaoRequest) {
        return $http.get(apiServico + 'Importacao/Listar/' +
            '?NomeUsuario=' + importacaoRequest.Usuario +
            '&NomeArquivo=' + importacaoRequest.NomeArquivo +
            '&DataInicio=' + importacaoRequest.DataInicio +
            '&DataFim=' + importacaoRequest.DataFim +
            '&Pagina=' + importacaoRequest.Pagina +
            '&TotalResultadosPorPagina=' + importacaoRequest.TotalResultadosPorPagina, { headers: { Authorization: authKey } });
    };

    var _importarFuncionario = function (arquivo) {
        var url = apiServico + "Inserir/Importacao/";
        var deferred = $q.defer();

        var data = {
            filePath: filePath,
            arquivo: arquivo,
            nomeArquivo: arquivo.name,
            nomeUsuario: dadosAutorizacao.usuario
        };

        _upload(arquivo)
            .then(function (response) {               
                $http.post(url, data, {
                    headers:
                          {
                              'Content-Type': 'application/json',
                              Authorization: authKey
                          }
                }).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    var _upload = function (arquivo) {
        var url = apiServico + "Upload";
        var oForm = new FormData();
        oForm.append('arquivo_upload', arquivo);

        var postParams = {
            method: 'POST',
            url: url,
            transformRequest: angular.identity,
            data: oForm,
            headers: { 'Content-Type': undefined, Authorization: authKey }
        };

        var obj = $q.defer();

        $http(postParams).then(function (result) {
            obj.resolve(result);

        }, function (erro) {
            obj.reject('Houve um erro. Tente novamente.');
        });

        return obj.promise;
    }

    importacaoServiceFactory.obterLogImportacao = _obterLogImportacao;
    importacaoServiceFactory.importarFuncionario = _importarFuncionario;

    return importacaoServiceFactory;

}

importacaoService.$inject = ['$http', '$q', 'configuracaoService', 'storageService'];

app.
    factory('importacaoService', importacaoService);