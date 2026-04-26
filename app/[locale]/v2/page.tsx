import Navbar from '@/components/Navbar'
import HeroV2 from '@/components/v2/HeroV2'
import About from '@/components/About'
import ServicesV2 from '@/components/v2/ServicesV2'
import BinaryArch from '@/components/v2/BinaryArch'
import HowWeWork from '@/components/HowWeWork'
import CareProgram from '@/components/CareProgram'
import Industries from '@/components/Industries'
import WhyClariva from '@/components/WhyClariva'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomeV2() {
  return (
    <>
      <Navbar />
      <main>
        <HeroV2 />
        <About />
        <BinaryArch variant="up" />
        <ServicesV2 />
        <BinaryArch variant="down" />
        <HowWeWork />
        <CareProgram />
        <Industries />
        <WhyClariva />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
