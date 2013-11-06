angular.module('JaneFrame').
	controller('buildSymbolList', function($scope) 
	{
		$scope.symbols = [
			{ symbol: 'GOOG', name: 'Google' },
			{ symbol: 'YHOO', name: 'Yahoo' },
			{ symbol: 'MSFT', name: 'Microsoft' }
		]
	});


