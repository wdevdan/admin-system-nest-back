// import { EntitySchema } from 'typeorm';

// import { Item } from '../../domain/entity/item.entity';

// export const ItemSchema = new EntitySchema<Item>({
//   schema: 'development',
//   name: 'Item',
//   target: Item,
//   columns: {
//     uid: {
//       type: String,
//       primary: true,
//       generated: "uuid",
//     },
//     name: {
//       type: String,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
// });