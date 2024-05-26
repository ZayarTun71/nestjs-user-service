import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod("UserService" , "CreateUser")
  async create(@Payload() data: UserInterface):Promise<UserInterface> {
    return await this.userService.createUser(data);
  }

  @GrpcMethod("UserService","GetAllUser")
  async findAll() :Promise<UserInterface[] | any>{
    const users = await this.userService.findAllUser();
    // console.log(users);
    return {users:users}
  }

  @GrpcMethod("UserService","GetUser")
  async findOne(@Payload()  data: { id: number }):Promise<UserInterface> {
    return await this.userService.findOneUser(data.id);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(@Payload() data: { id: number; name: string; email: string }): Promise<UserInterface> {
    const { id, name, email } = data;
    return await this.userService.updateUser(id, { name, email });
  }

  @GrpcMethod("UserService", "DeleteUser")
  async removeUser(@Payload() data: { id: number }): Promise<UserInterface>  {
    return await this.userService.removeUser(data.id);
  }
}
