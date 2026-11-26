import { FC, Suspense, lazy } from 'react';

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import StackSection from './ui/StackSection';

const AnatomySection = lazy(() => import('./sections/AnatomySection'));
const EducationSection = lazy(() => import('./sections/EducationSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));

interface PortfolioProps {
  introReady?: boolean;
}

const Portfolio: FC<PortfolioProps> = ({ introReady = true }) => (
  <div className="text-bw-text-primary font-sans">
    <StackSection id="accueil" first>
      <HeroSection introReady={introReady} />
    </StackSection>
    <StackSection id="apropos" dwellClassName="h-[55vh] lg:h-[60vh]">
      <AboutSection />
    </StackSection>
    <StackSection id="projets" dwellClassName="h-[160vh] lg:h-[120vh]">
      <ProjectsSection />
    </StackSection>
    <Suspense fallback={null}>
      <StackSection id="anatomie" dwellClassName="h-[260vh] lg:h-[340vh]">
        <AnatomySection app="qarib" />
      </StackSection>
      <StackSection id="anatomie-arova" dwellClassName="h-[300vh] lg:h-[400vh]">
        <AnatomySection app="arova" />
      </StackSection>
      <StackSection id="vision" dwellClassName="h-[120vh] lg:h-[150vh]">
        <EducationSection />
      </StackSection>
      <StackSection id="contact" last dwellClassName="h-[60vh]">
        <ContactSection />
      </StackSection>
    </Suspense>
  </div>
);

export default Portfolio;
