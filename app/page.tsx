import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { SelectedWork } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Stack />
      <Services />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
