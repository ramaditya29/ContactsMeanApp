'use strict';

angular
    .module('ContactsApp')
    .factory('Contact', function($resource){
        return $resource('/api/contact/:firstname', {firstname: '@firstname'},{
            'update' : {method: 'PUT'},
            'save' : {method: 'POST', url: '/api/contact'},
            'delete': {method: 'DELETE'}
        });
    });