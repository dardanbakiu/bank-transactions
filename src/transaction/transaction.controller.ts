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
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { TransactionDto } from './transaction.dto';

interface UserRequest extends Request {
  user: any;
}

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: TransactionDto })
  async deposit(
    @Req() req: UserRequest,
    @Body() body: TransactionDto,
  ): Promise<void> {
    await this.transactionService.deposit(req.user.userId, body.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('withdrawal')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: TransactionDto })
  async withdrawal(
    @Req() req: UserRequest,
    @Body() body: TransactionDto,
  ): Promise<void> {
    await this.transactionService.withdrawal(req.user.userId, body.amount);
  }
}
