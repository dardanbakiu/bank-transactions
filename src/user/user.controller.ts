import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Get,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: Partial<User>): Promise<User> {
    return this.userService.register(user);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
