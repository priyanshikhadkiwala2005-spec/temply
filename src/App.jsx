import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Intro from './components/sections/Intro'
import Features from './components/sections/Features'
import Showcase from './components/sections/Showcase'
import HowItWorks from './components/sections/HowItWorks'
import Spotlight from './components/sections/Spotlight'
import Why from './components/sections/Why'
import Progress from './components/sections/Progress'
import Packages from './components/sections/Packages'
import FestivalStage from './components/ui/FestivalStage'
import FinalCTA from './components/sections/FinalCTA'
import DeckCard from './mobile/DeckCard'
import MobileFestive from './mobile/MobileFestive'

export default function App() {
  const [tab, setTab] = useState('create')

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-white px-4 py-2 font-semibold text-plum focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {/* Mobile only: phuljhadi progress + festive scroll engine */}
      <MobileFestive />
      <Header />
      <main id="main">
        {/* Har DeckCard mobile par ek stacked "greeting card" hai; desktop par plain div */}
        <DeckCard index={0}>
          <Hero />
          <FestivalStage />
        </DeckCard>
        <DeckCard index={1} tone="marigold">
          <Intro />
        </DeckCard>
        <DeckCard index={2} tone="lavender">
          <Features onPreview={setTab} />
        </DeckCard>
        <DeckCard index={3} tone="marigold">
          <Showcase active={tab} setActive={setTab} />
        </DeckCard>
        <DeckCard index={4} tone="rose">
          <HowItWorks />
        </DeckCard>
        <DeckCard index={5} tone="lavender">
          <Spotlight />
        </DeckCard>
        <DeckCard index={6} tone="marigold">
          <Why />
        </DeckCard>
        <DeckCard index={7} tone="rose">
          <Progress />
        </DeckCard>
        <DeckCard index={8} tone="lavender">
          <Packages />
        </DeckCard>
        <DeckCard index={9} tone="rose">
          <FinalCTA />
        </DeckCard>
      </main>
      <DeckCard index={10} mode="flow" tone="marigold">
        <Footer />
      </DeckCard>
    </MotionConfig>
  )
}
