import { z } from "zod";

export const selectSchema = z.object({
  category: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, " ")),
});

export const featureSchema = z.object({
  feature: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, " ")),
})

export const mainSchema = z.object({
    koi_score: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_period: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_impact: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_duration: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_depth: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_prad: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_teq: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_max_sngle_ev: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_max_mult_ev: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_model_snr: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_count: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_num_transits: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_bin_oedp_sig: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_steff: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_slogg: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_srad: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_smass: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_kepmag: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_gmag: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_rmag: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_jmag: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_kmag: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_fwm_stat_sig: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_fwm_prao: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_fwm_pdeco: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_dicco_mra: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_dicco_msky: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_dikco_mra: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    koi_dikco_msky: z.number().or(z.string().pipe(z.coerce.number())).optional(),
    model: z.enum(["VotingClassifier", "XGBoost", "LightGBM", "CatBoost"])
})