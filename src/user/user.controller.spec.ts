import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

class MockUserService {
  register(user: Partial<User>): Promise<User> {
    const newUser: User = {
      id: 1,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: true,
      email: user.email,
      password: user.password,
    };
    return Promise.resolve(newUser);
  }
}

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should register a new user', async () => {
    const user: Partial<User> = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password',
    };
    const expectedResult: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      email: 'john@example.com',
      password: 'password',
    };

    const registerSpy = jest
      .spyOn(userService, 'register')
      .mockResolvedValue(expectedResult);

    const result = await userController.register(user);

    expect(registerSpy).toHaveBeenCalledWith(user);

    expect(result).toEqual(expectedResult);
  });
});
