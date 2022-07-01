import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class Usuarios extends Document {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
