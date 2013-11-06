function yqlHistoricalData($scope,yql_service) 
{
	//items is the data struct
	$scope.items = [];
	//### this stuff doesn't do anything yet
	$scope.symbol = ['GOOG','YHOO','MSFT']; //### shouldn't be hardcoded
	$scope.startDate = '2012-01-01'; //### shouldn't be hardcoded
	$scope.endDate = '2012-01-05'; // ditto

	//update above vars if they change	
	$scope.$watch(
		function fn () 
		{
			return {
				startDate: $scope.startDate,
				endDate: $scope.endDate
			};
		}, 
		function(val)
		{
			if(val.startDate && val.endDate) //to-do: validate that these are both valid dates & startDate > endDate
			{
				console.log('Start updating ' + JSON.stringify(val));
				$scope.items = [];
				
				//create a new promise
				var promise = yql_service.getHistoricalData($scope.symbol,$scope.startDate,$scope.endDate);
				
				//??
				promise.then(function(data) {
					$scope.items = data;
				});
			}
		},true);

}
