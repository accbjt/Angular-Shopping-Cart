(function(){
	"use strict";
	
	var app = angular.module("shoppingCartApp", [
        'ngStorage',
        'ngTagsInput'
      ]);

	app.filter('filterByTags', function () {
		return function (items, tags) {
			var filtered = [];
			(items || []).forEach(function (item) {
				var matches = tags.some(function (tag) {
					return (item.tags.indexOf(tag.text) > -1);
				});
				if (matches) {
					filtered.push(item);
				}
			});
			return filtered;
		};
	});

}());