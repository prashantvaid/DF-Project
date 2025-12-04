import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, disease, confidence } = await request.json();

    // Use faster Ollama model with shorter timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2:3b', // Change to llama3.1:8b if you have more resources
        prompt: `You are an agricultural specialist and plant pathologist with expertise in plant disease treatment. 

DISEASE DIAGNOSIS: ${disease}
CONFIDENCE LEVEL: ${confidence}%
USER QUESTION: ${message}

Provide specific, actionable treatment recommendations. Include:
- Immediate treatment steps
- Recommended products/methods
- Prevention strategies
- Expected timeline

Be direct and practical. This is for agricultural/gardening purposes, not human health.`,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.8,
          num_predict: 300
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!ollamaResponse.ok) {
      throw new Error('Ollama API request failed');
    }

    const ollamaData = await ollamaResponse.json();
    
    return NextResponse.json({ 
      response: ollamaData.response 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json({ 
      response: "I'm currently unable to generate a response. Please ensure Ollama is running with 'ollama serve' and try again."
    });
  }
}

