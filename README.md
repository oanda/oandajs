oandajs
=======

oanda.js is a javascript wrapper for the OANDA REST API. 

Usage
=====

Include the latest oanda.js in as a script tag:

    <script type="text/javascript" src="https://raw.github.com/oanda/oandajs/master/oanda.js"></script>
    
To get current live rates:

    OANDA.rate.quote(['EUR_USD'], function(response) {
        var bid = response.prices[0].bid;
        var ask = response.prices[0].ask;
        // Do something with prices
        // ...
    });
    
To open a trade:    

    OANDA.trade.open(accountId, 'EUR_USD', 100, 'buy', function(openTradeResponse) {
        var units = openTradeResponse.units;
        var side = openTradeResponse.side;
        var instrument = openTradeResponse.instrument;
        var time = openTradeResponse.time;
        // Do something with open trade result
        // ...
    });

Examples
======
Check out these example apps that use oanda.js
* [sim-rates-pane](https://github.com/oanda/simple-rates-panel)
