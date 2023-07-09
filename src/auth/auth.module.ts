import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    UserModule,
    TransactionModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // replace with your actual secret key
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule { }
