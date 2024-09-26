import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRootAsync(
      (
        {
          imports:[ConfigModule],
          useFactory:async(configService:ConfigService)=>{
            return {
              uri:configService.get<string>('DATABASE_URL'),
            };
          },
          inject:[ConfigService]
        }
      )
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
