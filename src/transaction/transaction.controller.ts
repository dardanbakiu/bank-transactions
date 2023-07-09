// transaction.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

interface UserRequest extends Request {
  user: any; // Or replace 'any' with the actual shape of your User object if you wish
}

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  async deposit(
    @Req() req: UserRequest,
    @Body() body: { amount: number },
  ): Promise<void> {
    await this.transactionService.deposit(req.user.userId, body.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('withdrawal')
  @HttpCode(HttpStatus.CREATED)
  async withdrawal(
    @Req() req: UserRequest,
    @Body() body: { amount: number },
  ): Promise<void> {
    await this.transactionService.withdrawal(req.user.userId, body.amount);
  }
}
