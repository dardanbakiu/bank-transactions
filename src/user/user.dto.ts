import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user.' })
  email: string;

  @ApiProperty({ description: 'The password of the user.' })
  password: string;

  @ApiProperty({ description: 'First name of the user.' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user.' })
  lastName: string;
}

export class LoginDto {
  @ApiProperty({ description: 'The email of the user.' })
  email: string;

  @ApiProperty({ description: 'The password of the user.' })
  password: string;
}