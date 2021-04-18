import {Controller, Get, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get("test")
  getHello(@Req() request: any): string {
    console.log(request.user);
    return "Hello World";
  }
}
