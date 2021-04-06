import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../../server_config';
import { ValidationPipe } from '@nestjs/common';
const { development_port, production_port } = config.server;
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.useGlobalPipes(new ValidationPipe());

    switch (process.env.NODE_ENV) {
        case 'production':
            await app.listen(production_port);
            break;
        default:
            await app.listen(development_port);
            break;
    }
}
bootstrap();
