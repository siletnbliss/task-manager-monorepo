import { DataSource } from "typeorm";
import { env } from "../utils/envConfig";
import { UserEntity } from "./entities/user";
import { TaskEntity } from "./entities/task";

const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [UserEntity, TaskEntity],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
