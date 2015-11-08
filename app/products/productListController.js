(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ProductListController", ['$scope','$http','$localStorage', ProductListController]);

	function ProductListController($scope, $http, $localStorage){
		var vm = this;

		$http.get('Products.json').success(function(data) {
   		vm.products = data.products;
		});

		vm.$storage = $localStorage;

		// setup inCart local storage if it doesn't exist
		if(!vm.$storage.inCart){
			vm.$storage.inCart = {};
		}

		vm.addItemToCart = function(e, index){
			var product = this.products[index];
			var productInCart = vm.$storage.inCart[this.products[index].name];
			var qty = e.currentTarget.previousElementSibling;

			if(productInCart){
				productInCart.count = parseInt(productInCart.count)+parseInt(qty.value);
			}else{
				vm.$storage.inCart[this.products[index].name] = {indexId: index, count:parseInt(qty.value)};
			}

			qty.value = "1";
			$scope.$parent.$broadcast('test');
		};

	};

}());