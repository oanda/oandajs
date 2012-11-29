var OANDA = OANDA || {};
OANDA.baseURL = OANDA.baseURL || "http://api-sandbox.oanda.com";

OANDA.user = OANDA.user || {};

OANDA.user.register = function(username, password, firstName, lastName, email, currency, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/register.json?callback=?", {username: username, password: password, first_name: firstName, last_name: lastName, email: email, currency: currency}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.user.register_zero = function(currency, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/register.json?callback=?", {currency: currency}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.user.login = function(username, password, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/login.json?callback=?", {username: username, password: password, api_key: OANDA.apiKey}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.user.send_otp = function(sessionToken, username, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/send_otp.json?callback=?", {session_token: sessionToken, username: username}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.user.upgrade_token = function(sessionToken, username, otp, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/login.json?callback=?", {username: username, session_token: sessionToken, one_time_password: otp, api_key: OANDA.apiKey}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.user.logout = function(sessionToken, callback) {
    $.getJSON(OANDA.baseURL + "/v1/user/logout.json?callback=?", {session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.transaction = OANDA.transaction || {};

OANDA.transaction.list = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/transaction/list.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade = OANDA.trade || {};

OANDA.trade.list = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/trade/list.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.list_specific = function(sessionToken, accountId, tradeIds, callback) {
    var needComma = false;
    var tradesStr = "";
    for(var cur in tradeIds) {
        if(needComma) {
            tradesStr += ",";
        }
        tradesStr += tradeIds[cur];
        needComma = true;
    }
    $.getJSON(OANDA.baseURL + "/v1/trade/list.json?callback=?", {account_id: accountId, session_token: sessionToken, trade_ids: tradesStr}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.open = function(sessionToken, accountId, symbol, units, callback) {
    $.getJSON(OANDA.baseURL + "/v1/trade/open.json?callback=?", {account_id: accountId, symbol: symbol, units: units, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.close = function(sessionToken, accountId, tradeId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/trade/close.json?callback=?", {account_id: accountId, trade_id: tradeId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.change = function(sessionToken, accountId, tradeId, stopLoss, takeProfit, trailingStop, callback) {
    $.getJSON(OANDA.baseURL + "/v1/trade/change.json?callback=?", {account_id: accountId, trade_id: tradeId, stop_loss: stopLoss, take_profit: takeProfit, trailing_stop: trailingStop, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.poll = function(sessionToken, accountId, maxTradeId,  callback) {
    $.getJSON(OANDA.baseURL + "/v1/trade/poll.json?callback=?", {account_id: accountId, max_trade_id: maxTradeId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.trade.trailing_amount = function(sessionToken, accountId, symbols, callback) {
    var needComma = false;
    var symbolStr = "";
    for(var cur in symbols) {
        if(needComma) {
            symbolStr += ",";
        }
        symbolStr += symbols[cur];
        needComma = true;
    }
    $.getJSON(OANDA.baseURL + "/v1/trade/trailing_amount.json?callback=?", {account_id: accountId, symbols: symbolStr, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position = OANDA.position || {};

OANDA.position.list = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/position/list.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.position.close = function(sessionToken, accountId, symbol, callback) {
    $.getJSON(OANDA.baseURL + "/v1/position/close.json?callback=?", {account_id: accountId, symbol: symbol, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.account = OANDA.account || {};

OANDA.account.list = function(sessionToken, callback) {
    $.getJSON(OANDA.baseURL + "/v1/account/list.json?callback=?", {session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.account.status = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/account/status.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

/*
OANDA.order = OANDA.order || {};

OANDA.order.list = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/order/list.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.create = function(sessionToken, accountId, symbol, units, price, expiry, callback) {
    $.getJSON(OANDA.baseURL + "/v1/order/create.json?callback=?", {account_id: accountId, symbol: symbol, units: units, price: price, expiry: expiry, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.change = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/order/change.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.delete = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/order/delete.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.order.poll = function(sessionToken, accountId, callback) {
    $.getJSON(OANDA.baseURL + "/v1/order/poll.json?callback=?", {account_id: accountId, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}*/

OANDA.rate = OANDA.rate || {};

OANDA.rate.list_symbols = function(sessionToken, callback) {
    $.getJSON(OANDA.baseURL + "/v1/instruments", function(response, textStatus) {
  //  return response;
       if(callback) {
            callback(response);
        }
    });
}

OANDA.rate.history = function(sessionToken, symbol, granularity, points, callback) {
    $.getJSON(OANDA.baseURL + "/v1/rate/history.json?callback=?", {symbol:symbol, granularity: granularity, points: points, session_token: sessionToken}, function(response, textStatus) {
        if(callback) {
            callback(response);
        }
    });
}

OANDA.rate.quote = function(sessionToken, symbols, callback) {
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

