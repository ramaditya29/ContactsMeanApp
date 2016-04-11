describe("Main Test", function(){
	var $controller;
	
	beforeEach(angular.mock.module('ContactsApp'));

	beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
	}));
	describe("AngularTesting Scope", function(){
		var $scope = {};

		it("Initialize", function(){
			$scope = {};
			var controller = $controller('SimpleController', {$scope: $scope});
			expect($scope.name).toEqual('Aditya');

			//expect($scope.name).toEqual('Rajesh');
		});

		
	});

	describe("Contacts API", function(){
		var $scope;
		var $httpBackend,Contact , $controller;

		beforeEach(angular.mock.inject(function ($injector) {
		    
		    Contact = $injector.get('Contact');
		    
		}));

		beforeEach(angular.mock.inject(function(_$controller_, _$httpBackend_){
			$httpBackend = _$httpBackend_;
			$controller = _$controller_;
			//Contact = $injector.get('Contact');
		}));

		it("Get All the contacts from the /api/contact", function(){

			$httpBackend.whenGET('/api/contact')
				.respond([
					 { firstname: 'Aditya', lastname: 'V', _id: 1, __v:0},
					 { firstname: 'Rajesh', lastname: 'K', _id: 2, __v:0}
					]);

			$scope = {};	
			$httpBackend.expectGET('src/views/list.client.tpl.html').respond("My Data");
			var controller = $controller('ListController', {$scope: $scope});
			$scope.contacts = Contact.query();
			
		    $httpBackend.flush();

		    expect($scope.contacts).toBeDefined();
		    expect($scope.contacts.length).toBe(2);
		    expect($scope.contacts[0].firstname).toBe('Aditya');
		    expect($scope.contacts[1].firstname).toBe('Rajesh');
		});
		afterEach(function () {
		    //$httpBackend.verifyNoOutstandingExpectation();
		    //$httpBackend.verifyNoOutstandingRequest();
		});
	});

	
});