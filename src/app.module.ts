import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { dataSourceOptions } from 'db/data-source';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    TransactionModule,
  ],
  controllers: [AppController, UserController, TransactionController],
  providers: [AppService],
})
export class AppModule { }
