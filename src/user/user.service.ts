import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainTextPassword, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && (await this.comparePasswords(password, user.password))) {
      const { password, ...result } = user; // Exclude password from the response
      return result;
    }
    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(user: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(user.password, 10); // Hash the password

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword, // Use the hashed password
    });

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
