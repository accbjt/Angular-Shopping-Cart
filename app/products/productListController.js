(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ProductListController", ['$http','$localStorage', ProductListController]);

	function ProductListController($http, $localStorage){
		var vm = this;

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
		});

		vm.$storage = $localStorage;

	};

}());