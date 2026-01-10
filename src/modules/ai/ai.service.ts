import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    this.client = new OpenAI({
      apiKey,
    });
  }

  async runPrompt(prompt: string) {
    try {
      const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

      const response = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a strict JSON generator. Return ONLY valid JSON. No markdown, no text.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
      });

      const text = response.choices[0]?.message?.content;
      if (!text) {
        throw new Error('Empty response from OpenAI');
      }

      return JSON.parse(text);
    } catch (err: any) {
      throw new InternalServerErrorException(
        'AI generation failed',
        err?.message,
      );
    }
  }
}
