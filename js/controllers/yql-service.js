thisApp.factory('yql_service',function($q,$http) 
{
	var helpEncodeURIComponent = function(str) 
	{
		return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
	};

	//this service always returns JSON, so we'll always use this suffix when talking to YQL API
	var url_suffix = '&format=json&callback=JSON_CALLBACK';

	return {
		//getHistoricalData returns a json struct from yahoo.finance.historicaldata
		getHistoricalData: function(symbol,start,end) 
		{
			//use my own custom datastore until Yahoo accepts my PR for yahoo.finance.historicaldata
			var pre_query = 'use "store://uYZlfsBLrlRk8k5JEcHxft" as mfisher87.finance.historicaldata;'

			//build the symbol comparison clause.
			//If one symbol, we use "WHERE symbol = {symbol}"
			//If list of symbols, we use "WHERE symbol IN ('{s1}','{s2}','{s3}')"
			if (typeof symbol === 'string')
			{
			
				var symbol_clause = '= "' + symbol + '"';
			}
			else //it's an array
			{
				//make a quoted list
				var symbol_list = (symbol.length ? "'" + symbol.join("','") + "'" : "");
				var symbol_clause = 'IN ('+ symbol_list +')';
			}

			//build the query
			var query = 'select * from mfisher87.finance.historicaldata where symbol ' + symbol_clause + ' and startDate = "' + start + '" and endDate = "' + end + '"';
			console.log(query);
			//concatenate the pre_query now, so we don't have to look at it in the log
			query = pre_query + query;
			
			//build url
			var url = 'http://query.yahooapis.com/v1/public/yql?q=' + helpEncodeURIComponent(query) + url_suffix;
		  console.log(url);	
			
			//new deferred with unfulfilled promise
			var deferred = $q.defer();

			//?request? to yahoo
			$http.jsonp(url).
				success(function(json) {
						console.log(JSON.stringify(json));
						var quotes = json.query.results.quote;
						//resolve the promise by passing quotes object
						deferred.resolve(quotes);
					}).
				error(function(error) {
						console.log(JSON.stringify(error));
						alert("oh no it's the error");
					});

			//return the promise, whether it has been fulfilled or not
			return deferred.promise;
		}// end getHistoricalData
		
		//more yql functions??
		//...
		//
		//
	}
}); 
