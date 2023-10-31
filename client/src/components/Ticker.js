import React from 'react';

export const Ticker = ({ ticker, updatedTickers, getTickerTime }) => {
  return (
    <div className="ticker">
      <span className="ticker-label">{ticker.ticker}</span>

      <span className={`ticker-data ${updatedTickers.has(ticker.ticker) ? 'updated' : ''}`}>
        Price: {ticker.price}
      </span>

      <span className={`ticker-data ${updatedTickers.has(ticker.ticker) ? 'updated' : ''}`}>
        Change: {ticker.change}
      </span>

      <span className={`ticker-data ${updatedTickers.has(ticker.ticker) ? 'updated' : ''}`}>
        Change Percent: {ticker.change_percent}%
      </span>

      <span className={`ticker-data ${updatedTickers.has(ticker.ticker) ? 'updated' : ''}`}>
        Last trade time: {getTickerTime(ticker.last_trade_time)}
      </span>

    </div>
  );
};