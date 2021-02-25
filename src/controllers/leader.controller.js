
const Leader = require('../../models/Leader');
const Department = require('../../models/Department');


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function createLeader(req, res){
    try{
        let params = req.body;
        if(!params.departmentId){
            return responseApi(res, 400, null, "provide department id");
        }
        let department = await getDepartment({id: params.departmentId});
        console.log("department", department); 
        if(!department){
            return responseApi(res, 400, null, "department not found");
        }

        let saveLeader = await Leader.create({...params});
        return responseApi(res, 201, saveLeader, "leader added");
    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}

async function updateLeader(req, res){
    try{
        let params = req.body;
        let leaderFound = await getLeader({id: params.id});
        if(!leaderFound){
            return responseApi(res, 400, null, "departent doesnt exist")
        }
        await Leader.update({...params}, {where: {id: params.id}});
        let updatedLeader = await Leader.findOne({where: {id: params.id}});
        return responseApi(res, 200, updatedLeader, "leader updated");

    }catch(error){
    
       return responseApi(res, 500, null, error.message); 
    }

}


async function findLeader(req, res){
    try{
        let leaderFound = await getLeader({id: req.params.id});
        let leader = await Leader.findOne({where: {id: req.params.id}, include: Department});
        
        if(!leaderFound){
            return responseApi(res, 400, null, "leader doesnt exist");
        }
        return responseApi(res, 200, leader, "leader found");
    }catch(error){
        return responseApi(res, 500, null, error.message);
    }
}

async function fetchAllLeaders(req, res){
        
    try{
        let leaders = await Leader.findAll();
        if(leaders.length < 1){
            return responseApi(res, 204, null, "no leaders availbale");
        }
        return responseApi(res, 200, leaders, "leaders found");
    }catch(error){
        return responseApi(res, 500, null, error.message);
        
    }
}



async function getLeader(query){
    let leader = await Leader.findOne({where:{...query}});
    
    return leader;

}

async function getDepartment(query){
    console.log(query)
    let department = await Department.findOne({where: {...query}});
    return department;

}

module.exports = {
    createLeader,
    updateLeader,
    findLeader,
    fetchAllLeaders

}
