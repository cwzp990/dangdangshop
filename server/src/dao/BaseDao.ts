import { Sequelize } from 'sequelize-typescript';
import DBConf from '../conf/DBConf';

class BaseDao {
  static baseDaoOrm: BaseDao = new BaseDao();

  sequelize!: Sequelize;

  constructor() {
    this.init();
  }

  init() {
    const { host, user, password, database, port } = DBConf;

    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    });
  }
}

export const { sequelize } = BaseDao.baseDaoOrm;
