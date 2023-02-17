import { IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(7)
  dni: string;

  @IsString()
  @MinLength(1)
  nombres: string;

  @IsString()
  @MinLength(1)
  apellidoPaterno: string;

  @IsString()
  @MinLength(1)
  apellidoMaterno: string;
}
