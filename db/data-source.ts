import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 3306,
  username: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || 'root',
  database: process.env.DATABASE || 'bank',
  // entities: ['dist/**/*{.ts,.js}'],
  entities: ['dist/src/**/*{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  // synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
