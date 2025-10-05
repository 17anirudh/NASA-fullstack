import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Attention() {
    return (
        <>
            <Card style={{ backgroundColor: "#000000", color: "#FFFFFF", border: "none"}}>
                <CardHeader>
                    <CardTitle style={{textDecoration: "underline"}} className="text-2xl">Brief Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl">
                        This project presents a comprehensive full-stack machine learning web application trained on NASA’s Kepler Mission Archive. It is designed to explore, analyze, and interpret the characteristics of Kepler Objects of Interest (KOIs) — celestial bodies identified as potential exoplanet candidates.

By leveraging a combination of statistical modeling and predictive analytics, this platform provides a detailed understanding of the relationships between various astronomical and physical parameters. Through interactive visualizations and data-driven insights, users can investigate how stellar attributes influence planetary classification, orbital patterns, and potential habitability.

The primary objective of this tool is to bridge the gap between raw astronomical data and interpretable machine learning outcomes — enabling researchers, students, and enthusiasts to uncover meaningful trends in the ever-expanding field of exoplanet discovery.
                    </p>
                </CardContent>
            </Card>
        </>
    )
}