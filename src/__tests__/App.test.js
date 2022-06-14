import { render, screen } from "../test-utils";
import "@testing-library/jest-dom";

import App from "../App";


global.scrollTo = jest.fn();


test('renders App', () => {
  render(<App />);

  expect(screen.getByRole("banner")).toBeInTheDocument();
});
