import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Attention() {
    return (
        <>
            <Card style={{ backgroundColor: "#000000", color: "#FFFFFF", border: "none"}}>
                <CardHeader>
                    <CardTitle style={{textDecoration: "underline"}}>Brief Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        This is a fullstack ML web application trained on NASA's Kepler Archive data. 
                    </p>
                    <p>
                        Explore and analyze features of Kepler Objects of Interest (KOI) - potential exoplanet candidates.
                        This tool helps you understand the statistical distributions and relationships between various
                        astronomical and physical properties of these celestial objects.
                    </p>
                </CardContent>
            </Card>
        </>
    )
}