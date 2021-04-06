import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: './client',
            serveRoot: '/'
        }),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
