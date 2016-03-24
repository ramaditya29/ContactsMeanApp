'use strict';

angular
    .module('ContactsApp')
    .controller('ListController',['$scope', 'Contact' ,function($scope, Contact){
        console.log('Within List Controller');
        $scope.fields = ['Firstname', 'Lastname', ''];
        $scope.contacts = Contact.query();
        $scope.deleteContact = function(contact){
        	alert(contact.firstname);
    		Contact.delete({firstname: contact.firstname});

    		alert("Deleted Successfully");
    		$scope.contacts = Contact.query();
    	};

    }])
    .controller('AddController',['$scope', 'Contact', function($scope, Contact){
    	$scope.data = {};
    	$scope.addContact = function(){
    		Contact.save({firstname: $scope.data.firstname, lastname: $scope.data.lastname});
    		alert("User Created Successfully");
    		$scope.data = {};
    	};

    }])
    .controller('EditController',['$scope', '$routeParams' ,'Contact', function($scope, $routeParams, Contact){
    	$scope.data = Contact.get({ firstname: $routeParams.firstname });
    	console.log($scope.data);

    }]);