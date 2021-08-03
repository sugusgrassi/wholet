import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/index";

import App from './App';
import About from './components/About/About';
import E404 from './components/E404/E404';


// https://stackoverflow.com/questions/62732346/test-exception-unstable-flushdiscreteupdates
// https://jestjs.io/docs/api#beforeallfn-timeout
beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: jest.fn(),
  });
});


test('renders Who let the dogs app link', () => {
  render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      );
  const linkElement = screen.getByText(/Who let the dogs app/i);
  expect(linkElement).toBeInTheDocument();
}); 


test('Renders the about component', () => {
    render(<About /> );
    expect(screen.getAllByText('This is the About component')).toHaveLength(1)
})

test('Renders E404', () => {
  render(<E404 /> );
  expect(screen.getAllByText('Error 404')).toHaveLength(1)
})