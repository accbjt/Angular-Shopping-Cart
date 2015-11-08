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

		vm.itemCount = function(){
			var items = vm.inCart.map(function(item){
				return item.count
			});

			items = items.reduce(function(previousValue, currentValue, index, array) {
				return previousValue + currentValue;
			});

			return items
		};

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
   		vm.inCart = vm.createInCartProducts();
   		vm.totalItemCount = vm.itemCount();
		});

		$scope.$on('test', function(e, stuff){
			vm.inCart = vm.createInCartProducts();
			vm.totalItemCount = vm.itemCount();
		});

	};

}());