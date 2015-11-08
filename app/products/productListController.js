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

		vm.addItemToCart = function(index){
			var product = this.products[index];
			var productInCart = vm.$storage.inCart[this.products[index].name];

			if(productInCart){
				productInCart.count = productInCart.count+1;
			}else{
				vm.$storage.inCart[this.products[index].name] = {indexId: index, count:1};
			}

			$scope.$parent.$broadcast('test');
		};

	};

}());