// src/LabelControl.jsx
import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith } from '@jsonforms/core';

/**
 * A renderer that simply prints its data (a string) as plain text.
 */
const LabelRenderer = ({ data, id, visible }) => {
  if (!visible) return null;
  return (
    <div id={id} style={{ padding: '8px 4px', fontStyle: 'italic' }}>
      {data}
    </div>
  );
};

/**
 * A tester that matches any Control whose scope string ends with "_label"
 */
export const labelControlTester = rankWith(
  1000,
  uischema =>
    uischema.type === 'Control' &&
    typeof uischema.scope === 'string' &&
    uischema.scope.endsWith('_label')
);

// Wrap it so JSON Forms can inject props
export const LabelControl = withJsonFormsControlProps(LabelRenderer);
