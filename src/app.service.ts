import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "API IS RUNNING! <style>  html { background-color: gray; color: white; } </style>";
  }
}
