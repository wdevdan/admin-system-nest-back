import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseShortEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', default: null, nullable: true })
    deletedAt?: Date | null = null;

    abstract get CreationFields(): string[];
    abstract get DtoFields(): string[];
}
