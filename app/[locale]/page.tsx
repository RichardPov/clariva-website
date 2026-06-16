import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Positions from '@/components/Positions'
import CareProgram from '@/components/CareProgram'
import Industries from '@/components/Industries'
import WhyClariva from '@/components/WhyClariva'
import RealImpact from '@/components/RealImpact'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Positions />
        <CareProgram />
        <Industries />
        <WhyClariva />
        <RealImpact />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
