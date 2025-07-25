// Import UISchema utility functions
import {
  makeControl,
  makeRadio,
  setShowRule,
  setEnableRule,
  setDisableRule,
  makeVerticalLayout,
  makeHorizontalLayout,
  makeVerticalDivider,
  makeHorizontalDivider,
  makeVerticalLayoutWithDividers,
  makeHorizontalLayoutWithDividers,
  makeLabel
} from './uischemaUtils';

// #region main
  // #region main fasta
const e_output_dir = makeControl("#/properties/output_dir", "Output Directory", {
  helperText: "Directory where all output files will be stored"
});
      // #endregion main fasta
      // #region motif
const e_motif_type = makeRadio("#/properties/form_stats/properties/chosen_motif_type");
const e_pfm = setShowRule(
  makeControl("#/properties/motif/properties/pfm", "PFM", {helperText: "Path to a PFM file"}),
  "#/properties/form_stats/properties/chosen_motif_type",
  { "const": "PFM" }
);
const e_ppm = setShowRule(
  makeControl("#/properties/motif/properties/ppm", "PPM", {helperText: "Path to a PPM file"}),
  "#/properties/form_stats/properties/chosen_motif_type",
  { "const": "PPM" }
);
const e_consensus = makeControl("#/properties/motif/properties/consensus", "Consensus", {helperText: "IUPAC consensus sequence (e.g. ATWGCS)"})
const e_mutation_rate = setEnableRule(
  makeControl("#/properties/motif/properties/mutation_rate", "Mutation Rate", {helperText: "Mutation rate (0–1) if using ACTG consensus"}),
  "#/properties/motif/properties/consensus",
  {
    "pattern": "^[ACTGactg]+$"
  }
);
const e_consensus_with_mutation = setShowRule(
  makeVerticalLayout([e_consensus, e_mutation_rate]),
  "#/properties/form_stats/properties/chosen_motif_type",
  { "const": "Consensus" }
);
      // #endregion motif
    // #endregion main
    // #region combinations
const e_seq_amounts = makeControl("#/properties/combinations_configurations/properties/seq_amounts", "Sequence Amounts", {
  helperText: "List of sequence counts (e.g. [100, 200, 300])"
});
const e_injection_rates = makeControl("#/properties/combinations_configurations/properties/injection_rates", "Injection Rates", {
  helperText: "List of injection rates (e.g. [0.1, 0.2, 0.3])"
});
const e_n_replicates = makeControl("#/properties/combinations_configurations/properties/n_replicates", "Number of Replicates", {
  helperText: "Number of replicates to generate"
});
    // #endregion combinations
    // #region master fasta generation
const e_master_fasta_path = makeControl("#/properties/master_fasta", "Pre-made master FASTA Path", {
  helperText: "If set, master_fasta will be used and no new fasta is generated"
});
const e_master_fasta_name = makeControl("#/properties/fasta_generation_params/properties/name", "FASTA Name", {
  helperText: "Optional name for the fasta file (default: master_fasta.fasta)"
});
const e_master_fasta_bg_type = makeRadio("#/properties/fasta_generation_params/properties/bg_type", "Background Type", {
  helperText: "Type of background to generate (random, genomic, gc, promoter, true_random)"
});
const e_master_fasta_seq_length = makeControl("#/properties/fasta_generation_params/properties/seq_length", "Sequence Length", {
  helperText: "Length of each sequence (must be > 0)"
});
const e_master_fasta_seq_amount = makeControl("#/properties/fasta_generation_params/properties/seq_amount", "Sequence Amount", {
  helperText: "Number of sequences to generate (must be > 0)"
});

const e_master_fasta_left = makeVerticalLayoutWithDividers([
  e_master_fasta_name,
  e_master_fasta_seq_amount,
  e_master_fasta_seq_length
]);
// shows if the bg_type is either random or gc
const e_master_fasta_input_file = setShowRule(
  makeControl("#/properties/fasta_generation_params/properties/inputfile", "Input File", {helperText: "Path to input FASTA file (for genomic background)"}),
  "#/properties/fasta_generation_params/properties/bg_type",
  { "enum": ["random", "gc"] }
);

const e_master_fasta_gc_content = setShowRule(
  makeControl("#/properties/fasta_generation_params/properties/gc_content", "GC Content", {helperText: "Desired GC content (0–1) for GC background"}),
  "#/properties/fasta_generation_params/properties/bg_type",
  { "enum": ["true_random", "gc"] }
);
const e_master_fasta_bg = makeVerticalLayoutWithDividers([
  e_master_fasta_bg_type,
  e_master_fasta_input_file,
  e_master_fasta_gc_content
]);
const e_master_fasta = makeHorizontalLayoutWithDividers([
  e_master_fasta_left,
  e_master_fasta_bg
]);
const e_master_fasta_with_subtitle = makeVerticalLayoutWithDividers([
  e_master_fasta_path,
  makeLabel("The following section can be ignored if a custom FASTA path is provided above", "0.8rem"),
  setDisableRule(
    e_master_fasta,
    "#/properties/master_fasta",
    { "type": "string" }
  )
]);

    // #endregion master fasta generation
    // #region genome
