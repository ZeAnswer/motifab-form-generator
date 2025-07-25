// src/CustomRadioControl.jsx
import React, { useState, useEffect } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { rankWith } from '@jsonforms/core';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
  FormHelperText
} from '@mui/material';

// Tester: match any Control whose prop name ends with "_custom"
export const customRadioTester = rankWith(
  1000,
  uischema =>
    uischema.type === 'Control' &&
    typeof uischema.scope === 'string' &&
    uischema.scope.split('/').pop().endsWith('_custom')
);

const CustomRadioControl = (props) => {
  const {
    data,
    handleChange,
    path,
    schema,
    label,
    uischema
  } = props;

  // pull out your helperText & flag (falling back to JSON‐schema description)
  const {
    helperText = schema.description || '',
    showUnfocusedDescription = false
  } = uischema.options || {};

  // focus tracking for “show only on focus” behavior
  const [focused, setFocused] = useState(false);

  // radio + custom input logic as before
  const enumOptions = schema.enum || [];
  const CUSTOM_VALUE = '__custom__';
  const [selection, setSelection] = useState(
    enumOptions.includes(data) ? data : CUSTOM_VALUE
  );
  const [customText, setCustomText] = useState(
    enumOptions.includes(data) ? '' : data || ''
  );

  useEffect(() => {
    if (enumOptions.includes(data)) {
      setSelection(data);
      setCustomText('');
    } else {
      setSelection(CUSTOM_VALUE);
      setCustomText(data || '');
    }
  }, [data, enumOptions]);

  const onRadioChange = (_, value) => {
    setSelection(value);
    handleChange(path, value === CUSTOM_VALUE ? customText : value);
  };

  const onCustomTextChange = (e) => {
    const v = e.target.value;
    setCustomText(v);
    if (selection === CUSTOM_VALUE) {
      handleChange(path, v);
    }
  };

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel>{label || schema.title || path.split('/').pop()}</FormLabel>

      <RadioGroup
        value={selection}
        onChange={onRadioChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {enumOptions.map(opt => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
        <FormControlLabel
          value={CUSTOM_VALUE}
          control={<Radio />}
          label="Other"
        />
      </RadioGroup>

      {selection === CUSTOM_VALUE && (
        <Box mt={2}>
          <TextField
            fullWidth
            label="Custom value"
            value={customText}
            onChange={onCustomTextChange}
          />
        </Box>
      )}

      {/* The helper text: 
          - always shown if showUnfocusedDescription=true 
          - otherwise only shown when focused */}
      {helperText && (showUnfocusedDescription || focused) && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export const CustomRadioRenderer = withJsonFormsControlProps(CustomRadioControl);
