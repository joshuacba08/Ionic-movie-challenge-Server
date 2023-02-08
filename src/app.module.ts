import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGODB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    AuthModule,
    MovieModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
