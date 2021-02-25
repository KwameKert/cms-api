const Sermon = require('../../models/Sermon');


const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function saveSermon(req, res){
    try{
        console.log("im here")
        console.log(req.body)
        let sermon = await Sermon.create({...req.body});
        return responseApi(res, 201, sermon, "Sermon saved successfully");
    }catch(error){
        console.trace(e)
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}


async function updateSermon(req, res){
    try{
        let sermon = await getSermon({id: req.body.id});
        if(!sermon){
            return responseApi(res, 400, null, "No sermon found");
        }
        await Sermon.update({...req.body}, {where: {id: req.body.id}});
        let updatedSermon = await Sermon.findOne({where: {id: req.body.id}});
        return responseApi(res, 201, updatedSermon, "Sermon updated successfully");
    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}


async function fetchSermons(req, res){
    try{
        let sermons = await Sermon.findAll();
        if(sermons.length < 1){
            return responseApi(res, 204, null, "No sermons found");
        }
        return responseApi(res, 200, sermons, "Sermons found");

    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}

async function getSermon(query){
    let sermon = await Sermon.findOne({...query});
    return sermon;
}




module.exports = {
    saveSermon, 
    updateSermon, 
    fetchSermons,
}
