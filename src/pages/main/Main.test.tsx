import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  const linkElement = getByText(/Main/i);
  expect(linkElement).toBeInTheDocument();
});
