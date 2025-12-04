"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const techStack = [
  { name: "PyTorch", description: "Industry-leading deep learning framework for neural network training and inference with GPU acceleration", icon: "🔥" },
  { name: "Data Mendeley Dataset", description: "Plant diseases with augmentation dataset containing thousands of labeled images for robust model training", icon: "📊" },
  { name: "OpenCV", description: "Advanced computer vision library for image preprocessing, feature extraction, and real-time analysis", icon: "👁️" },
  { name: "LLM Integration", description: "Large language model integration for intelligent disease insights and personalized treatment recommendations", icon: "🤖" },
  { name: "Next.js", description: "Production-ready React framework with server-side rendering and optimized performance for web applications", icon: "⚡" },
  { name: "TailwindCSS", description: "Utility-first CSS framework enabling rapid UI development with consistent design systems", icon: "🎨" }
];

function ScrollingTechStack() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setScrollPosition(prev => (prev + 1) % (techStack.length * 400));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div 
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="flex gap-6 transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateX(-${scrollPosition}px)`,
          width: `${techStack.length * 320 * 2}px`
        }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <div key={index} className="flex-shrink-0 w-96 bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-6 hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {tech.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{tech.name}</h3>
            <p className="text-green-100 text-sm leading-relaxed">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-green-300/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('what-it-does')}
              className="text-green-100 hover:text-white transition-colors duration-300 font-medium"
            >
              Learn More
            </button>
            <Link 
              href="/demo"
              className="text-green-100 hover:text-white transition-colors duration-300 font-medium"
            >
              See Demo
            </Link>
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
            <Link 
              href="/about"
              className="text-green-100 hover:text-white transition-colors duration-300 font-medium"
            >
              About Us
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero */}
      <section className="px-6 min-h-screen flex items-center justify-center text-center">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30 mb-8">
            AI-Powered Plant Health
          </span>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 font-serif">
            Diagnose Plant
            <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent"> Diseases</span>
            <br />Instantly
          </h1>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Advanced ML model that identifies plant diseases with high accuracy, providing instant diagnosis and confidence scores.
          </p>
          <Link 
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            Try It Now →
          </Link>
        </div>
      </section>

      {/* What It Does */}
      <section id="what-it-does" className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">What It Does</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-16">
            AI system combining computer vision and deep learning for accurate plant disease classification.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Disease Detection</h3>
              <p className="text-green-100">Identifies plant diseases from leaf images with high precision using neural networks.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Confidence Scoring</h3>
              <p className="text-green-100">Provides probability scores for each diagnosis with confidence assessment.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Smart Recommendations</h3>
              <p className="text-green-100">AI-powered treatment suggestions tailored to identified diseases.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Image Storage</h3>
              <p className="text-green-100">Store and manage your submitted plant images for future reference and tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Tech Stack</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-16">
            Built with industry-leading technologies for maximum performance and accuracy.
          </p>
          <ScrollingTechStack />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">How It Works</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-16">
            Simple, fast, and accurate plant disease diagnosis in three steps.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-6xl font-bold text-green-400/40 mb-4">01</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Upload Image</h3>
              <p className="text-green-100">Upload a photo of your plant showing symptoms or concerns.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-6xl font-bold text-green-400/40 mb-4">02</div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI Analysis</h3>
              <p className="text-green-100">ML model analyzes using computer vision and deep learning.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-6xl font-bold text-green-400/40 mb-4">03</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Get Results</h3>
              <p className="text-green-100">Instant classification with confidence scores and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-300/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join farmers and gardeners who trust our AI to keep their plants healthy.
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Diagnosing →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-green-300/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Project Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-serif">Plant Disease Classifier</h3>
              <p className="text-green-100 text-sm leading-relaxed mb-4">
                AI-powered plant health diagnosis using advanced machine learning and computer vision.
              </p>
              <a 
                href="https://data.mendeley.com/datasets/tywbtsjrjv/1/files/b4e3a32f-c0bd-4060-81e9-6144231f2520"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300 hover:text-white text-sm transition-colors duration-300"
              >
                View Dataset →
              </a>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-serif">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/dashboard" className="block text-green-100 hover:text-white text-sm transition-colors duration-300">
                  Dashboard
                </Link>
                <Link href="/about" className="block text-green-100 hover:text-white text-sm transition-colors duration-300">
                  About
                </Link>
                <button 
                  onClick={() => scrollToSection('what-it-does')}
                  className="block text-green-100 hover:text-white text-sm transition-colors duration-300 text-left"
                >
                  How It Works
                </button>
              </div>
            </div>
            
            {/* Connect */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-serif">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/prashantvaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/prashant-vaid-51113a248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-green-300/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200/70 text-sm">
              © 2024 Plant Disease Classifier. Built by Prashant Vaid.
            </p>
            <p className="text-green-200/70 text-sm mt-4 md:mt-0">
              Powered by AI for healthier plants.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}