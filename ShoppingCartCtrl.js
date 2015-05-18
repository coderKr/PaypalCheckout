var payPal = angular.module('payPal',[]);

payPal.controller('Shopping', ['$scope','$http','$location','$window', function($scope,$http,$location,$window) {
  
    $scope.invoice = {
        items: [{
            qty: 10,
            description: 'item',
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

    $scope.callPayPalCheckout =  function(){
    	console.log("Entered");
    	// Simple GET request example :
		$http.get('https://api-3t.sandbox.paypal.com/nvp?USER=kripa211991-facilitator_api1.gmail.com&PWD=GJU9K2S9ZLPANZYJ&SIGNATURE=AFcWxV21C7fd0v3bYYYRCpSSRl31AOjO48V17Ij8RYBOe-4VDZpumMV0&METHOD=SetExpressCheckout&VERSION=78&PAYMENTREQUEST_0_PAYMENTACTION=SALE&PAYMENTREQUEST_0_AMT=19&PAYMENTREQUEST_0_CURRENCYCODE=USD&cancelUrl=http://www.PaymentSuccessful.html&returnUrl=http://www.example.com/success.html').
  			success(function(data, status, headers, config) {
  					alert("Success");
  					var token = data.split('&')[0].split('=')[1];
  					console.log(token);
  					console.log('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token='+token);
  					$window.location.href('https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token='+token);
 
  		}).
  		error(function(data, status, headers, config) {
  			 alert("Failure");
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
  		});

    };
}]);