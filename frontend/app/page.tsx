import Header from "./components/Header";
import Attention from "./components/Attention";
import FeatureSection from "./components/FeatureCategory";
import Prediction from "./components/Prediction";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="h-30 text-center pt-10 text-amber-400">
        <Header />
      </header>
      <main className="flex flex-col">
        <section className="p-16">
          <Attention />
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
