import {render, screen} from '@testing-library/react';
import App from './app';

test('Renders app-component', () => {
  render(<App />);
  const textElement = screen.getByText(/Каталог фото- и видеотехники/i);
  expect(textElement).toBeInTheDocument();
});
