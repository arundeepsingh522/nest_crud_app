import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor
  (
    private readonly appService: AppService,
    private readonly configService:ConfigService, //Injecting ConfigService
  

  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/health')
  getHealth():string{
    console.log('Health check');
    
    return this.appService.getHealth();

  }

  
  //New endpoint for database URL
  @Get('dbUrl')
  getDatabaseUrl():string{
    //Using ConfigService to get database URL from environment variables.
    
    return this.configService.get<string>('DATABASE_URL');
  }

  //New endpoint for port

  @Get('port')
  getPort():number{
    return this.configService.get<number>('PORT') || 3001;
  }



}
