To use the app:
1) Go to URL:http://development.paypalcheckout.divshot.io/ 
2) You can add items via the Add Item To Cart option
3) Click on Paypal Checkout Button once done adding/deleting items. You are redirected to a paypal login page. 

Use these credentials: 
Id: kripa211991-buyer-2@gmail.com
Password: testbuyer2

4) You can see the summary of your orders on the left side
5) Click Continue. You will be directed to a Payment Successful Page. Click 'Done'. It will show a successful if finished.
6) Failure alerts will be thrown if any step fails.

Note: To make the url run on chrome you need to execute 
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security 

from cmd prompt. There is an issue with Cross Border Origin because of which it only works in unsecured version of chrome.
The server response from API doesn't have the header allowing the Cross Border Origin.
The possible workaround for this in Angular is using $http.jsonp instead on $http.get. 
