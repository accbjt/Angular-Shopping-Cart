(function(){
	"use strict";
	
	angular
		.module("shoppingCartApp")
		.controller("ShoppingCartController", ['$localStorage', ShoppingCartController]);

	function ShoppingCartController($localStorage){
		var vm = this;

		vm.$storage = $localStorage;
		vm.inCart = vm.$storage.inCart;
	};

}());