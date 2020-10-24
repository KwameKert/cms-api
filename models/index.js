const Sequelize  = require('sequelize') ;

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    },
);


const models = {
    User: sequelize.import('../models/User'),

};


Object.keys(models).forEach(key =>{
    if('associate' in models[key]){
        models[keys].assocate(models);
    }
});

//export { sequelize };

module.export =  {models, sequelize};
