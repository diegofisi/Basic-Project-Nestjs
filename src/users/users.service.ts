import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  logger: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = await this.userRepository.create(createUserDto);
      const userinsert: User = await this.findOne(user.dni);
      if (userinsert) throw new BadRequestException('User already exists');
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const users = await this.userRepository.find({});
    return users;
  }

  async findOne(dni: string): Promise<User> {
    return await this.userRepository.findOneBy({ dni });
  }

  async update(dni: string, updateUserDto: UpdateUserDto) {
    const { ...toUpdate } = updateUserDto;
    const user = await this.userRepository.findOneBy({ dni });
    if (!user) throw new BadRequestException('User not found');
    const updatedUser = await this.userRepository.create({
      ...user,
      ...toUpdate,
      dni,
    });
    return this.userRepository.save(updatedUser);
  }

  async remove(dni: string) {
    const user = await this.userRepository.findOneBy({ dni });
    if (!user) throw new BadRequestException('User not found');
    return this.userRepository.remove(user);
  }

  private handleDBExceptions(error: any) {
    console.log('error:  ', error);
    if (error.response.statusCode == 400)
      throw new BadRequestException('ya existe el usuario');

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
