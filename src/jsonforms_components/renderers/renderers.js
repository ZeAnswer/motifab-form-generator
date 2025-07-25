import { materialRenderers } from '@jsonforms/material-renderers';
import { AccordionRenderer, AccordionTester } from './AccordionGroup.jsx';
import { LabelControl, labelControlTester } from './LabelControl.jsx';
import { customRadioTester, CustomRadioRenderer } from './CustomRadioControl.jsx';
import  CustomLabelRenderer, {customLabelTester } from './CustomLabel.jsx';
import DividerRenderer, { dividerTester } from './DividerRenderer.jsx';

export const renderers = [
  ...materialRenderers,
  { tester: AccordionTester, renderer: AccordionRenderer },
  { tester: labelControlTester, renderer: LabelControl },
  { tester: customRadioTester, renderer: CustomRadioRenderer },
  { tester: customLabelTester, renderer: CustomLabelRenderer },
  { tester: dividerTester, renderer: DividerRenderer }
];