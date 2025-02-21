// question: what is a dto?
// DTO stands for Data Transfer Object, this object is used to
// define the shape (like a type) of the data being used
// all around our application, typically between a client and server

export class CreateUserDto {
  username: string
  password: string
}