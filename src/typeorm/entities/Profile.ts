import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'profile' })

export class Profile { 
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  dob: string;
}

