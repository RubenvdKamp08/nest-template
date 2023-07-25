import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { APP_FILTER } from '@nestjs/core';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './exception.filter';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [AppController],
  providers: [AppService,
    makeCounterProvider({
      name: 'http_errors',
      help: 'http_errors', // you can do better, I know :D
      labelNames: ['status'],
    }),
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    }
  ],
})
export class AppModule {}
