import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import CareProgram from '@/components/CareProgram'
import Industries from '@/components/Industries'
import WhyClariva from '@/components/WhyClariva'
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
