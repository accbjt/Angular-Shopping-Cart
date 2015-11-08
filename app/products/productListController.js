(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ProductListController", ['$http', ProductListController]);

	function ProductListController($http){
		var vm = this;

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
		});
	};

}());