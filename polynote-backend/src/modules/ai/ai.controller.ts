import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AITextDto } from './ai.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('/make-longer')
  public async makeLonger(@Body() aiTextDto: AITextDto) {
    const data = await this.aiService.makeLonger(aiTextDto.text);
    return { text: data };
  }

  @Post('/summarize')
  public async summarize(@Body() aiTextDto: AITextDto) {
    const data = await this.aiService.summarize(aiTextDto.text);
    return { text: data };
  }

  @Post('/fix-grammar')
  public async fixGrammar(@Body() aiTextDto: AITextDto) {
    const data = await this.aiService.fixGrammar(aiTextDto.text);
    return { text: data };
  }
}
