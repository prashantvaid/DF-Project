import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Save uploaded image temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempImagePath = path.join(process.cwd(), 'temp_image.jpg');
    await writeFile(tempImagePath, buffer);

    // Path to model
    const modelPath = path.join(process.cwd(), 'public', 'plant_disease_model.pth');

    // Run Python classification using spawn for better control
    const { spawn } = require('child_process');
    
    const result = await new Promise((resolve, reject) => {
      const python = spawn('python3', ['classify_image.py', tempImagePath, modelPath], {
        cwd: process.cwd()
      });
      
      let output = '';
      let error = '';
      
      python.stdout.on('data', (data: Buffer) => {
        output += data.toString();
      });
      
      python.stderr.on('data', (data: Buffer) => {
        error += data.toString();
      });
      
      python.on('close', (code: number) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${error}`));
        } else {
          try {
            resolve(JSON.parse(output.trim()));
          } catch (e) {
            reject(new Error(`Failed to parse output: ${output}`));
          }
        }
      });
      
      // 30 second timeout
      setTimeout(() => {
        python.kill();
        reject(new Error('Classification timeout'));
      }, 30000);
    });
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json(
      { error: `Classification failed: ${error}` }, 
      { status: 500 }
    );
  }
}