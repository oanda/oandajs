var OANDA = OANDA || {};

OANDA.baseURL = OANDA.baseURL || "http://api-sandbox.oanda.com";

OANDA.auth = OANDA.auth || {};
OANDA.auth.enabled = OANDA.auth.enabled || false;
OANDA.auth.token = OANDA.auth.token || "";

var setAuthHeader = function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + OANDA.auth.token);
};

var sendAjaxRequest = function(endpoint, method, parameters, requiresAuth, onComplete) {
    var contentType = "";
    if(method === 'POST' || method === 'PUT') {
        contentType = "application/x-www-form-urlencoded";
    }
    var beforeSend = function() {};
    if(OANDA.auth.enabled && requiresAuth) {
        beforeSend = setAuthHeader;
    }
    var req = $.ajax({
        url: OANDA.baseURL + endpoint, 
        type: method,
        dataType: 'json',
        data : parameters,
        contentType: contentType,
        beforeSend: beforeSend,
    });
    req.always(onComplete);
};

/* Send a raw api request on an endpoint.
 */
OANDA.api = function(endpoint, method, parameters, callback) {

    sendAjaxRequest(endpoint, method, parameters, true, function(jqXHR, textResponse) {
        var response = {};
        if(textResponse != 'success') {
            response.error = { 'HTTPCode' : jqXHR.status };
            try {
                var errorJSON = JSON.parse(jqXHR.responseText);
                $.extend(response.error, errorJSON);
            } catch(e) {
            }
        } else {
            response = jqXHR;
        }
        if(callback) {
            callback(response);
        }
    });
};

OANDA.transaction = OANDA.transaction || {};

/* 
 * Lists all transactions for a specified account.
 * Accepts optional parameters:
 * maxId      => Number
 * mindId     => Number
 * count      => Number
 * Instrument => String
 *
 */
OANDA.transaction.list = function(accountId, optParameters, callback) {
    //Disallow passing ids parameter (use listSpecific instead).
    if(optParameters.ids) { delete optParameters.ids; }
    OANDA.api("/v1/accounts/" + accountId + "/transactions", 'GET', optParameters, callback);
};

/* List specific transactions by transaction id.
 * Accepts no optional parameters
 */
OANDA.transaction.listSpecific = function(accountId, transId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/transactions/" + transId, 'GET', {}, callback);
};

OANDA.trade = OANDA.trade || {};

/* List all trade in account.
 * Accepts optional parameters:
 * maxId      => Number
 * count      => Number
 * instrument => Number
 */
OANDA.trade.list = function(accountId, optParameters, callback) {
    if(optParameters.ids) { delete optParameters.ids; }
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'GET', optParameters, callback);
};

/* List specific trades by id.
 * Accepts no optional parameters
 */
OANDA.trade.listSpecific = function(accountId, tradeIds, callback) {
    var tradesStr = tradeIds.join(',');
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'GET', {ids : tradesStr}, callback);
};

/* Open a new trade
 * Accepts optional parameters:
 * stopLoss     => number
 * takeProfit   => number
 * trailingStop => number
 * upperBound   => number
 * lowerBound   => number
 * Accepts optional parameters
 */
OANDA.trade.open = function(accountId, instrument, units, side, optParameters, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'POST', $.extend({instrument:instrument, units:units, side:side}, optParameters), callback);
};

/* Close an existing trade
 * Accepts no optional parameters.
 */
OANDA.trade.close = function(accountId, tradeId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades/" + tradeId, 'DELETE', {}, callback);
};

/* Modfify and existing trade
 * Accepts optional parameters:
 *  stopLoss     => number
 *  takeProfit   => number
 *  trailingStop => number
 */
OANDA.trade.change = function(accountId, tradeId, optParameters, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades/" + tradeId, 'PUT', optParameters, callback);
};

OANDA.order = OANDA.order || {};


/* List all orders in account.
 * Accepts optional parameters:
 * maxId      => Number
 * count      => Number
 * Instrument => String
 */
OANDA.order.list = function(accountId, optParameters, callback) {
    if(optParameters.ids) { delete optParameters.ids; }
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'GET', optParameters, callback);
};

/* List specific orders by id.
 * Accepts no optional parameters
 */
OANDA.order.listSpecific = function(accountId, orderIds, callback) {
    var ordersStr = orderIds.join(',');
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'GET', {ids: ordersStr}, callback);
};

/* Create a new order.
 * Accepts optional parameters
 * stopLoss     => number
 * takeProfit   => number
 * trailingStop => number
 * upperBound   => number
 * lowerBound   => number
 */
OANDA.order.open = function(accountId, instrument, units, side, price, expiry, type, optParameters, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'POST', 
              $.extend({instrument: instrument, units: units, side:side, price: price, expiry:expiry, type:type}, optParameters),
              callback);
};

/* Close an existing order.
 * Accepts no optional parameters
 */
OANDA.order.close = function(accountId, orderId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders/" + orderId, 'DELETE', {}, callback);
};

/* Modify an existing order
 * Accepts optional parameters:
 * units        => number
 * price        => number
 * expiry       => string
 * lowerBound   => number
 * upperBound   => number
 * stopLoss     => number
 * takeProfit   => number
 * trailingStop => number
 */
OANDA.order.change = function(accountId, orderId, optParameters, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders/" + orderId, 'PUT', optParameters, callback);
};

OANDA.position = OANDA.position || {};

/* List all positions
 * Accepts no optional parameters
 */
OANDA.position.list = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions", 'GET', {}, callback);
};

/* List only position for specific instrument
 * Accepts no optional parameters
 */
OANDA.position.listSpecific = function(accountId, instrument, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions/" + instrument, 'GET' ,{}, callback);
};

/* Close all trades in a positions
 * Accepts no optional parameters
 */
OANDA.position.close = function(accountId, instrument, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions/" + instrument, 'DELETE', {}, callback);
};

OANDA.account = OANDA.account || {};

/* Register an account
 * Accepts no optional parameters
 */
OANDA.account.register = function(currency, callback) {
    OANDA.api("/v1/accounts", 'POST', {currency:currency}, callback);
};

/* List all accounts associated with user
 * Accepts no optional parameters
 */
OANDA.account.list = function(username, callback) {
    OANDA.api("/v1/accounts", 'GET', {username:username}, callback);
}

/* List specific account details
 * Accepts no optional parameters
 */
OANDA.account.listSpecific = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId, 'GET', {}, callback);  
}

OANDA.rate = OANDA.rate || {};

/* List all instruments available.
 * Accepts optional parameters:
 * fields => array of strings
 */
OANDA.rate.instruments = function(fields, callback) {
    var fieldStr = fields.join(',');
    var data = fieldStr ? { "fields" : fieldStr } : {};
    OANDA.api("/v1/instruments", 'GET', data, callback);
};

/* Return candlesticks for a specific instrument
 * Accepts optional parameters:
 * granularity  => string
 * count        => number
 * start        => string
 * end          => string
 * candleFormat => string
 * includeFirst => boolean
 */
OANDA.rate.history = function(symbol, optParameters, callback) {
    OANDA.api("/v1/history", 'GET', $.extend({instrument:symbol}, optParameters), callback);
};

/* Lists the current price for a list of instruments
 * Accepts no optional parameters
 */
OANDA.rate.quote = function(symbols, callback) {
    OANDA.api("/v1/quote", 'GET', {instruments: symbols.join(',')}, callback);
};
