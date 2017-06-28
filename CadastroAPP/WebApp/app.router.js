var app = angular
    .module('routerApp', ['ui.router']);


app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
           // login ========================================
        .state('login',
        {
            url: '/',
            views: {
                "header": {
                    templateUrl: "/layout/header.html",
                    controller: "headerController as header"
                },
                "viewContent": {
                    templateUrl: "/login/login.html",
                    controller: "loginController as login"
                },
                "footer": {
                    templateUrl: "/layout/footer.html"
                }
            }
        })

        // importacao ========================================
        .state('importacao',
        {
            url: '/importacao',
            views: {
                "header": {
                    templateUrl: "/layout/header.html",
                    controller: "headerController as header"
                },
                "viewContent": {
                    templateUrl: "/importacao/importacao.html",
                    controller: "importacaoController as importacao"
                },
                "footer": {
                    templateUrl: "/layout/footer.html"
                }
            }
        })
        
    // funcionario ===============================================
        .state('funcionario',
        {
            url: '/funcionario',
            views: {
                "header": {
                    templateUrl: "/layout/header.html",
                    controller: "headerController as header"
                },
                "viewContent": {
                    templateUrl: "/funcionario/funcionario.html",
                    controller: "funcionarioController as funcionario"
                },
                "footer": {
                    templateUrl: "/layout/footer.html"
                }
            }

        })
    //Usuário ============================================
         .state('usuario',
            {
                url: '/usuario',
                views: {
                    "header": {
                        templateUrl: "/layout/header.html",
                        controller: "headerController as header"
                    },
                    "viewContent": {
                        templateUrl: "/usuario/usuario.html",
                        controller: "usuarioController as usuario"
                    },
                    "footer": {
                        templateUrl: "/layout/footer.html"
                    }
                }

            })
      // Cargo  ============================================
     .state('cargo',
            {
                url: '/cargo',
                views: {
                    "header": {
                        templateUrl: "/layout/header.html",
                        controller: "headerController as header"
                    },
                    "viewContent": {
                        templateUrl: "/cargo/cargo.html",
                        controller: "cargoController as cargo"
                    },
                    "footer": {
                        templateUrl: "/layout/footer.html"
                    }
                }

            })
      // Empresa  ============================================
     .state('empresa',
            {
                url: '/empresa',
                views: {
                    "header": {
                        templateUrl: "/layout/header.html",
                        controller: "headerController as header"
                    },
                    "viewContent": {
                        templateUrl: "/empresa/empresa.html",
                        controller: "empresaController as empresa"
                    },
                    "footer": {
                        templateUrl: "/layout/footer.html"
                    }
                }

            })
     // Relatório  ============================================
     .state('relatorio',
            {
                url: '/relatorio',
                views: {
                    "header": {
                        templateUrl: "/layout/header.html",
                        controller: "headerController as header"
                    },
                    "viewContent": {
                        templateUrl: "/relatorio/relatorio.html",
                        controller: "relatorioController as relatorio"
                    },
                    "footer": {
                        templateUrl: "/layout/footer.html"
                    }
                }

            });

}]);

