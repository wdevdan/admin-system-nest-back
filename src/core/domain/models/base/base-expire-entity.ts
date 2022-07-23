import { IsDate, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

import { BaseEntity } from './base-entity';

export abstract class BaseExpireEntity extends BaseEntity {

    @IsNotEmpty() @IsDate()
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    validSince: Date;

    @IsNotEmpty() @IsDate()
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    validUntil: Date;

    abstract get CreationFields(): string[];
    abstract get DtoFields(): string[];
}
