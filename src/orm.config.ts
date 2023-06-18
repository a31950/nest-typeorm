import {TypeOrmModuleOptions } from "@nestjs/typeorm"

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCRONIZE : false,
        ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*.{.ts,.js'],
        MIGRATIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
      type: 'mysql',
      host: 'a31950.synology.me',
      port: 3306,
      username: 'a31950',
      password: '3195',
      database: 'test',
      entities: commonConf.ENTITIES,
      synchronize: commonConf.SYNCRONIZE,
      logging: true,
      migrations: commonConf.MIGRATIONS,
      migrationsRun: commonConf.MIGRATIONS_RUN
    }

    return ormconfig;
}


export { ormConfig}