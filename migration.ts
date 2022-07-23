import { configService } from './src/config/config.service';

import fs = require('fs');

fs.writeFileSync('ormconfig.json', JSON.stringify(configService.getTypeOrmConfig(), null, 2));

// npm run typeorm:migration:generate -- my_init
// npm run typeorm:migration:run