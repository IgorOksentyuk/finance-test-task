import React from 'react';

export const Ticker = ({ ticker, updatedTickers, getTickerTime }) => {
  const isTickerUpdated = (ticker, updatedTickers) => updatedTickers.has(ticker);
  const isUpdated = isTickerUpdated(ticker.ticker, updatedTickers);

  const priceData = (
    <span className={`ticker-data ${isUpdated ? 'updated' : ''}`}>
      Price: {ticker.price}
    </span>
  );

  const changeData = (
    <span className={`ticker-data ${isUpdated ? 'updated' : ''}`}>
      Change: {ticker.change}
    </span>
  );

  const changePercentData = (
    <span className={`ticker-data ${isUpdated ? 'updated' : ''}`}>
      Change Percent: {ticker.change_percent}%
    </span>
  );

  const lastTradeTimeData = (
    <span className={`ticker-data ${isUpdated ? 'updated' : ''}`}>
      Last trade time: {getTickerTime(ticker.last_trade_time)}
    </span>
  );

  return (
    <div className="ticker">
      <span className="ticker-label">{ticker.ticker}</span>
      {priceData}
      {changeData}
      {changePercentData}
      {lastTradeTimeData}
    </div>
  );
};