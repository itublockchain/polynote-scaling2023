import { Body, Controller, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';
import { AITextDto } from './ai.dto';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('/make-longer/:text')
  public async makeLonger(@Param() param: AITextDto) {
    const data = await this.aiService.makeLonger(param.text);
    console.log(data);
    return { text: data };
  }

  @Get('/summarize/:text')
  public async summarize(@Param() param: AITextDto) {
    const data = await this.aiService.summarize(param.text);
    console.log('gelen body: ', await param.text);
    return { text: data };
  }

  @Get('/fix-grammer/:text')
  public async fixGrammer(@Param() param: AITextDto) {
    const data = await this.aiService.fixGrammer(param.text);
    return { text: data };
  }
}
