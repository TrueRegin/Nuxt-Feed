import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: './client',
            serveRoot: '/'
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/nuxt-feed'),
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
