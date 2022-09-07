import React from 'react';
import { render } from '@testing-library/react';
import { BasicModEditor } from './mod-editor.composition';


it('should render with the correct text', () => {
  const { getByText } = render(<BasicModEditor />);
  const rendered = getByText('hello from ModEditor');
  expect(rendered).toBeTruthy();
});

