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
    if (amount <= 0) {
      throw new BadRequestException('Invalid withdrawal amount');
    }

    const balance = await this.getUserBalance(userId);

    if (amount > balance) {
      throw new BadRequestException('Insufficient balance');
    }

    const transaction: Partial<Transaction> = {
      userId,
      amount: -amount,
      isBonus: false,
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

  private async getUserBalance(userId: number): Promise<number> {
    const depositTransactions = await this.transactionRepository.find({
      where: {
        userId,
        isBonus: false,
      },
    });

    const totalDeposits = depositTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalWithdrawals = depositTransactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((total, transaction) => total - transaction.amount, 0);

    return totalDeposits - totalWithdrawals;
  }

  async getUserBonus(userId: number): Promise<number> {
    const bonusTransactions = await this.transactionRepository.find({
      where: {
        userId,
        isBonus: true,
      }
    });

    const totalBonus = bonusTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    return totalBonus;
  }
}
