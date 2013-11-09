oandajs
=======

oanda.js is a javascript wrapper for the OANDA REST API. 

Usage
=====

Include the latest oanda.js in as a script tag:

    <script type="text/javascript" src="http://developer.oanda.com/oandajs/oanda.js"></script>
    
To get current live rates:

    OANDA.rate.quote(['EUR_USD'], function(response) {
        if(response && !response.error) {
            var bid = response.prices[0].bid;
            var ask = response.prices[0].ask;
            // Do something with prices
            // ...
        }
    });
    
To open a trade with optional parameters:    

    OANDA.trade.open(accountId, 'EUR_USD', 100, 'buy', { 'stopLoss' : 0.90, 'takeProfit' : 1.102 }, function(openTradeResponse) {
        if(openTradeResponse && !openTradeResponse.error) {
            var units = openTradeResponse.units;
            var side = openTradeResponse.side;
            var instrument = openTradeResponse.instrument;
            var time = openTradeResponse.time;
            // Do something with open trade result
            // ...
        }
    });


To handle errors:

    OANDA.trade.open(accountId, 'EUR_USD', 100, 'buy', { 'stopLoss' : 0.90, 'takeProfit' : 1.102 }, function(openTradeResponse) {
        if(openTradeResponse.error) {
            var error = openTradeResponse.error;
            console.log(error.statusCode); //HTTP status code
            console.log(error.code);       //OANDA error code
            console.log(error.message);
        }
    });


Examples
======
Check out these example apps that use oanda.js
* [sim-rates-pane](https://github.com/oanda/simple-rates-panel)
