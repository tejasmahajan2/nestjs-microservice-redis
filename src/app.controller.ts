import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'notifications' })
  getNotifications(@Payload() data: number[], @Ctx() context: RedisContext): number {
    console.log('Received data:', data);
    return 42; // Respond with a number or appropriate response
  }


  @MessagePattern({ cmd: 'add' })
  add(data: number[]): Observable<number> {
    return from([1, 2, 3]);
  }


  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
    console.log("user_created triggered!", data);
  }

}
