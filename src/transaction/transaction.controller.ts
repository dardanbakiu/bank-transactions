import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  async deposit(
    @Body() body: { userId: number; amount: number },
  ): Promise<void> {
    await this.transactionService.deposit(body.userId, body.amount);
  }

  @Post('withdrawal')
  @HttpCode(HttpStatus.CREATED)
  async withdrawal(
    @Body() body: { userId: number; amount: number },
  ): Promise<void> {
    await this.transactionService.withdrawal(body.userId, body.amount);
  }
}
