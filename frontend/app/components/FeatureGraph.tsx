"use client"
import FeatureInfo from "@/app/data/FeaturesInfo.json" 
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"


const chartConfig = {
  stats: {
    label: "stats",
  },
} satisfies ChartConfig

interface FeatureGraphProps {
    id: string
}

export default function FeatureGraph({id}: FeatureGraphProps) {

  const feature = FeatureInfo[id as keyof typeof FeatureInfo];
    const chartData = [
        { key: "mean", value: feature.mean },
        { key: "std", value: feature.std },
        { key: "min", value: feature.min },
        { key: "max", value: feature.max },
    ];
  return (
    <Card className="bg-neutral-800 text-neutral-50 mt-10">
      <CardHeader>
        <CardTitle>Feature statistics</CardTitle>
        <CardDescription>Bar graph of feature's statistical data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{height: 580}}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="value">
              <LabelList position="top" dataKey="value" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.key}
                  fill={item.value > 0 ? "var(--chart-1)" : "var(--chart-2)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <h2>Description: {feature.description}</h2>
      </CardContent>
    </Card>
  )
}
