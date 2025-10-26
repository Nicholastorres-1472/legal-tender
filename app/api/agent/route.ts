import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get('text') as string;
    const files = formData.getAll('files') as File[];
    
    let fileContents = '';
    for (const file of files) {
      const content = await file.text();
      fileContents += `\n\nFile: ${file.name}\n${content}`;
    }
    
    const fullContent = `${text || ''}\n${fileContents}`;
    
    // Use Vercel AI SDK with built-in credits
    const { text: aiResponse } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: `Analyze the following content and provide insights:\n\n${fullContent}`,
    });
    
    return NextResponse.json({ result: aiResponse });
  } catch (error) {
    console.error('Error in AI agent:', error);
    return NextResponse.json(
      { error: 'Failed to process with AI agent' },
      { status: 500 }
    );
  }
}
