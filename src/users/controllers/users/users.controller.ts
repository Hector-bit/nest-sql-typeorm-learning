import { Controller, Get, Post, Body, Param, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
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

    //note: learn how to handle duplicates that doesn't crash the api
    return this.userService.createUser(createUserDto)
  }

  //alternative to put is patch, where patch is used to only 'patch' part of the desired object
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number){
    await this.userService.deleteUser(id)
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateUserProfileDto: CreateUserProfileDto
  ){
    return this.userService.createUserProfile(id, CreateUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ){
    return this.userService.createUserPost(id, createUserPostDto)
  }

}
