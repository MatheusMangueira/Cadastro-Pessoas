import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { hash } from 'bcrypt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexCadastroSwagger } from './swagger/index-cadastro.swagger';

@Controller('users')
@ApiTags('Todo cadastro')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Dados retornado com sucesso',
    type: IndexCadastroSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Dados não encontrado' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Dados de um usuario retornado com sucesso',
    type: IndexCadastroSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Dados não encontrado' })
  @ApiOperation({ summary: 'Exibir o usuario cadastrado pelo ID' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Usuario cadastrado com sucesso',
    type: IndexCadastroSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Cadastro invalido' })
  @ApiOperation({ summary: 'Criar um cadastro de usuario' })
  async create(@Body() createUsuarioDto: CreateUsersDto) {
    const { password, email, name } = createUsuarioDto;
    const passwordCrypto = await hash(password, 8);
    return this.usersService.create({
      email,
      name,
      password: passwordCrypto,
    });
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Dados atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Dados não encontrado' })
  @ApiOperation({ summary: 'Atualizar os dados do usuario pelo ID' })
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsersDto,
  ) {
    const { password, email, name } = updateUsuarioDto;
    const updatePassword = await hash(password, 8);
    return await this.usersService.update(id, {
      password: updatePassword,
      email,
      name,
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Cadastro deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Dados invalidos' })
  @ApiOperation({ summary: 'Remover um cadastro de usuario pelo ID' })
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