const e_genome_source = makeControl("#/properties/genome_configurations/properties/genome_custom", "Genome", {
  helperText: "Path to genome FASTA or a genomepy genome name"
});
const e_install_genome = makeControl("#/properties/genome_configurations/properties/install_genome", "Install Genome", {
  helperText: "If true, download genome via genomepy if not present"
});
const e_genome = makeHorizontalLayoutWithDividers([
  e_genome_source,
  e_install_genome
]);
    // #endregion genome
    // #region dataset generation
const e_background_length = makeControl("#/properties/dataset_generation_params/properties/background_length", "Background Length", {
  helperText: "Length of background region (must be > 0)"
});
const e_force_dataset_generation = makeControl("#/properties/dataset_generation_params/properties/force", "Force Dataset Generation", {
  helperText: "If true, overwrite existing files"
});
const e_dataset_generation = makeHorizontalLayoutWithDividers([
  e_background_length,
  e_force_dataset_generation
]);
    // #endregion dataset generation
    // #region run denovo
const e_background_types = makeControl("#/properties/run_denovo_params/properties/background_types", "Background Types", {
  helperText: "Which background types to use (e.g. ['genomic', 'gc'])"
}); 
const e_ncpus = makeControl("#/properties/run_denovo_params/properties/ncpus", "Number of CPUs", {
  helperText: "Number of CPU cores to use (must be > 0)"
});
const e_tools = makeControl("#/properties/run_denovo_params/properties/tools", "Tools", {
  helperText: "List of de-novo motif discovery tools (e.g. ['homer', 'dreme'])"
});
const e_max_parallel = makeControl("#/properties/run_denovo_params/properties/max_parallel", "Max Parallel Runs", {
  helperText: "Maximum number of tools to run in parallel (must be > 0)"
});
const e_rerun_failed = makeControl("#/properties/run_denovo_params/properties/rerun_failed", "Rerun Failed", {
  helperText: "If true, retry failed tool runs"
});
const e_force_run_denovo = makeControl("#/properties/run_denovo_params/properties/force", "Force Run De-novo", {
  helperText: "If true, overwrite existing results"
});
const e_total_runs = makeControl("#/properties/form_stats/properties/total_runs_label", "Total Runs", {
  helperText: "Total number of runs to perform",
  readOnly: true
});

const e_denovo_flags = makeVerticalLayoutWithDividers([
  e_rerun_failed,
  e_force_run_denovo
]);
const e_denovo_parallels = makeHorizontalLayout([
  makeVerticalLayoutWithDividers([
    e_ncpus,
    e_max_parallel,
  ]),
  e_total_runs,
  makeVerticalDivider(),
  e_denovo_flags
]);


const e_denovo = makeVerticalLayoutWithDividers([
  e_background_types,
  e_tools,
  e_denovo_parallels,
]);

    // #endregion run denovo
    // #region match parameters
const e_match = makeRadio("#/properties/match_params/properties/match", "Match", {
  helperText: "Matching mode (partial, subtotal, total)"
});
const e_metric = makeRadio("#/properties/match_params/properties/metric", "Metric", {
  helperText: "Similarity metric (seqcor, pcc, ed, distance, wic, chisq, akl, ssd)"
});
const e_combine = makeRadio("#/properties/match_params/properties/combine", "Combine", {
  helperText: "How to combine scores (mean, sum)"
});
const e_min_score = makeControl("#/properties/match_params/properties/min_score", "Minimum Score", {
  helperText: "Threshold for reporting a match (0–1)"
});
const e_match_params = makeHorizontalLayout([
  e_match,
  makeVerticalDivider(),
  e_metric,
  makeVerticalDivider(),
  e_combine,
  makeVerticalDivider(),
  e_min_score
]);
// #endregion match parameters

// Export all UISchema element constants
export {
  e_output_dir,
  e_motif_type,
  e_pfm,
  e_ppm,
  e_consensus,
  e_mutation_rate,
  e_consensus_with_mutation,
  e_seq_amounts,
  e_injection_rates,
  e_n_replicates,
  e_master_fasta_path,
  e_master_fasta_name,
  e_master_fasta_bg_type,
  e_master_fasta_seq_length,
  e_master_fasta_seq_amount,
  e_master_fasta_left,
  e_master_fasta_input_file,
  e_master_fasta_gc_content,
  e_master_fasta_bg,
  e_master_fasta,
  e_master_fasta_with_subtitle,
  e_genome_source,
  e_install_genome,
  e_genome,
  e_background_length,
  e_force_dataset_generation,
  e_dataset_generation,
  e_background_types,
  e_ncpus,
  e_tools,
  e_max_parallel,
  e_rerun_failed,
  e_force_run_denovo,
  e_total_runs,
  e_denovo_flags,
  e_denovo_parallels,
  e_denovo,
  e_match,
  e_metric,
  e_combine,
  e_min_score,
  e_match_params
};