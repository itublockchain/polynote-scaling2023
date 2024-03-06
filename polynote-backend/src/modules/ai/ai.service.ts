import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CONFIG } from 'src/config';

@Injectable()
export class AiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: CONFIG.OPENAI_API_KEY, // This is also the default, can be omitted
    });
  }

  public async makeLonger(text: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Make the following content longer:\n ${text}`,
        },
      ],
    });

    return res.choices[0].message;
  }

  public async summarize(text: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize the following content:\n ${text}`,
        },
      ],
    });

    return res.choices[0].message;
  }

  public async fixGrammar(text: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Fix the grammar of the following content:\n ${text}`,
        },
      ],
    });

    return res.choices[0].message;
  }
}
