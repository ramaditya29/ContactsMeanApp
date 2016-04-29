'use strict';

angular
    .module('ContactsApp')
    .config(function($routeProvider){

        $routeProvider
            .when('/contacts', {
                controller: 'ListController',
                templateUrl: 'src/views/list.client.tpl.html'
            })
            .when('/edit/:firstname', {
                controller: 'EditController',
                templateUrl: 'src/views/edit.client.tpl.html'
            })
            .when('/add',{
                controller:'AddController',
                templateUrl: 'src/views/add.client.tpl.html'
            })
            .otherwise({
                redirectTo: '/contacts'
            });
    });