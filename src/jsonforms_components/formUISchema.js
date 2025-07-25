// UISchema utilities and element imports
import {
  makeAccordion,
  makeLabel,
  makeVerticalLayout,
  makeHorizontalLayout,
  makeVerticalDivider,
  makeHorizontalDivider,
  makeVerticalLayoutWithDividers,
  makeHorizontalLayoutWithDividers
} from './uischemaUtils';
import {
  e_output_dir,
  e_motif_type,
  e_pfm,
  e_ppm,
  e_consensus_with_mutation,
  e_seq_amounts,
  e_injection_rates,
  e_n_replicates,
  e_master_fasta_with_subtitle,
  e_genome,
  e_dataset_generation,
  e_denovo,
  e_match_params
} from './uischemaElements';
export const uischema = {
  "type": "VerticalLayout",
  "elements": [
    makeAccordion("Base Settings", [
      makeVerticalLayout([
        e_output_dir,
        makeHorizontalDivider(),
        makeLabel("Motif Definition"),
        makeHorizontalLayoutWithDividers([
          e_motif_type,
          makeVerticalLayout([
            e_pfm,
            e_ppm,
            e_consensus_with_mutation
          ])
        ]),
        makeHorizontalDivider(),
        makeLabel("Combinations Configuration"),
        makeHorizontalLayoutWithDividers([
          e_seq_amounts,
          e_injection_rates,
          e_n_replicates
        ]),
      ]),
    ]),
    makeAccordion("Master FASTA Generation", [
      e_master_fasta_with_subtitle
    ]),
    makeAccordion("Genome", [
      e_genome
    ]),
    makeAccordion("Dataset Generation", [
      e_dataset_generation
    ]),
    makeAccordion("Run De-novo", [
      e_denovo
    ]),
    makeAccordion("Match Parameters", [
      e_match_params
    ])
  ]
};