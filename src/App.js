// src/App.js
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells } from '@jsonforms/material-renderers';
import { Box, Paper, Typography, Button } from '@mui/material';
import { allValidators } from './jsonforms_components/validators.js';
import { Alert, List, ListItem, ListItemText } from '@mui/material';
import { schema } from './jsonforms_components/formJsonSchema.js';
import { uischema } from './jsonforms_components/formUISchema.js';
import { renderers } from './jsonforms_components/renderers/renderers.js'; // Import custom renderers
// #region App component

const prepareJsonForExport = (data) => {
  // copy data to avoid mutating original state
  const dataToExport = JSON.parse(JSON.stringify(data));
  // only one of consensus, pfm or ppm should be provided based on form_stats.chosen_motif_type
  if (dataToExport.motif) {
    if (dataToExport.form_stats?.chosen_motif_type === "Consensus") {
      dataToExport.motif.pfm = undefined;
      dataToExport.motif.ppm = undefined;
    } else if (dataToExport.form_stats?.chosen_motif_type === "PFM") {
      dataToExport.motif.consensus = undefined;
      dataToExport.motif.ppm = undefined;
      dataToExport.motif.mutation_rate = undefined; // mutation rate is not needed for PFM
    } else if (dataToExport.form_stats?.chosen_motif_type === "PPM") {
      dataToExport.motif.consensus = undefined;
      dataToExport.motif.pfm = undefined;
      dataToExport.motif.mutation_rate = undefined; // mutation rate is not needed for PPM
    }
  }
  // remove form_stats as it is not part of the schema
  // if (dataToExport.form_stats) {
  //   delete dataToExport.form_stats;
  // rename genome_custom to genome
  dataToExport.genome_configurations = dataToExport.genome_configurations || {};
  if (dataToExport.genome_configurations.genome_custom) {
    dataToExport.genome_configurations.genome = dataToExport.genome_configurations.genome_custom;
    delete dataToExport.genome_configurations.genome_custom;
  }

  // if master_fasta is provided, remove fasta_generation_params
  if (dataToExport.master_fasta) {
    delete dataToExport.fasta_generation_params;
  } 
  return dataToExport;
};
// #endregion App component
export default function App() {
  const [data, setData] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  React.useEffect(() => {
    const ncpus = data.run_denovo_params?.ncpus || 1;
    const max_parallel = data.run_denovo_params?.max_parallel || 1;
    const totalRunsString = `Expected Minimum CPUs required: ${ncpus * max_parallel}`;
    if (data.form_stats?.total_runs_label !== totalRunsString) {
      setData(prevData => ({ ...prevData, form_stats: { ...prevData.form_stats, total_runs_label: totalRunsString } }));
    }
  }, [data]);

  // run our custom validators on every data change
  React.useEffect(() => {
    const errors = allValidators.flatMap(fn => fn(data));
    setValidationErrors(errors);
  }, [data]);

  const handleSave = () => {
    const exportData = prepareJsonForExport(data);
    const blob       = new Blob(
      [JSON.stringify(exportData, null, 2)],
      { type: 'application/json' }
    );
    const url        = URL.createObjectURL(blob);
    const a          = document.createElement('a');
    a.href           = url;
    a.download       = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
   <Box display="flex" p={2} gap={4}>
      {/* Your form */}
      <Box flex="1">
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      </Box>

      {/* Live JSON preview */}
      <Box flex="1">
        <Typography variant="h6" gutterBottom>
          Current Form Data
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa', overflow: 'auto', maxHeight: '80vh' }}>
          <pre style={{ margin: 0, fontFamily: 'monospace' }}>
            {JSON.stringify(prepareJsonForExport(data), null, 2)}
          </pre>
        </Paper>
        {/* —— custom validation errors —— */}
        {validationErrors.length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Validation Errors:</Typography>
            <List dense>
              {validationErrors.map((err, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemText primary={err.message} />
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            Save Configuration
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
