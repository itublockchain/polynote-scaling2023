import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const CONFIG: Config = {
  MYSQL: {
    type: 'mysql',
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
  } as TypeOrmModuleOptions,
  PORT: Number(process.env.APP_PORT),
};

type Config = {
  MYSQL: TypeOrmModuleOptions;
  PORT: number;
};
