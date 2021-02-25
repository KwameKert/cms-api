const sequelize  = require('../config/db');
const app = require('./app');
const port = process.env.PORT;

async function start(){
    await sequelize.sync().then(()=>{
        app.listen(port, ()=>{
            console.log(`App is running on port ${port}`);
        })
    });
}


start();
