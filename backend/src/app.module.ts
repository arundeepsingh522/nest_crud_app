import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

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
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
