import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

test('renders the title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText('Real-time ticker');
  expect(titleElement).toBeInTheDocument();
});

test('initially shows tickers', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const showTickersButton = screen.getByText('Hide Tickers');
  expect(showTickersButton).toBeInTheDocument();
});

test('toggling tickers button works', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const showTickersButton = screen.getByText('Hide Tickers');
  fireEvent.click(showTickersButton);
  expect(screen.getByText('Show Tickers')).toBeInTheDocument();
});

test('update interval input is displayed', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const intervalInput = screen.getByPlaceholderText('Enter new interval (ms)');
  expect(intervalInput).toBeInTheDocument();
});

test('ticker buttons are displayed', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const tickerButtons = screen.getAllByRole('button');
  const showButtons = tickerButtons.filter(button => /show/i.test(button.textContent));
  const hideButtons = tickerButtons.filter(button => /hide/i.test(button.textContent));

  expect(showButtons.length + hideButtons.length).toBeGreaterThan(0);

});