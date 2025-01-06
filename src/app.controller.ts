import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log("sum triggered!");
    return (data || []).reduce((a, b) => a + b);
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
    console.log("user_created triggered!", data);
  }

}
