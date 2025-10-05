"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import FeatureCategories from "@/app/data/FeaturesCategories.json";
import SubFeatureSection from "./FeatureSection"
import { selectSchema } from "../resolvers/SelectForm";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "@/components/ui/select"
import { useState } from "react";

export default function FeatureSection() {
    const [category, setCategory] = useState("");
    const form = useForm<z.infer<typeof selectSchema>>({
        resolver: zodResolver(selectSchema),
        defaultValues: {
            category: ""
        }
    })

    async function onSubmit(values: z.infer<typeof selectSchema>) {
        if (!values.category) {
            toast.error("Server Error: Category not found");
        }
        else {
            setCategory(values.category);
            toast.success(`Displaying ${values.category} features`);
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
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category to display related features" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                                {Object.entries(FeatureCategories).map(([id]) => (
                                    <SelectItem key={id} value={id}>
                                        {id}
                                    </SelectItem>
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
        <section>
            {category && 
            <SubFeatureSection 
            id={category} 
            values={FeatureCategories[category as keyof typeof FeatureCategories]}
            />
            }
        </section>
        </CardContent>
    </Card>
    </>
  )
}
