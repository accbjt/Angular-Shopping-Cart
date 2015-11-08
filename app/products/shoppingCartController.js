(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ShoppingCartController", ['$scope','$http','$localStorage', ShoppingCartController]);

	function ShoppingCartController($scope, $http, $localStorage){
		var vm = this;

		vm.$storage = $localStorage;

		vm.createInCartProducts = function(){
			var products = [];

			for (var property in vm.$storage.inCart) {
				var inCart = vm.$storage.inCart;

				if (inCart.hasOwnProperty(property)) {
					var product = vm.products[inCart[property].indexId];

					product.count = inCart[property].count;
					products.push(product);
				}
			}

			return products;
		};

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
   		vm.inCart = vm.createInCartProducts();
		});

		$scope.$on('test', function(e, stuff){
			vm.inCart = vm.createInCartProducts();
		});

	};

}());