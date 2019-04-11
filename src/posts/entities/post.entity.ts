import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nick: string 

  @Column()
  post: string
}
