import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTickerData } from './redux/tickerSlice';
import io from 'socket.io-client';

import { Ticker } from './components/Ticker';
import './App.css';

const socket = io('http://localhost:4000');

export const App = () => {
  const [updatedTickers, setUpdatedTickers] = useState(new Set());
  const [showTickers, setShowTickers] = useState(true);
  const [hiddenTickers, setHiddenTickers] = useState(new Set());

  const dispatch = useDispatch();
  const tickerData = useSelector((state) => state.ticker.tickerData);

  const getTickerTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedDate;
  };

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

  return (
    <div className="wrapper">
      <h1 className="title">Real-time ticker</h1>

      <button
        className='tickers-toggler'
        onClick={toggleTickers}>
        {showTickers ? 'Hide Tickers' : 'Show Tickers'}
      </button>

      <div className="tickers">
        {showTickers && tickerData.map((ticker) => (
          <button
            className="tickers-toggler"
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