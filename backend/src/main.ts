import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port=configService.get<number>('PORT')||5000;

    // Enable CORS for all origins
    app.enableCors({
      origin: '*', // Allow all origins. You can specify an array of origins if needed.
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
      credentials: false, // If you need to allow cookies, set this to true
    });
  

 
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
