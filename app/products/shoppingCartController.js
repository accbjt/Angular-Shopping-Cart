(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ShoppingCartController", ['$scope','$http','$localStorage', ShoppingCartController]);

	function ShoppingCartController($scope, $http, $localStorage){
		var vm = this;

		vm.$storage = $localStorage;

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
   		updateVmValues();
		});

		$scope.$on('test', function(e, stuff){
			vm.inCart = createInCartProducts();
			updateVmValues();
		});

		vm.removeItem = function(item){
			delete vm.$storage.inCart[item];
			vm.inCart = createInCartProducts();
			updateVmValues();
		};

		function updateVmValues(){
			vm.inCart = createInCartProducts();
   		vm.totalItemCount = itemCount();
   		vm.subtotal = subtotal();
   		vm.shippingCharge = 8.00;
   		vm.taxCharge = taxCharge();
   		vm.totalAmount = totalAmount();
		};

		function createInCartProducts(){
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

		function itemCount(){
			var items = vm.inCart.map(function(item){
				return item.count
			});

			items = items.reduce(function(previousValue, currentValue, index, array) {
				return previousValue + currentValue;
			});

			return items
		};

		function subtotal(){
			var items = vm.inCart.map(function(item){
				return item.price*item.count;
			});

			items = items.reduce(function(previousValue, currentValue, index, array) {
				return previousValue + currentValue;
			});

			return Math.round(items*100)/100;
		};

		function taxCharge(){
			var items = subtotal()*0.0875;

			return Math.round(items*100)/100;
		};

		function totalAmount(){
			var items = subtotal()+vm.shippingCharge+taxCharge();

			return Math.round(items*100)/100;
		};

	};

}());