"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react";
import { z } from "zod"
import { mainSchema } from "../resolvers/SelectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POST } from "../api/backend";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type FeatureKeys =
  | "koi_score"
  | "koi_period"
  | "koi_impact"
  | "koi_duration"
  | "koi_depth"
  | "koi_prad"
  | "koi_teq"
  | "koi_max_sngle_ev"
  | "koi_max_mult_ev"
  | "koi_model_snr"
  | "koi_count"
  | "koi_num_transits"
  | "koi_bin_oedp_sig"
  | "koi_steff"
  | "koi_slogg"
  | "koi_srad"
  | "koi_smass"
  | "koi_kepmag"
  | "koi_gmag"
  | "koi_rmag"
  | "koi_jmag"
  | "koi_kmag"
  | "koi_fwm_stat_sig"
  | "koi_fwm_prao"
  | "koi_fwm_pdeco"
  | "koi_dicco_mra"
  | "koi_dicco_msky"
  | "koi_dikco_mra"
  | "koi_dikco_msky"
  | "model";

const Features: FeatureKeys[] = [
  "koi_score",
  "koi_period",
  "koi_impact",
  "koi_duration",
  "koi_depth",
  "koi_prad",
  "koi_teq",
  "koi_max_sngle_ev",
  "koi_max_mult_ev",
  "koi_model_snr",
  "koi_count",
  "koi_num_transits",
  "koi_bin_oedp_sig",
  "koi_steff",
  "koi_slogg",
  "koi_srad",
  "koi_smass",
  "koi_kepmag",
  "koi_gmag",
  "koi_rmag",
  "koi_jmag",
  "koi_kmag",
  "koi_fwm_stat_sig",
  "koi_fwm_prao",
  "koi_fwm_pdeco",
  "koi_dicco_mra",
  "koi_dicco_msky",
  "koi_dikco_mra",
  "koi_dikco_msky",
  "model"
];

export default function Prediction() {
    var response = {}
    let [resultMessage, setResultMessage] = useState<any>(null);
    const form = useForm<z.infer<typeof mainSchema>>({
        resolver: zodResolver(mainSchema),
        defaultValues: {
            "koi_score": 0,
            "koi_period": 0,
            "koi_impact": 0,
            "koi_duration": 0,
            "koi_depth": 0,
            "koi_prad": 0,
            "koi_teq": 0,
            "koi_max_sngle_ev": 0,
            "koi_max_mult_ev": 0,
            "koi_model_snr": 0,
            "koi_count": 0,
            "koi_num_transits": 0,
            "koi_bin_oedp_sig": 0,
            "koi_steff": 0,
            "koi_slogg": 0,
            "koi_srad": 0,
            "koi_smass": 0,
            "koi_kepmag": 0,
            "koi_gmag": 0,
            "koi_rmag": 0,
            "koi_jmag": 0,
            "koi_kmag": 0,
            "koi_fwm_stat_sig": 0,
            "koi_fwm_prao": 0,
            "koi_fwm_pdeco": 0,
            "koi_dicco_mra": 0,
            "koi_dicco_msky": 0,
            "koi_dikco_mra": 0,
            "koi_dikco_msky": 0,
            "model": "LightGBM"
        }
    })
async function onSubmit(values: z.infer<typeof mainSchema>) {
    // Convert all numeric fields from string to number
    const parsedValues = { ...values };
    Features.filter(f => f !== "model").forEach((feature) => {
        if (typeof parsedValues[feature] === "string") {
            parsedValues[feature] = parsedValues[feature] === "" ? 0 : Number(parsedValues[feature]);
        }
    });

    const result = await POST(parsedValues);
    if (!result) {
        toast.error("No response from server.");
        return;
    }
    if (result.status === "error") {
        toast.error(JSON.stringify(result.message));
    } else {
        response = result;
        setResultMessage(result.body);
        toast.success("Scroll for prediction");
    }
}
    return (
        <>
        <Card style={{ backgroundColor: "#000000", color: "#FFFFFF", border: "none"}}>
        <CardHeader>
            <CardTitle style={{textDecoration: "underline"}}>Features Overview</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            {Features.filter(f => f !== "model").map((feature) => (
                <FormField
                    key={feature}
                    control={form.control}
                    name={feature as keyof z.infer<typeof mainSchema>}
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>{feature}</FormLabel>
                            <Input placeholder="0" type="number" {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <FormField
                control={form.control}
                name="model"
                render={({ field }: { field: any }) => (
                    <FormItem>
                        <FormLabel>Select Model</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="XGBoost">XGBoost</SelectItem>
                                <SelectItem value="CatBoost">CatBoost</SelectItem>
                                <SelectItem value="LightGBM">LightGBM</SelectItem>
                                <SelectItem value="VotingClassifier">Voting Classifier</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        </CardContent>
    </Card>
        <section>
        {resultMessage && (
            <div className="mt-6 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600">Prediction</p>
                        <p className="text-xl font-bold">{resultMessage.prediction}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600">Confidence</p>
                        <p className="text-xl font-bold">
                            {(parseFloat(resultMessage.confidence) * 100).toFixed(2)}%
                        </p>
                    </div>

                    {resultMessage.neighbor && (
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Nearest Neighbors</p>
                            {resultMessage.neighbor.map((n: string, i: number) => (
                                <div key={i} className="text-sm bg-neutral-600 p-3 rounded mb-2">
                                    {n}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}
        </section>
    </>
    )
}