import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Posts";

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

  @OneToOne(() => Profile)
  
  @JoinColumn()
  //profile is the property, Profile is the type :D
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}


