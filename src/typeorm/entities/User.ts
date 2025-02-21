import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })

export class User { 
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  //why is this javascript not accepted? use timestamp instead??
  // @Column({ default: new Date() })
  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}

