import Header from "./components/Header";
import Attention from "./components/Attention";
import FeatureSection from "./components/FeatureCategory";
import Prediction from "./components/Prediction";
import { SparklesCore } from "@/components/ui/sparkles";
import { MLCards } from "./components/Cards";
import Flex from "./components/Flex";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col text-amber-100">
      <header className="h-30 text-center pt-10 text-amber-400">
        <Header />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full mt-[-22]"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 bg-blue [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </header>
      <main className="flex flex-col">
        <section className="p-16">
          <Attention />
        </section>
        <section>
          <h3 className="text-center">Hover for surprise</h3>
          <MLCards />
        </section>
        <section>
          <Flex />
        </section>
        <section className="p-16 h-screen mt-3 mb-3">
          <FeatureSection />
        </section>
        <section className="h-screen mt-116 p-16">
          <Prediction />
        </section>
      </main>
    </div>
  );
}
