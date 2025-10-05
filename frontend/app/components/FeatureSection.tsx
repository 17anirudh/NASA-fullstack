"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { featureSchema } from "../resolvers/SelectForm";
import { Button } from "@/components/ui/button";
import FeatureGraph from "./FeatureGraph";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SubFeatureSectionProps {
    id: string,
    values: Array<string>
}

export default function SubFeatureSection({id, values}: SubFeatureSectionProps) {
    const [feature, setfeature] = useState("")
    const form = useForm<z.infer<typeof featureSchema>>({
        resolver: zodResolver(featureSchema),
        defaultValues: {
            feature: ""
        }
    })

    async function onSubmit(values: z.infer<typeof featureSchema>) {
        if (!values.feature) {
            toast.error("Server Error: feature not found");
        }
        else {
            setfeature(values.feature);
            toast.success(`Displaying ${values.feature} features`);
        }
    }
    return (
        <>
            <Card style={{ backgroundColor: "#000000", color: "#FFFFFF", border: "none"}}>
                <CardHeader>
                    <CardTitle style={{textDecoration: "underline"}}>{id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                            control={form.control}
                            name="feature"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Feature</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a feature to display related features" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            {values.map((category) => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    {feature && 
                    <FeatureGraph id={feature}/>
                    }
                </CardContent>
            </Card>
        </>
    )
}