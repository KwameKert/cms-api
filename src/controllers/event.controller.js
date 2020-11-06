const Event = require('../../models/Event');



const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function createEvent(req, res){
    
    try{

        let saveEvent = await Event.create({...req.body});
        return responseApi(res, 201, saveEvent, "devent added");

    }catch(e){
        console.error(e.message);
        return responseApi(res, 500, null, e.message);
    }
    
}



module.exports = {
    createEvent

}
