import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

//Testeo que la aplicacion renderice sin problemas.
test('renders without crashing', async () => {
  const { findByText } = render(<App />);
  const title = await findByText(/Última visita/i);
  expect(title).toBeInTheDocument();
});
