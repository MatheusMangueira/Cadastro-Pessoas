import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Usuarios') private readonly usuariosUser: Model<Usuarios>,
  ) {}

  async findAll() {
    return await this.usuariosUser.find().exec();
  }

  async findOne(id: string) {
    const tratamento = this.usuariosUser.findById({ _id: id }).exec();
    return await tratamento;
  }

  async create(createUsuarioDto: any) {
    const createUsers = new this.usuariosUser(createUsuarioDto);
    return await createUsers.save();
  }

  async update(id: string, updateUsuarioDto: any) {
    await this.usuariosUser.updateOne({ _id: id }, updateUsuarioDto).exec();
  }

  async delete(id: string) {
    await this.usuariosUser.deleteOne({ _id: id }).exec();
  }
}
