import React from 'react';
import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Clients from './components/Clients';
import Services from './components/Services';
import Solutions from './components/Solutions';
import Achievements from './components/Achievements';
import CaseStudies from './components/CaseStudies';
import Team from './components/Team';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Careers from './components/Careers';
import Footer from './components/Footer';
import FloatingYouTubeButton from './components/FloatingYouTubeButton';
import CareersPage from './pages/CareersPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  const navigateToCareers = () => {
    setCurrentPage('careers');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };
  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Screen - Shows first */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main Content - Shows after loading */}
      {!isLoading && (
        <div className={`main-content ${showContent ? 'content-visible' : 'content-hidden'}`}>
          <Header currentPage={currentPage} onNavigateHome={navigateToHome} />
          
          {currentPage === 'home' ? (
            <main>
              <Hero />
              <About />
              <Clients />
              <Services />
              <Solutions />
              <Achievements />
              <CaseStudies />
              <Team />
              <Blog />
              <Careers onNavigateToCareers={navigateToCareers} />
              <Contact />
            </main>
          ) : (
            <CareersPage onNavigateHome={navigateToHome} />
          )}
          
          <Footer />
        </div>
      )}
      
      {/* Floating YouTube Button - Always visible */}
      {!isLoading && <FloatingYouTubeButton />}
    </div>
  );
}

export default App;