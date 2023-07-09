import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  async deposit(
    @Body() body: { userId: number; amount: number },
  ): Promise<void> {
    await this.transactionService.deposit(body.userId, body.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('withdrawal')
  @HttpCode(HttpStatus.CREATED)
  async withdrawal(
    @Body() body: { userId: number; amount: number },
  ): Promise<void> {
    await this.transactionService.withdrawal(body.userId, body.amount);
  }
}
