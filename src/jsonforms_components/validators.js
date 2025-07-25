// src/validators.js
export function validateMotif(data) {
  const errs = [];
  const type = data.form_stats?.chosen_motif_type;
  if (type === 'PFM' && !data.motif?.pfm) {
    errs.push({
      path: 'motif.pfm',
      message: '⛔ You selected PFM but didn’t provide a PFM file path.'
    });
  }
  if (type === 'PPM' && !data.motif?.ppm) {
    errs.push({
      path: 'motif.ppm',
      message: '⛔ You selected PPM but didn’t provide a PPM file path.'
    });
  }
  if (type === 'Consensus' && !data.motif?.consensus) {
    errs.push({
      path: 'motif.consensus',
      message: '⛔ You selected Consensus but didn’t provide a consensus sequence.'
    });
  }
  return errs;
}

export function validateBackgroundLength(data) {
  const errs = [];
  const bgLen = data.dataset_generation_params?.background_length;
  const seqAmount = data.fasta_generation_params?.seq_amount;
  // only check when both are defined
  if (bgLen != null && seqAmount != null && seqAmount < bgLen) {
    errs.push({
      path: 'dataset_generation_params.background_length',
      message: `⛔ Background Length (${bgLen}) can’t exceed master sequence count (${seqAmount}).`
    });
  }
  return errs;
}

// export an array for easy iteration
export const allValidators = [
  validateMotif,
  validateBackgroundLength,
  // add more validators here…
];
