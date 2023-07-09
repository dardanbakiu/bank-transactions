import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({
    description: 'The amount of the transaction',
    minimum: 1,
    type: Number,
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
