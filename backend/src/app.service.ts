import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {


  constructor( private configService:ConfigService){}



  getDatabaseUrl():string{
    return this.configService.get<string>('DATABASE_URL');

  }

  getPort():number{
    return this.configService.get<number>('PORT') || 3001;
  }

  getHealth():string{
    return "Backend Succesfully Runs On the Server..12211111"

  }
  

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Returns a simple greeting message.
   *
   * @returns A string containing the greeting message.
   *
   * @example
   **/

}
