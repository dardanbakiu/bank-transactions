import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TransactionModule } from '../transaction/transaction.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TransactionModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY ||
        '8d353c0f41b67568fc6c2128d2ad55dbfb7ee23943f1fb8ba8b6dc8c5e0da8a4',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
