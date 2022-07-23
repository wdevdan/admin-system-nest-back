// import { EntitySchema } from 'typeorm';

// import { User } from '../../../core/domain/entity/user.entity';

// export const UserSchema = new EntitySchema<User>({
//   schema: 'development',
//   name: 'User',
//   target: User,
//   columns: {
//     uid: {
//       type: String,
//       primary: true,
//       generated: 'uuid',
//     },
//     username: {
//       type: String,
//       nullable: false,
//     },
//     login: {
//       type: String,
//       nullable: true,
//     },
//     password: {
//       type: String,
//       nullable: true,
//     },
//   },
//   relations: {
//     userData: {
//       target: 'UserData',
//       type: 'one-to-one',
//       inverseSide: 'name',
//       cascade: true,
//       joinColumn: {
//         name: 'userUid',
//         referencedColumnName: 'uid',
//       },
//     },
//   },
// });
