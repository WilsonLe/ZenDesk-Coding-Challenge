import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

it('App renders correctly', () => {
  const { queryByLabelText, getByLabelText } = render(<App />);
  expect(queryByLabelText('HELLO WORLD')).toBeDefined();
});
