"use client";
import Link from "next/link";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-md border-b border-green-300/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-serif text-xl font-bold">
            Plant Disease Classifier
          </Link>
          <Link 
            href="/"
            className="text-green-100 hover:text-white transition-colors duration-300 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-24 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Demo Video</h1>
            <p className="text-xl text-green-100">Watch how the Plant Disease Classifier works</p>
          </div>

          {/* Video Container */}
          <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 mb-12">
            <div className="aspect-video bg-green-900/30 rounded-xl overflow-hidden">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/demo-thumbnail.jpg"
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Video Description */}
          <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 font-serif">What You'll See</h2>
            <div className="space-y-4 text-green-100">
              <p>• Complete walkthrough of the plant disease classification system</p>
              <p>• Step-by-step demonstration of image upload and analysis</p>
              <p>• Real-time classification results with confidence scores</p>
              <p>• AI-powered treatment recommendations in action</p>
              <p>• Overview of the dashboard and garden features</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">Ready to Try It Yourself?</h3>
              <p className="text-green-100 mb-6">Start analyzing your plant images with our AI-powered system</p>
              <Link 
                href="/dashboard"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                Start Analyzing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}