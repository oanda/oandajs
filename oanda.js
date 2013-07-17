var OANDA = OANDA || {};
OANDA.baseURL = OANDA.baseURL || "http://api-sandbox.oanda.com";

OANDA.transaction = OANDA.transaction || {};

OANDA.transaction.list = function(accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/transactions", {}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.transaction.listSpecific = function(accountId, transId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/transactions/" + transId, {}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade = OANDA.trade || {};

OANDA.trade.list = function(accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/trades", {}, function(response, textStatus) {
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
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/trades", {tradeIds: tradesStr}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.open = function(accountId, instrument, units, side, callback) {
    $.post(OANDA.baseURL + "/v1/accounts/" + accountId + "/trades", {instrument: instrument, units: units, side : side}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    }, 'json');
}

OANDA.trade.close = function(accountId, tradeId, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts/" + accountId + "/trades/" + tradeId,
        type: 'DELETE',
        success: function(response, textStatus) {
        if(callback) {
            callback(response);
        }}});
}

OANDA.trade.change = function(accountId, tradeId, stopLoss, takeProfit, trailingStop, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts/" + accountId + "/trades/" + tradeId,
        data: {stop_loss: stopLoss, take_profit: takeProfit, trailing_stop: trailingStop},
        type: 'PUT',
        success:function(response, textStatus) {
        if(callback) {
            callback(response);
        }}});
}

OANDA.order = OANDA.order || {};

OANDA.order.list = function(accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/orders", {}, function(response, textStatus) {
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
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/orders", {orderIds: ordersStr}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.open = function(accountId, instrument, units, side, price, expiry, callback) {
    $.post(OANDA.baseURL + "/v1/accounts/" + accountId + "/orders", {instrument: instrument, units: units, side:side, price: price, expiry:expiry}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    }, 'json');
}

OANDA.order.close = function(accountId, orderId, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts/" + accountId + "/orders/" + orderId,
        type: 'DELETE',
        success: function(response, textStatus) {
        if(callback) {
            callback(response);
        }}});
}

OANDA.order.change = function(accountId, orderId, units, price, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts/" + accountId + "/orders/" + orderId,
        data: {units: units, price: price},
        type: 'PUT',
        success:function(response, textStatus) {
        if(callback) {
            callback(response);
        }}});
}


OANDA.position = OANDA.position || {};

OANDA.position.list = function(accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/positions", {}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position.listSpecific = function(accountId, instrument, callback) {
    $.getJSON(OANDA.baseURL + "/v1/accounts/" + accountId + "/positions/" + instrument, {}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position.close = function(accountId, instrument, callback) {
    $.ajax({
        url: OANDA.baseURL + "/v1/accounts/" + accountId + "/positions/" + instrument,
        type: 'DELETE',
        success: function(response, textStatus) {
                    if(callback) {
                        callback(response);
                    }
                 }
            });
}

OANDA.account = OANDA.account || {};

OANDA.account.register = function(callback) {
    $.post(OANDA.baseURL + "/v1/acccounts", {}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    }, 'json');
}

OANDA.rate = OANDA.rate || {};

OANDA.rate.list_symbols = function(callback) {
    $.getJSON(OANDA.baseURL + "/v1/instruments", function(response, textStatus) {
       if(callback) {
            callback(response);
        }
    });
}

OANDA.rate.history = function(symbol, granularity, count, callback) {
    $.getJSON(OANDA.baseURL + "/v1/instruments/" + symbol + "/candles", {granularity: granularity, count: count}, function(response, textStatus) {
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
            symbolStr += ",";
        }
        symbolStr += symbols[cur];
        needComma = true;
    }
    $.getJSON(OANDA.baseURL + "/v1/instruments/price.json", {instruments: symbolStr}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

