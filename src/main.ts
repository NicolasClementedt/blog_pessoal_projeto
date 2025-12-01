import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ajustando horário padrão para ficar no fuso de Brasilia
  process.env.TZ = '-03:00'
  
  //aplicando recurso de validação
  app.useGlobalPipes(new ValidationPipe());

  //habilitando a cors pata solicitações de servidores fora da máquina
  app.enableCors();

// indicando qual porta será usada e declarando variável de ambiente para proteção
  await app.listen(process.env.PORT ?? 4000);

}
bootstrap();
