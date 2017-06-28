'use strict';

var configuracaoService = function () {

    var configuracaoServiceFactory = {};

    // ************** LOCAL *******************
    //configuracaoServiceFactory.getUrlBase = '//localhost:47073/api/Cadastro/';
    //configuracaoServiceFactory.getFuncionarioKey = '184ec59ebd6046dayfb69a11d6793987';
    //configuracaoServiceFactory.getFilePath = 'C:/Upload/Arquivos';
    
    return configuracaoServiceFactory;
}

configuracaoService.$inject = [];

app.
    factory('configuracaoService', configuracaoService);