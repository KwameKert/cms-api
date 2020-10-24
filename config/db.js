const Sequelize  = require('sequelize') ;

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
    },
);

async function connect(){
  //console.log('password here',process.env.DATABASE_PASSWORD)
    
  // console.log('db name', process.env.DATABASE);
   await sequelize.authenticate();
}

connect().then(()=>{
  console.log('Connection has been established successfully.');
}).catch(error=>{ 
  console.error('Unable to connect to the database:', error);
 })



module.exports = sequelize;