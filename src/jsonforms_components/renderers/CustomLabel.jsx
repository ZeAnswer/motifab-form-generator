// src/CustomLabel.jsx
import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { rankWith, uiTypeIs } from '@jsonforms/core';

// 1) Renderer component
const CustomLabelRenderer = ({ uischema, visible }) => {
  const { text, options = {} } = uischema;
  const size = options.fontSize || '1rem';
  if (!visible) return null;
  return (
    <div style={{ fontSize: size, margin: '0.5em 0', fontWeight: 500 }}>
      {text}
    </div>
  );
};

// 2) Tester: apply to all Label elements
export const customLabelTester = rankWith(1000, uiTypeIs('Label'));

// 3) Wrap for JSON Forms
export default withJsonFormsLayoutProps(CustomLabelRenderer);
