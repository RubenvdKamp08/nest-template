import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger("app.controller");

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  throwError(): string {
    const getRandom = <T>(...values: T[]): T =>
    values[Math.floor(Math.random() * values.length)];
    
    const status = getRandom(
      HttpStatus.BAD_REQUEST,
      HttpStatus.NOT_FOUND,
      HttpStatus.CONFLICT,
      HttpStatus.FORBIDDEN,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.BAD_GATEWAY,
      HttpStatus.GATEWAY_TIMEOUT,
    );

    this.logger.warn("Something went wrong when requesting /error");


    throw new HttpException('nestjs-exception', status);
  }
}
