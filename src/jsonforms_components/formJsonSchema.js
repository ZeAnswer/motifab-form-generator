
const master_fasta = {
  type: "string",
  description: "Path to the master FASTA file"
}

const output_dir = {
  type: "string",
  description: "Main output directory for the project, where all results will be stored"
}

const motif = {
  type: "object",
  description: "Options for motif definition; only one of consensus, pfm or ppm should be provided",
  properties: {
    consensus: {
      type: "string",
      description: "IUPAC consensus sequence"
    },
    mutation_rate: {
      type: "number",
      description: "Mutation rate to apply when consensus uses only A,C,T,G",
      minimum: 0,
      maximum: 1
    },
    pfm: {
      type: "string",
      description: "Path to a PFM file"
    },
    ppm: {
      type: "string",
      description: "Path to a PPM file"
    }
  }
}

const combinations_configurations = {
  type: "object",
  description: "Parameters for generating combination sets",
  properties: {
    seq_amounts: {
      type: "array",
      description: "List of sequence counts",
      items: { type: "integer", minimum: 1 }
    },
    injection_rates: {
      type: "array",
      description: "List of injection rates",
      items: { type: "number", minimum: 0, maximum: 1 }
    },
    n_replicates: {
      type: "integer",
      description: "Number of replicates to generate",
      minimum: 1
    }
  }
}

const genome_configurations = {
  type: "object",
  description: "Where to get the genome and whether to install it",
  properties: {
    genome_custom: {
      type: "string",
      enum: ["hg38", "hg19", "mm10", "mm9", "dm6", "ce10", "sacCer3", "danRer11", "TAIR10"],
      description: "Path to genome FASTA or a genomepy genome name"
    },
    install_genome: {
      type: "boolean",
      description: "If true, download genome via genomepy if not present"
    }
  }
}

const fasta_generation_params = {
  type: "object",
  description: "Parameters controlling FASTA generation",
  properties: {
    name: {
      type: "string",
      description: "Optional name for the fasta file"
    },
    bg_type: {
      type: "string",
      enum: ["random", "true_random", "genomic", "gc", "promoter"],
      description: "Background type; affects which other fields are required"
    },
    seq_length: {
      type: "integer",
      minimum: 1,
      description: "Length of each sequence"
    },
    seq_amount: {
      type: "integer",
      minimum: 1,
      description: "Number of sequences to generate"
    },
    inputfile: {
      type: "string",
      description: "Path to input FASTA file (for certain bg_types)"
    },
    gc_content: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description: "Desired GC content (for certain bg_types)"
    }
  }
}

const dataset_generation_params = {
  type: "object",
  properties: {
    background_length: {
      type: "integer",
      minimum: 1,
      description: "If provided, creates an additional 'custom background' fasta file with the provided amount of sequences from the master FASTA."
    },
    force: {
      type: "boolean",
      description: "If true, overwrite existing files"
    }
  }
}

const run_denovo_params = {
  type: "object",
  properties: {
    background_types: {
      type: "array",
      uniqueItems: true,
      items: { 
        type: "string",
        enum: ["genomic", "gc", "promoter", "random"]
      },
      description: "Which background types to use"
    },
    ncpus: {
      type: "integer",
      minimum: 1,
      description: "Number of CPU cores to use"
    },
    tools: {
      type: "array",
      uniqueItems: true,
      items: { 
        type: "string",
        enum: ['Homer', 'MEME', 'BioProspector', 'AMD', 'ChIPMunk', 'DiNAMO', 'GADEM', 'HMS',  'Improbizer', 'MDmodule', 'MEMEW', 'MotifSampler', 'Posmo', 'ProSampler', 'Trawler', 'Weeder', 'XXmotif']
      },
      description: "List of de-novo motif discovery tools"
    },
    max_parallel: {
      type: "integer",
      minimum: 1,
      description: "Maximum number of tools to run in parallel"
    },
    rerun_failed: {
      type: "boolean",
      description: "If true, retry failed tool runs"
    },
    force: {
      type: "boolean",
      description: "If true, overwrite existing results"
    }
  }
}

const match_params = {
  type: "object",
  properties: {
    match: {
      type: "string",
      enum: ["partial", "subtotal", "total"],
      description: "Matching mode"
    },
    metric: {
      type: "string",
      enum: ["seqcor", "pcc", "ed", "distance", "wic", "chisq", "akl", "ssd"],
      description: "Similarity metric"
    },
    combine: {
      type: "string",
      enum: ["mean", "sum"],
      description: "How to combine scores"
    },
    min_score: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description: "Threshold for reporting a match"
    }
  }
}

const form_stats = {
  type: "object",
  properties: {
    chosen_motif_type: {
      type: "string",
      enum: ["Consensus", "PFM", "PPM"],
      description: "Type of motif chosen by the user"
    },
    total_runs_label: {
      type: "string",
      description: "Total number of runs to perform"
    }
  }
}

export const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "master_fasta": master_fasta,
    "output_dir": output_dir,
    "motif": motif,
    "combinations_configurations": combinations_configurations,
    "genome_configurations": genome_configurations,
    "fasta_generation_params": fasta_generation_params,
    "dataset_generation_params": dataset_generation_params,
    "run_denovo_params": run_denovo_params,
    "match_params": match_params,
    "form_stats": form_stats
  }
}