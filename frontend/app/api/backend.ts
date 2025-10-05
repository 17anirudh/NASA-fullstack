"use server";
import z from "zod";
import { mainSchema } from "../resolvers/SelectForm";

type ResponseData = {
    status: 'success' | 'error';
    message: string;
    code?: number;
    body?: any;
};

export async function POST(values: z.infer<typeof mainSchema>): Promise<ResponseData> {
    const result = mainSchema.safeParse(values);
    if(!result.success) {
        return {
            status: 'error',
            message: result.error.message
        };
    }
    
    try {        
        const payload = {
            koi_score: result.data.koi_score,
            koi_period: result.data.koi_period,
            koi_impact: result.data.koi_impact,  // This was missing!
            koi_duration: result.data.koi_duration,
            koi_depth: result.data.koi_depth,
            koi_prad: result.data.koi_prad,
            koi_teq: result.data.koi_teq,
            koi_max_sngle_ev: result.data.koi_max_sngle_ev,
            koi_max_mult_ev: result.data.koi_max_mult_ev,
            koi_model_snr: result.data.koi_model_snr,
            koi_count: result.data.koi_count,
            koi_num_transits: result.data.koi_num_transits,
            koi_bin_oedp_sig: result.data.koi_bin_oedp_sig,
            koi_steff: result.data.koi_steff,
            koi_slogg: result.data.koi_slogg,
            koi_srad: result.data.koi_srad,
            koi_smass: result.data.koi_smass,
            koi_kepmag: result.data.koi_kepmag,
            koi_gmag: result.data.koi_gmag,
            koi_rmag: result.data.koi_rmag,
            koi_jmag: result.data.koi_jmag,
            koi_kmag: result.data.koi_kmag,
            koi_fwm_stat_sig: result.data.koi_fwm_stat_sig,
            koi_fwm_prao: result.data.koi_fwm_prao,
            koi_fwm_pdeco: result.data.koi_fwm_pdeco,
            koi_dicco_mra: result.data.koi_dicco_mra,
            koi_dicco_msky: result.data.koi_dicco_msky,
            koi_dikco_mra: result.data.koi_dikco_mra,
            koi_dikco_msky: result.data.koi_dikco_msky,
            model: result.data.model  
        };

        console.log('Sending payload:', payload);

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return {
                status: 'error',
                message: `Failed to submit: ${response.status} - ${errorText}`,
                code: response.status
            };
        }

        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success === false) {
            return {
                status: 'error',
                message: data.message || 'Prediction failed',
                code: response.status
            }
        }
        
        return {
            status: 'success',
            message: 'Prediction completed successfully',
            code: response.status,
            body: data
        };
    } 
    catch (error) {
        console.error('Catch error:', error);
        return {
            status: 'error',
            message: `Failed to submit your message: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}