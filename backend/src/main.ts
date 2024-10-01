import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port=configService.get<number>('PORT')||5000;

 
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,  // Automatically strip non-validated properties
    forbidNonWhitelisted: false,  // Reject requests with non-whitelisted properties
    exceptionFactory: (errors) => {
      
        return new BadRequestException(
            errors.map(err => ({
              property: err.property,
              messages: Object.values(err.constraints),
            })),
        );
    },
}));

 await app.listen(port);

  console.log(`Application running on port ${port}`);
  
}
bootstrap();
