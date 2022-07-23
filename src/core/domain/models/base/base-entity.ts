import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', default: null, nullable: true })
    deletedAt?: Date | null = null;

    @Column({ type: 'varchar', length: 255, default: null, nullable: true })
    updatedBy?: string;

    abstract get CreationFields(): string[];
    abstract get DtoFields(): string[];

    // @Generated('increment')
    // @Column({ type: 'int', nullable: false })
    // id: number;
}
