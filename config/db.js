const Sequelize  = require('sequelize') ;

const sequelize = new Sequelize('postgres://njeanhtgqiwrax:8899623aa5aabf4191a2d2c1cc1c4f2b7e3d669545ed8aeee0ca6eb7173e1343@ec2-52-203-27-62.compute-1.amazonaws.com:5432/deu7trsv9cgrg4') // Example for postgres

// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USER,
//     process.env.DATABASE_PASSWORD,
//     {
// 	logging: false,
//         host: process.env.DATABASE_HOST,
//         dialect: 'postgres',
//     },
// );

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
