"use client";
import Link from "next/link";
import Image from "next/image";

export default function About() {
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

      {/* About Content */}
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">About Me</h1>
            <p className="text-xl text-green-100">Meet the creator behind this AI-powered plant health solution</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Photo Section */}
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl overflow-hidden">
                <Image
                  src="/photo.png"
                  alt="Prashant Vaid"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 font-serif">Hello!</h2>
              <div className="text-green-100 space-y-4 leading-relaxed">
                <p>
                  My name is Prashant Vaid and I am currently a student at UC Berkeley studying Data Science. 
                  I have a lot of hobbies including gaming, sports, playing violin, and gardening. I built this 
                  project for my final project for SAAS (Student Association for Applied Statistics).
                </p>
                <p>
                  This plant disease classification system represents 4 months of dedicated work and research. 
                  As a Data Foundations member this semester, I learned about different machine learning and data science topics, 
                  which culminated in this comprehensive AI solution that could genuinely help farmers and gardeners protect their crops and plants.
                </p>
                <p>
                  Through SAAS, I gained hands-on experience with PyTorch, computer vision, and deep learning architectures. 
                  My passion for both technology and gardening inspired me to create something that bridges 
                  the gap between advanced machine learning and practical agricultural applications.
                </p>
              </div>
            </div>
          </div>

          {/* Model Details */}
          <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 font-serif">The Model</h2>
            <div className="text-green-100 space-y-4 leading-relaxed">
              <p>
                The heart of this application is a deep learning model trained on over <strong className="text-white">60,000 plant images</strong> 
                from the <a href="https://data.mendeley.com/datasets/tywbtsjrjv/1/files/b4e3a32f-c0bd-4060-81e9-6144231f2520" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-white transition-colors duration-300">Data Mendeley plant diseases with augmentation dataset</a>. This extensive training data allows the model to recognize 
                a wide variety of plant diseases across different species with remarkable accuracy.
              </p>
              <p>
                Built using PyTorch, the model employs convolutional neural networks (CNNs) specifically designed 
                for image classification tasks. The architecture includes multiple layers of feature extraction, 
                allowing it to identify subtle patterns and symptoms that might be missed by the human eye.
              </p>
              <p>
                The custom PlantCNN architecture features three convolutional blocks with progressive feature extraction:
                32 → 64 → 128 channels, each with batch normalization, ReLU activation, max pooling, and dropout 
                for regularization. The classifier uses adaptive average pooling and fully connected layers (128 → 256 → num_classes) 
                to map extracted features to disease classifications.
              </p>
              <p>
                Through rigorous training and validation processes, the model achieves high precision in disease 
                detection while providing confidence scores that help users understand the reliability of each diagnosis. 
                The integration with OpenCV ensures optimal image preprocessing for the best possible results.
              </p>
            </div>
          </div>

          {/* Model Architecture */}
          <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 font-serif">Model Architecture</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Feature Extraction Layers</h4>
                <div className="space-y-2 text-green-100 text-sm">
                  <p>• <strong>Conv Block 1:</strong> 3→32 channels, 3x3 kernels, BatchNorm, ReLU, MaxPool, 10% Dropout</p>
                  <p>• <strong>Conv Block 2:</strong> 32→64 channels, pattern complexity increases, 20% Dropout</p>
                  <p>• <strong>Conv Block 3:</strong> 64→128 channels, high-level feature detection, 30% Dropout</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Classification Layers</h4>
                <div className="space-y-2 text-green-100 text-sm">
                  <p>• <strong>Adaptive Pooling:</strong> Global pattern compression to 1x1</p>
                  <p>• <strong>FC Layer 1:</strong> 128→256 neurons, feature combination</p>
                  <p>• <strong>Output Layer:</strong> 256→num_classes, disease classification</p>
                  <p>• <strong>Regularization:</strong> 50% dropout prevents overfitting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Achievements */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">High Accuracy</h3>
              <p className="text-green-100 text-sm">Custom CNN trained on 60,000+ images with progressive feature extraction</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Optimized Architecture</h3>
              <p className="text-green-100 text-sm">Efficient 3-block CNN with adaptive pooling and dropout regularization</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-white mb-2">Robust Detection</h3>
              <p className="text-green-100 text-sm">Multi-layer feature extraction captures complex disease patterns</p>
            </div>
          </div>

          {/* Future Plans */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-300/20 rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-serif">What's Next?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              I'm continuously working to improve the model's accuracy and expand its capabilities. 
              Future updates will include more plant species, treatment recommendations, and mobile app support.
            </p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              Try the Classifier →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}