import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AITextDto } from './ai.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post()
  public async makeLonger(@Body() aiTextDto: AITextDto) {
    if (aiTextDto.mode === 'fix-grammar') {
      const data = await this.aiService.fixGrammar(aiTextDto.text);
      return { text: data };
    } else if (aiTextDto.mode === 'make-longer') {
      const data = await this.aiService.makeLonger(aiTextDto.text);
      return { text: data };
    } else if (aiTextDto.mode === 'summerize') {
      const data = await this.aiService.summarize(aiTextDto.text);
      return { text: data };
    } else {
      return { text: '' };
    }
  }
}
