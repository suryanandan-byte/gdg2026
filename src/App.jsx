import { LayoutGroup, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { MarkProvider } from './components/MarkContext';
import useActiveSection from './components/useActiveSection';
import { sections } from './data/navigation';
import Home from './sections/Home';
import About from './sections/About';
import Events from './sections/Events';
import Team from './sections/Team';
import Contact from './sections/Contact';

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const active = useActiveSection(sectionIds);

  return (
    <MotionConfig reducedMotion="user">
      <MarkProvider>
        <LayoutGroup>
          <div className="grain flex min-h-dvh flex-col">
            <Navbar active={active} />
            <main className="flex-1">
              <Home />
              <About />
              <Events />
              <Team />
              <Contact />
            </main>
            <Footer />
          </div>
        </LayoutGroup>
      </MarkProvider>
    </MotionConfig>
  );
}
