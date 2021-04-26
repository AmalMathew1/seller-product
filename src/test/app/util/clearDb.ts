import { getRepository } from "typeorm";
import rdbmsConfig = require("../../../app/config/rdbms");
​
export const clearDb = async (entityName: string) => {
    const repository = getRepository(entityName);
    await repository.query(`DELETE FROM ${rdbmsConfig.schema}.${entityName} CASCADE;`);
};

export const insertData = async (entityName: string, data: any) => {
    const repository =  getRepository(entityName);
    await repository.save(data);
};
