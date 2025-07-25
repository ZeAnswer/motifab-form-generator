// src/DividerRenderer.jsx
import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { rankWith } from '@jsonforms/core';
import { Divider } from '@mui/material';

// 1. The renderer component
const DividerRenderer = ({ uischema, visible }) => {
  if (!visible) return null;
  // orientation: "horizontal" or "vertical", default horizontal
  const { orientation = 'horizontal', flexItem = false, sx } = uischema.options || {};
  return (
    <Divider
      orientation={orientation}
      flexItem={flexItem}
      sx={{ my: 1, ...sx }}   // my:1 gives small vertical margin
    />
  );
};

// 2. Tester: pick up UISchema elements whose type==="Divider"
export const dividerTester = rankWith(
  1000,
  uischema => uischema.type === 'Divider'
);

// 3. Wrap it so JSON Forms can inject props
export default withJsonFormsLayoutProps(DividerRenderer);
