"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Classification {
  id: string;
  image: string;
  prediction: string;
  confidence: number;
  date: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

function formatMessage(content: string) {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/- (.*?)\n/g, '• $1<br>')
    .replace(/\n/g, '<br>')
    .replace(/#{1,6} (.*?)\n/g, '<strong>$1</strong><br>');
}

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedClassification, setSelectedClassification] = useState<Classification | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [classifications, setClassifications] = useState<Classification[]>([
    {
      id: "1",
      image: "/api/placeholder/150/150",
      prediction: "Tomato Late Blight",
      confidence: 94.2,
      date: "2024-01-15"
    },
    {
      id: "2", 
      image: "/api/placeholder/150/150",
      prediction: "Apple Scab",
      confidence: 87.6,
      date: "2024-01-14"
    }
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProgress(0);
      setIsAnalyzing(false);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress up to 90%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 8;
      });
    }, 150);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const result = await response.json();
      
      // Complete progress after API response
      clearInterval(progressInterval);
      setProgress(100);
      
      // Wait a moment to show 100%
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result.error) {
        alert('Classification failed: ' + result.error);
      } else {
        // Add new classification to the list
        const newClassification = {
          id: Date.now().toString(),
          image: URL.createObjectURL(selectedImage),
          prediction: result.prediction,
          confidence: Math.round(result.confidence),
          date: new Date().toLocaleDateString()
        };
        
        setClassifications(prev => [newClassification, ...prev]);
        
        // Clear the upload
        setSelectedImage(null);
        setImagePreview("");
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Classification error:', error);
      alert('Classification failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const handleDeleteClassification = (id: string) => {
    setClassifications(prev => prev.filter(item => item.id !== id));
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Plant Disease Dashboard</h1>
            <p className="text-xl text-green-100">Upload and analyze your plant images</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-8">
              {/* Directions */}
              <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4 font-serif">📋 Directions</h2>
                <div className="text-green-100 space-y-3">
                  <p>• <strong>Use leaf images:</strong> Focus on individual leaves showing clear symptoms</p>
                  <p>• <strong>Gray background preferred:</strong> Plain backgrounds help the model focus on the leaf</p>
                  <p>• <strong>Good lighting:</strong> Ensure the leaf is well-lit and symptoms are visible</p>
                  <p>• <strong>Clear focus:</strong> Avoid blurry images for best results</p>
                </div>
              </div>

              {/* Sample Images Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowSamples(true)}
                  className="bg-green-600/20 hover:bg-green-600/30 text-green-300 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 border border-green-400/30"
                >
                  🖼️ See Sample Images
                </button>
              </div>

              {/* Upload Area */}
              <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 font-serif">Upload Image</h2>
                
                <div className="border-2 border-dashed border-green-300/30 rounded-xl p-8 text-center hover:border-green-300/50 transition-colors relative">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-green-100">Image ready for analysis</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">🌿</div>
                      <p className="text-green-100">Click to upload or drag and drop</p>
                      <p className="text-green-200/70 text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  
                  {!imagePreview && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  )}
                </div>

                {imagePreview && (
                  <div className="mt-6 space-y-4">
                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="w-full bg-green-900/30 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300 ease-out" 
                            style={{width: `${progress}%`}}
                          ></div>
                        </div>
                        <p className="text-green-100 text-center text-sm">
                          Analyzing plant disease... {Math.round(progress)}%
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAnalyze();
                        }}
                        disabled={isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Plant 🔍"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedImage(null);
                          setImagePreview("");
                        }}
                        className="px-6 bg-red-600/20 text-red-300 py-3 rounded-full font-medium hover:bg-red-600/30 transition-colors border border-red-400/30"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Past Classifications */}
            <div className="bg-white/10 backdrop-blur-sm border border-green-300/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-serif">The Garden</h2>
              
              {classifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-green-100">No classifications yet</p>
                  <p className="text-green-200/70 text-sm">Upload your first image to get started</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {classifications.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-300/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🌿</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.prediction}</h3>
                          <p className="text-green-100 text-sm">Confidence: {item.confidence}%</p>
                          <p className="text-green-200/70 text-xs">{item.date}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.confidence >= 90 ? 'bg-green-500/20 text-green-300' :
                            item.confidence >= 60 ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {item.confidence >= 90 ? 'High Confidence' : item.confidence >= 60 ? 'Medium Confidence' : 'Low Confidence'}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedClassification(item)}
                              className="text-xs bg-green-600/20 text-green-300 px-3 py-1 rounded-full hover:bg-green-600/30 transition-colors"
                            >
                              Treatment 💬
                            </button>
                            <button
                              onClick={() => handleDeleteClassification(item.id)}
                              className="text-xs bg-red-600/20 text-red-300 px-3 py-1 rounded-full hover:bg-red-600/30 transition-colors"
                            >
                              Delete 🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Treatment Chat Modal */}
          {selectedClassification && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 border border-green-300/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-green-300/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white font-serif">Treatment Recommendations</h3>
                      <p className="text-green-100 text-sm">{selectedClassification.prediction} - {selectedClassification.confidence}% confidence</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedClassification(null);
                        setChatMessages([]);
                        setUserInput("");
                      }}
                      className="text-green-100 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🌱</div>
                      <p className="text-green-100">Ask me about treatment options for {selectedClassification.prediction}</p>
                      <p className="text-green-200/70 text-sm mt-2">I can help with organic treatments, prevention methods, and care tips!</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-green-600/20 text-green-100 border border-green-500/30' 
                            : 'bg-white/10 text-green-100 border border-green-300/20'
                        }`}>
                          {message.type === 'user' ? (
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          ) : (
                            <div 
                              className="prose prose-invert prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                            />
                          )}
                          <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 border border-green-300/20 rounded-2xl p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-green-300/20">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about treatment options..."
                      className="flex-1 bg-white/10 border border-green-300/20 rounded-full px-4 py-3 text-green-100 placeholder-green-200/50 focus:outline-none focus:border-green-400/50"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sample Images Modal */}
          {showSamples && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 border border-green-300/20 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-green-300/20">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white font-serif">Sample Images</h3>
                    <button
                      onClick={() => setShowSamples(false)}
                      className="text-green-100 hover:text-white transition-colors text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-green-100 mt-2">Examples of good quality images for accurate disease detection</p>
                </div>

                {/* Sample Images Grid */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="w-full h-60 bg-green-600/20 rounded-lg overflow-hidden mb-3">
                        <Image
                          src="/sample1.jpeg"
                          alt="Sample plant image 1"
                          width={300}
                          height={240}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Good Example 1</h4>
                      <p className="text-green-100 text-sm">Single leaf with clear disease symptoms and good lighting</p>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="w-full h-60 bg-green-600/20 rounded-lg overflow-hidden mb-3">
                        <Image
                          src="/sample2.jpeg"
                          alt="Sample plant image 2"
                          width={300}
                          height={240}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Good Example 2</h4>
                      <p className="text-green-100 text-sm">Clear focus with plain background for optimal analysis</p>
                    </div>

                  </div>
                  
                  <div className="mt-6 p-4 bg-green-600/10 rounded-xl border border-green-400/20">
                    <p className="text-green-100 text-sm">
                      <strong>Pro Tip:</strong> For best results, take photos of single leaves against a plain background 
                      with good natural lighting. Ensure the entire leaf fills most of the frame.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  async function handleSendMessage() {
    if (!userInput.trim() || !selectedClassification) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Call Ollama API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          disease: selectedClassification.prediction,
          confidence: selectedClassification.confidence
        })
      });

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response || "I'm sorry, I couldn't generate a response right now. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm having trouble connecting to the treatment recommendation service. Please try again later.",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }
}