import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService){}

  @Get()
  async getUsers(){
    const users = await this.userService.findUsers();
    return users;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    // const { ...userDetails, confirmPassword } = createUserDto;
    return this.userService.createUser(createUserDto)
  }
}
