const User = require('../../models/User');
const logger = require('../logger');

const { getUserToken,  hashPassword, verifyPassword } = require('../utils/auth');


const responseApi = (res, status, data, message) => {
  return res.status(status).send({ data, message });
};


async function login(req, res){

    try{
        let {username, password} = req.body;
        if(!username || !password){
            return responseApi(res, 400, null, "Please fill all forms");
        }else{
            let userFound = await getUser({username}) ;
            if(!userFound){
                return responseApi(res, 400, null, "user does not exist");
            }

            let validUser = await verifyPassword(password, userFound.password);
            if(!validUser) {
                return responseApi(res, 400, null, "Invalid credentials")
            }else{
                let token = getUserToken({id: userFound.id, username: userFound.username});
                return responseApi(res, 200, {user: userFound, token}, "Login succesfful");
            }
        }
        

    }catch(e){
        logger.error(e.message);
        return responseApi(res, 500, null, e.message);
    }    

}





async function getUser(query){
    let userFound = await User.findOne({where: {...query}});
    return userFound;
}

module.exports = {
    login

}
