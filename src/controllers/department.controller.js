const Department = require('../../models/Department');
const Leader = require('../../models/Leader');


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function createDepartment(req, res){
    try{
        let params = req.body;
	//console.log(params);
        let saveDepartment = await Department.create({...params});
        return responseApi(res, 201, saveDepartment, "department added");
    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}

async function updateDepartment(req, res){
    try{
        let params = req.body;
        let departmentFound = await getDepartment({id: params.id});
        if(!departmentFound){
            return responseApi(res, 400, null, "departent doesnt exist")
        }
        await Department.update({...params}, {where: {id: params.id}});
        let updatedDepartment = await Department.findOne({where: {id: params.id}});
        return responseApi(res, 200, updatedDepartment, "department updated");

    }catch(error){

        return responseApi(res, 500, null, error.message); 
    }

}


async function findDepartment(req, res){
    try{
        let departmentFound = await getDepartment({id: req.params.id});
        let department = await Department.findOne({where: {id: req.params.id}, include: Leader});
        if(!departmentFound){
            return responseApi(res, 400, null, "department doesnt exist");
        }
        return responseApi(res, 200, department, "department found");
    }catch(error){
        return responseApi(res, 500, null, error.message);
    }
}

async function fetchAllDepartments(req, res){

    try{
        let departments = await Department.findAll({ order: [['updatedAt', 'DESC']] });
        if(departments.length < 1){
            return responseApi(res, 204, null, "no departments availbale");
        }
        return responseApi(res, 200, departments, "departments found");
    }catch(error){
        return responseApi(res, 500, null, error.message);

    }
}

async function deleteDepartment(req, res){

	try{
	 let department = await Department.findOne({ where: { id: req.params.id } });
      if(department){
         await department.destroy();
        return responseApi(res, 200, null, "Department deleted ");
      }else{
          return responseApi(res, 400, null, "No department found");
      }

	}catch(error){
		return responseApi(res, 500, null, error.message);
	}

}

async function getDepartment(query){
    let department = await Department.findOne({...query});
    return department;

}


module.exports = {
    createDepartment,
    updateDepartment,
    findDepartment,
    deleteDepartment,
    fetchAllDepartments

}
