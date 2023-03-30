import { Injectable } from '@nestjs/common';
import { CONFIG } from '../../config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiService {
  openai: any;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  public async makeLonger(text: string) {
    const res = await this.openai.createEdit({
      model: 'text-davinci-003',
      input: text,
      instruction: 'Make the given text longer in one paragraph',
    });

    return res.data.choices[0].text;
  }

  public async summarize(text: string) {
    const res = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${text}\n\nSummarize this text`,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });

    return res.data.choices[0].text;
  }

  public async fixGrammer(text: string) {
    const res = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Correct this to standard English:${text}`,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    return res.data.choices[0].text;
  }
}
