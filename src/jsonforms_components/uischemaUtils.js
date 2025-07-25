// src/uischemaUtils.js
// Utility functions for building JSON Forms UISchema elements

export const makeLabel = (text, fontSize = '1rem') => ({
  type: 'Label',
  text,
  options: { fontSize }
});

export const makeVerticalLayout = (elements) => ({
  type: 'VerticalLayout',
  elements
});

export const makeHorizontalLayout = (elements) => ({
  type: 'HorizontalLayout',
  elements
});

export const makeAccordion = (label, elements) => ({
  type: 'Group',
  label,
  elements
});

export const makeControl = (scope, label = "", options = {}) => ({
  type: 'Control',
  scope,
  label,
  options: {
    showUnfocusedDescription: true,
    ...options
  }
});

export const makeRadio = (scope, label = "", options = {}) =>
  makeControl(scope, label, { format: 'radio', ...options });

export const setRule = (uischema, effect, scope, comparisonSchema, failWhenUndefined = true) => ({
  ...uischema,
  rule: {
    effect,
    condition: { scope, schema: comparisonSchema, failWhenUndefined }
  }
});

export const setShowRule = (uischema, scope, comparisonSchema, failWhenUndefined = true) =>
  setRule(uischema, 'SHOW', scope, comparisonSchema, failWhenUndefined);

export const setHideRule = (uischema, scope, comparisonSchema, failWhenUndefined = true) =>
  setRule(uischema, 'HIDE', scope, comparisonSchema, failWhenUndefined);

export const setEnableRule = (uischema, scope, comparisonSchema, failWhenUndefined = true) =>
  setRule(uischema, 'ENABLE', scope, comparisonSchema, failWhenUndefined);

export const setDisableRule = (uischema, scope, comparisonSchema, failWhenUndefined = true) =>
  setRule(uischema, 'DISABLE', scope, comparisonSchema, failWhenUndefined);

export const makeVerticalDivider = () => ({
  type: 'Divider',
  options: { orientation: 'vertical' }
});

export const makeHorizontalDivider = () => ({
  type: 'Divider',
  options: { orientation: 'horizontal' }
});

export const makeVerticalLayoutWithDividers = (elements) =>
  makeVerticalLayout(
    elements.flatMap((el, i) => (i < elements.length - 1 ? [el, makeHorizontalDivider()] : [el]))
  );

export const makeHorizontalLayoutWithDividers = (elements) =>
  makeHorizontalLayout(
    elements.flatMap((el, i) => (i < elements.length - 1 ? [el, makeVerticalDivider()] : [el]))
  );
