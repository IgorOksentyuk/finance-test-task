import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTickerData } from './redux/tickerSlice';
import io from 'socket.io-client';

import { Ticker } from './components/Ticker';
import { getTickerTime } from './utils/getTickerTime';
import './App.css';

const socket = io('http://localhost:4000');

export const App = () => {
  const [updatedTickers, setUpdatedTickers] = useState(new Set());
  const [showTickers, setShowTickers] = useState(true);
  const [hiddenTickers, setHiddenTickers] = useState(new Set());
  const [interval, setInterval] = useState(5000);

  const dispatch = useDispatch();
  const tickerData = useSelector((state) => state.ticker.tickerData);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data) => {
      dispatch(updateTickerData(data));

      const updatedTickerSet = new Set(data.map((ticker) => ticker.ticker));
      setUpdatedTickers(updatedTickerSet);

      setTimeout(() => {
        setUpdatedTickers(new Set());
      }, 300);
    });

    return () => {
      socket.off('ticker');
    };
  }, [dispatch]);

  const toggleTickers = () => {
    setShowTickers(!showTickers);
  };

  const toggleTicker = (ticker) => {
    if (hiddenTickers.has(ticker)) {
      hiddenTickers.delete(ticker);
    } else {
      hiddenTickers.add(ticker);
    }

    setHiddenTickers(new Set(hiddenTickers));
  };

  const updateInterval = (value) => {
    setInterval(value);
    socket.emit('updateInterval', value);
  }

  return (
    <div className="wrapper">
      <h1 className="title">Real-time ticker</h1>

      <div className="panel-container">
        <button
          className="tickers-toggler toggler-fs"
          onClick={toggleTickers}>
          {showTickers ? 'Hide Tickers' : 'Show Tickers'}
        </button>

        <form className="panel-form">
          <label>Enter new interval (ms)</label>

          <input
            className="input"
            value={interval}
            step={1000}
            onChange={(e) => updateInterval(e.target.value)}
            type="number"
            placeholder="Enter new interval (ms)"
          />
        </form>
      </div>

      <div className="buttons-container">
        {showTickers && tickerData.map((ticker) => (
          <button
            className="tickers-toggler margin-0"
            key={ticker.ticker}
            onClick={() => toggleTicker(ticker.ticker)}
          >
            {ticker.ticker} {hiddenTickers.has(ticker.ticker) ? 'show' : 'hide'}
          </button>
        ))}
      </div>

      <div className="ticker-container">
        {showTickers &&
          tickerData.map((ticker) => (
            <div key={ticker.ticker}>
              {!hiddenTickers.has(ticker.ticker) && (
                <Ticker
                  ticker={ticker}
                  updatedTickers={updatedTickers}
                  getTickerTime={getTickerTime}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};