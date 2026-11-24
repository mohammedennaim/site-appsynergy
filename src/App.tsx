import { FC, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Portfolio from './components/Portfolio';
import ScrollProgress from './components/ScrollProgress';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import NoiseBackground from './components/ui/NoiseBackground';
import LoadingScreen from './components/ui/LoadingScreen';
import SpotlightCursor from './components/ui/SpotlightCursor';
import BackToTop from './components/ui/BackToTop';
import AppBackground from './components/ui/AppBackground';
import { lockScroll, useSmoothScroll } from './hooks/useSmoothScroll';

const App: FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    if (!showLoader) return;
    lockScroll(true);
    return () => {
      /* unlock happens in onExitComplete so the curtain can finish */
    };
  }, [showLoader]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bw-bg-primary text-bw-text-primary">
        <AppBackground />
        <NoiseBackground />
        <SpotlightCursor />

        {/* Mounted under the curtain — hero intro starts as columns lift */}
        {introReady && <ScrollProgress />}
        <div
          className={`relative z-[1] flex ${showLoader ? 'pointer-events-none select-none' : ''}`}
          aria-hidden={showLoader}
        >
          <Sidebar />
          <MobileNav />
          <main className="flex-1 min-w-0 md:pl-20">
            <Portfolio introReady={introReady} />
          </main>
        </div>
        {introReady && <BackToTop />}

        <AnimatePresence
          onExitComplete={() => {
            window.scrollTo(0, 0);
            lockScroll(false);
          }}
        >
          {showLoader && (
            <LoadingScreen
              key="loading"
              onLoadingComplete={() => {
                setIntroReady(true);
                setShowLoader(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default App;
