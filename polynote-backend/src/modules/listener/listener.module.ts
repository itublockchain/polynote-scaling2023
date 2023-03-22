import { Module } from '@nestjs/common';
import { ListenerController } from 'src/modules/listener/listener.controller';

@Module({
  controllers: [ListenerController],
  providers: [],
  imports: [],
})
export class ListenerModule {}
