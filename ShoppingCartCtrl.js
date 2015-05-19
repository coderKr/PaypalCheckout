var payPal = angular.module('payPal',[]);

payPal.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

payPal.controller('Shopping', ['$scope','$http','$location','$window', function($scope,$http,$location,$window) {
  	$scope.success = false;
    $scope.invoice = {
        items: [{
            qty: 10,
            description: 'book',
            cost: 9.95}]
    };

    $scope.addItem = function() {
        $scope.invoice.items.push({
            qty: 1,
            description: '',
            cost: 0
        });
    };

    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    };

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.items, function(item) {
            total += item.qty * item.cost;
        })

        return total;
    };

    $scope.currency = 'USD';

    var getQueryParamsForItems = function(){
         count = 0;
         var param ='';
         angular.forEach($scope.invoice.items, function(item) {
            param = param + '&L_PAYMENTREQUEST_0_NAME'+count+'='+item.description+'&L_PAYMENTREQUEST_0_QTY'+count+'='+item.qty + '&L_PAYMENTREQUEST_0_AMT'+count+'='+ item.cost;
            count++;
        })

         return param;
    };

    $scope.callPayPalCheckout =  function(){
    	// Simple GET request example :
		$http.get('https://api-3t.sandbox.paypal.com/nvp?USER=kripa211991-facilitator_api1.gmail.com&PWD=GJU9K2S9ZLPANZYJ&SIGNATURE=AFcWxV21C7fd0v3bYYYRCpSSRl31AOjO48V17Ij8RYBOe-4VDZpumMV0&METHOD=SetExpressCheckout&VERSION=78&PAYMENTREQUEST_0_ITEMAMT='+$scope.total() +'&PAYMENTREQUEST_0_PAYMENTACTION=SALE&PAYMENTREQUEST_0_AMT='+$scope.total() +'&PAYMENTREQUEST_0_CURRENCYCODE='+$scope.currency+'&cancelUrl=http://localhost/PaymentFailure.html&returnUrl=http://localhost/PaymentSuccessful.html'+ getQueryParamsForItems())
		.success(function(data, status, headers, config) {
            console.log(data);
  					var token = data.split('&')[0].split('=')[1];
  					var url = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token='+token;
  					$window.location.href = url;
 
  		}).error(function(data, status, headers, config) {
  			    alert("Failure");
            console.log("failure");
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
  		});

    };

    $scope.paymentConfirmation = function(){
    	var queryParams = $window.location.search.split('&');
    	var token = queryParams[0].split('=')[1];
    	var payId = queryParams[1].split('=')[1];
    	$http.get('https://api-3t.sandbox.paypal.com/nvp?USER=kripa211991-facilitator_api1.gmail.com&PWD=GJU9K2S9ZLPANZYJ&SIGNATURE=AFcWxV21C7fd0v3bYYYRCpSSRl31AOjO48V17Ij8RYBOe-4VDZpumMV0&METHOD=DoExpressCheckoutPayment&VERSION=78&PAYMENTREQUEST_0_PAYMENTACTION=SALE&PAYMENTREQUEST_0_AMT=19&PAYMENTREQUEST_0_CURRENCYCODE=USD&TOKEN='+token +'&PAYERID=' + payId)
		.success(function(data, status, headers, config) {
            $scope.success = true;
  					console.log(data);
 
  		}).error(function(data, status, headers, config) {
  			    console.log("Failure");
  		});

    };
}]);