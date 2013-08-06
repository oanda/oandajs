var OANDA = OANDA || {};

OANDA.baseURL = OANDA.baseURL || "http://api-sandbox.oanda.com";

OANDA.auth = OANDA.auth || {};
OANDA.auth.enabled = OANDA.auth.enabled || false;
OANDA.auth.token = OANDA.auth.token || "";

var setAuthHeader = function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + OANDA.auth.token);
}

var sendAjaxRequest = function(endpoint, method, parameters, requiresAuth, onComplete) {
    var contentType = "";
    if(method === 'POST' || method === 'PUT') {
        contentType = "application/x-www-form-urlencoded";
    }
    var beforeSend = function() {}
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
}

OANDA.api = function(endpoint, method, parameters, callback) {

    sendAjaxRequest(endpoint, method, parameters, true, function(jqXHR, textResponse) {
        var response = {};
        if(textResponse != 'success') {
            response.error= jqXHR;
        } else {
            response = jqXHR;
        }
        if(callback) {
            callback(response);
        }
    });
}

OANDA.transaction = OANDA.transaction || {};

/* 
 * Lists all transactions for a specified account.
 */
OANDA.transaction.list = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/transactions", 'GET', {}, callback);
}

OANDA.transaction.listSpecific = function(accountId, transId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/transactions/" + transId, 'GET', callback);
}

OANDA.trade = OANDA.trade || {};

OANDA.trade.list = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'GET', {}, callback);
}

OANDA.trade.listSpecific = function(accountId, tradeIds, callback) {
    var needComma = false;
    var tradesStr = "";
    for(var cur in tradeIds) {
        if(needComma) {
            tradesStr += ",";
        }
        tradesStr += tradeIds[cur];
        needComma = true;
    }
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'GET', {ids : tradesStr}, callback);
}

OANDA.trade.open = function(accountId, instrument, units, side, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades", 'POST', {instrument:instrument, units:units, side:side}, callback);
}

OANDA.trade.close = function(accountId, tradeId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades/" + tradeId, 'DELETE', {}, callback);
}

OANDA.trade.change = function(accountId, tradeId, stopLoss, takeProfit, trailingStop, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/trades/" + tradeId, 'PUT', 
            { stopLoss : stopLoss, takeProfit : takeProfit, trailingStop : trailingStop },
            callback);
}

OANDA.order = OANDA.order || {};

OANDA.order.list = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'GET', {}, callback);
}

OANDA.order.listSpecific = function(accountId, orderIds, callback) {
    var needComma = false;
    var ordersStr = "";
    for(var cur in orderIds) {
        if(needComma) {
            ordersStr += ",";
        }
        ordersStr += orderIds[cur];
        needComma = true;
    }
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'GET', {ids: ordersStr}, callback);
}

OANDA.order.open = function(accountId, instrument, units, side, price, expiry, type, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders", 'POST', {instrument: instrument, units: units, side:side, price: price, expiry:expiry, type:type}, 
              callback);
}

OANDA.order.close = function(accountId, orderId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders/" + orderId, 'DELETE', {}, callback);
}

OANDA.order.change = function(accountId, orderId, units, price, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/orders/" + orderId, 'PUT', {units:units, price:price}, callback);
}

OANDA.position = OANDA.position || {};

OANDA.position.list = function(accountId, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions", 'GET', {}, callback);
}

OANDA.position.listSpecific = function(accountId, instrument, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions/" + instrument, 'GET' ,{}, callback);
}

OANDA.position.close = function(accountId, instrument, callback) {
    OANDA.api("/v1/accounts/" + accountId + "/positions/" + instrument, 'DELETE', {}, callback);
}

OANDA.account = OANDA.account || {};

OANDA.account.register = function(currency, callback) {
    OANDA.api("/v1/accounts", 'POST', {currency:currency}, callback);
}

OANDA.rate = OANDA.rate || {};

OANDA.rate.instruments = function(callback) {
    OANDA.api("/v1/instruments", 'GET', {}, callback);
}

OANDA.rate.history = function(symbol, granularity, count, callback) {
    OANDA.api("/v1/history", 'GET', {instrument : symbol, granularity : granularity, count : count}, callback);
}

OANDA.rate.quote = function(symbols, callback) {
    var needComma = false;
    var symbolStr = "";
    for(var cur in symbols) {
        if(needComma) {
            symbolStr += "%2C";
        }
        symbolStr += symbols[cur];
        needComma = true;
    }

    OANDA.api("/v1/quote", 'GET', {instruments: symbolStr}, callback);
}

