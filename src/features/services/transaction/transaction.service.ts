import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class TransactionService<T> {
  constructor(private connection: Connection) {}

  async createMany(value: T[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(value[0]);
      await queryRunner.manager.save(value[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async simpleCreateMany(value: T[]) {
    await this.connection.transaction(
      async manager => {
        await manager.save(value[0]);
        await manager.save(value[1]);
    });
  }
}
