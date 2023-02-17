import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({
    type: 'text',
    unique: true,
  })
  dni: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  nombres: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  apellidoPaterno: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  apellidoMaterno: string;
}
