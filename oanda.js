var OANDA = OANDA || {};
OANDA.baseURL = OANDA.baseURL || "http://api-sandbox.oanda.com";

OANDA.auth = OANDA.auth || {};
OANDA.auth.enabled = OANDA.auth.enabled || false;
OANDA.auth.token = OANDA.auth.token || "";

var setAuthHeader = function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + OANDA.auth.token)
}

var sendAjaxRequest = function(endpoint, method, parameters, requiresAuth, onSuccess) {
    var contentType = "";
    if(method === 'POST' || method === 'PUT') {
        contentType = "application/x-www-form-urlencoded";
    }
    var beforeSend = function() {}
    if(OANDA.auth.enabled && requiresAuth) {
        beforeSend = setAuthHeader;
    }
    $.ajax({
        url: OANDA.baseURL + endpoint, 
        type: method,
        dataType: 'json',
        data : parameters,
        contentType: contentType,
        success : onSuccess,
        beforeSend: beforeSend,
    });
}

OANDA.transaction = OANDA.transaction || {};

/* 
 * Lists all transactions for a specified account.
 */
OANDA.transaction.list = function(accountId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/transactions", 'GET', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.transaction.listSpecific = function(accountId, transId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/transactions/" + transId, 'GET', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade = OANDA.trade || {};

OANDA.trade.list = function(accountId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/trades", 'GET', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
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
    sendAjaxRequest("/v1/accounts/" + accountId + "/trades", 'GET', {ids : tradesStr}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.open = function(accountId, instrument, units, side, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/trades", 'POST', {instrument:instrument, units:units, side:side}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.close = function(accountId, tradeId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/trades/" + tradeId, 'DELETE', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.change = function(accountId, tradeId, stopLoss, takeProfit, trailingStop, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/trades/" + tradeId, 'PUT', 
            { stopLoss : stopLoss, takeProfit : takeProfit, trailingStop : trailingStop },
            true,
            function(response, textStatus) {
                if(callback) {
                    callback(response);
                }
        });
}

OANDA.order = OANDA.order || {};

OANDA.order.list = function(accountId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/orders", 'GET', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
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
    sendAjaxRequest("/v1/accounts/" + accountId + "/orders", 'GET', {ids: ordersStr}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.open = function(accountId, instrument, units, side, price, expiry, type, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/orders", 'POST', {instrument: instrument, units: units, side:side, price: price, expiry:expiry, type:type}, 
            true,
            function(response, textStatus) {
                if(callback) {
                    callback(response);
                }
    });
}

OANDA.order.close = function(accountId, orderId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/orders/" + orderId, 'DELETE', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.change = function(accountId, orderId, units, price, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/orders/" + orderId, 'PUT', {units:units, price:price}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}


OANDA.position = OANDA.position || {};

OANDA.position.list = function(accountId, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/positions", 'GET', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position.listSpecific = function(accountId, instrument, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/positions/" + instrument, 'GET' ,{}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position.close = function(accountId, instrument, callback) {
    sendAjaxRequest("/v1/accounts/" + accountId + "/positions/" + instrument, 'DELETE', {}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.account = OANDA.account || {};

OANDA.account.register = function(currency, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts", 
        type: 'POST',
        contentType: "application/x-www-form-urlencoded",
        success: function(response, textStatus) {
                    if (callback) {
                        callback(response);
                    }
                 }
        });
}

OANDA.rate = OANDA.rate || {};

OANDA.rate.instruments = function(callback) {
    sendAjaxRequest("/v1/instruments", 'GET', {}, true, function(response, textStatus) {
       if(callback) {
            callback(response);
        }
    });
}

OANDA.rate.history = function(symbol, granularity, count, callback) {
    sendAjaxRequest("/v1/history", 'GET', {instrument : symbol, granularity : granularity, count : count}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
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

    sendAjaxRequest("/v1/quote", 'GET', {instruments: symbolStr}, true, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

