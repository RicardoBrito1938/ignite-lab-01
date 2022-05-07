import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { kafkaService } from './kafka.sercice';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [kafkaService],
  exports: [kafkaService],
})
export class MessagingModule {}
