import { getRepos, Repo } from "@/lib/github";
import HeroSection from "./HeroSection";
import CodeSection from "./CodeSection";
import RendersSection from "./RendersSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const repos: Repo[] = await getRepos();

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <HeroSection />
      <CodeSection repos={repos} />
      <RendersSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
