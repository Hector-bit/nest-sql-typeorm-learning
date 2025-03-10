import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

//service is responsible for all the 'business logic'
//question: what is the purpose of an "Injection"? 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ){}

  findUsers(){
    return this.userRepository.find({ relations: ['profile']});
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

  updateUser(id: number, updateUserDetails:UpdateUserParams){
    this.userRepository.update({ id }, { ...updateUserDetails })
  }

  deleteUser(id: number){
    this.userRepository.delete({ id })
  }

  async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams){
    const user = await this.userRepository.findOneBy({ id })
    if (!user) 
      throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user)

  }

  async createUserPost(id: number, createUserPostDetails: CreateUserPostParams){
    const user = await this.userRepository.findOneBy({ id })
    if (!user) 
      throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)
    const newpost = this.postRepository.create({...createUserPostDetails, user,})
    return this.postRepository.save(newpost)
  }
}
