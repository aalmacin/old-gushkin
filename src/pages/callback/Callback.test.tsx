import React from 'react';
import { render } from '@testing-library/react';
import Callback from './Callback';

test('renders learn react link', () => {
  const { getByText } = render(<Callback />);
  const linkElement = getByText(/Callback/i);
  expect(linkElement).toBeInTheDocument();
});
