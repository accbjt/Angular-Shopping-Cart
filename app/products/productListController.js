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

		$scope.tags = [
			{ text: "Hygiene" },
			{ text: "Towel" },
			{ text: "Shower" }
		];

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
			$scope.$parent.$broadcast('updateCart');
		};

		vm.discount = function(productItem){
			var tagsInCart = [];

			for (var property in vm.$storage.inCart) {
				var inCart = vm.$storage.inCart;

				if (inCart.hasOwnProperty(property)) {
					var product = vm.products[inCart[property].indexId];

					product.tags.forEach(function(tag){
						tagsInCart.push(tag);
					})
				}
			}

		  return productItem.tags.some(function(tag){
							 return tagsInCart.indexOf(tag) > -1
						 });
		};

		vm.discountOnPrice = function(productItem){
			if(vm.discount(productItem)){
				return "color: red; text-decoration: line-through;"
			}
		};

		vm.discountedPrice = function(productItem){
			return Math.round((productItem.price-(productItem.price*0.10))*100)/100;
		};

	};

}());