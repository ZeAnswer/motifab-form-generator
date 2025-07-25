// src/AccordionGroup.jsx
import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { rankWith, uiTypeIs } from '@jsonforms/core';

const AccordionGroupRenderer = ({
  uischema, schema, path, visible, renderers
}) => {
  const layoutProps = { elements: uischema.elements, schema, path, visible, renderers };
  return (
    <Accordion defaultExpanded={false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography>{uischema.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MaterialLayoutRenderer {...layoutProps}/>
      </AccordionDetails>
    </Accordion>
  );
};

// Tester: only apply this renderer to UISchema type "Group"
export const AccordionTester = rankWith(1000, uiTypeIs('Group'));
// Wrap it so JSON Forms can pass in props
export const AccordionRenderer = withJsonFormsLayoutProps(AccordionGroupRenderer);
