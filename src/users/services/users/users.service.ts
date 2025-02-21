import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

//service is responsible for all the 'business logic'
//question: what is the purpose of an "Injection"? 
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  findUsers(){
    return this.userRepository.find()
  }

  createUser(userDetails: CreateUserParams){
    //create the user based on the args passed 
    //note: create is not async
    const newUser = this.userRepository.create({ 
      ...userDetails,
      createdAt: new Date()
     });
     //save is an async method
     this.userRepository.save(newUser)

  }
}
