import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: UserInterface): Promise<UserInterface> {
    return await this.prisma.user.create({
      data: { name: data.name, email: data.email },
    });
  }

  async findAllUser(): Promise<UserInterface[]> {
    return await this.prisma.user.findMany();
  }

  async findOneUser(id: number):Promise<UserInterface> {
    const user = await this.prisma.user.findUnique({
      where: {id:id},
    });
    return user
  }
  
  async updateUser(id: number, data: UserInterface):Promise<UserInterface> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async removeUser(id: number):Promise<UserInterface> {
    return await this.prisma.user.delete({
      where: {id:id},
    });
  }
}
