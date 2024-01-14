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
  POLYNOTE_CONTRACT: process.env.POLYNOTE_CONTRACT,
  PUSH_CHANNEL_CAIP: `eip155:5:0xA63A810228a180767d3502EF8d21DbF4Da0D6b43`,
  APP_VERSION: process.env.APP_VERSION as 'development' | 'production',
  DB_NAMESPACE: process.env.DB_NAMESPACE,
  WEB3_STORAGE_TOKEN: process.env.WEB3_STORAGE_TOKEN,
  OPENAI_API_KEY: process.env.OPEN_AI_KEY,
  CLAVE_REGISTRY_ADDRESS: '0x9DCbb5f7454E1a9bE5f463415B03201EB7DAe69f',
  CLAVE_VALIDATOR_ADDRESS: '0x379f41Ab03B8e62A91aF1695fd70796ef51D4cfa',
};

type Config = {
  MYSQL: TypeOrmModuleOptions;
  PORT: number;
  POLYNOTE_CONTRACT: string;
  PUSH_CHANNEL_CAIP: string;
  APP_VERSION: 'development' | 'production';
  DB_NAMESPACE: string;
  WEB3_STORAGE_TOKEN: string;
  OPENAI_API_KEY: string;
  CLAVE_REGISTRY_ADDRESS: string;
  CLAVE_VALIDATOR_ADDRESS: string;
};
