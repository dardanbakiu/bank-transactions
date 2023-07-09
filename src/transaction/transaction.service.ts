import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) { }

  async deposit(userId: number, amount: number): Promise<void> {
    await this.validateTransactionData(userId, amount);

    const transaction: Partial<Transaction> = {
      userId,
      amount,
      isBonus: false,
    };

    await this.transactionRepository.save(transaction);

    if (amount > 100) {
      const bonusAmount = amount * 0.05;

      const bonusTransaction: Partial<Transaction> = {
        userId,
        amount: bonusAmount,
        isBonus: true,
      };

      await this.transactionRepository.save(bonusTransaction);
    }
  }

  async withdrawal(userId: number, amount: number): Promise<void> {
    await this.validateTransactionData(userId, amount);

    const transaction: Partial<Transaction> = {
      userId,
      amount: -amount,
    };

    await this.transactionRepository.save(transaction);
  }

  private async validateTransactionData(
    userId: number,
    amount: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (amount <= 0) {
      throw new BadRequestException('Invalid transaction amount');
    }
  }
}
