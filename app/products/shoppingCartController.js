(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ShoppingCartController", ['$http','$localStorage', ShoppingCartController]);

	function ShoppingCartController($http, $localStorage){
		var vm = this;

		vm.$storage = $localStorage;
		vm.inCart = [];

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;

   		for (var property in vm.$storage.inCart) {
   			var inCart = vm.$storage.inCart;

				if (inCart.hasOwnProperty(property)) {
					var product = vm.products[inCart[property].indexId];

					product.count = inCart[property].count;
					vm.inCart.push(product);
	      }
	    }
		});
	};

}());