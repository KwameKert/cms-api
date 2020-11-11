const Event = require('../../models/Event');



const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function createEvent(req, res){
    
    try{

        let saveEvent = await Event.create({...req.body});
        return responseApi(res, 201, saveEvent, "event added");

    }catch(e){
        console.error(e.message);
        return responseApi(res, 500, null, e.message);
    }
    
}


async function updateEvent(req, res){
    try{
        let params = req.body;
        let eventFound = await getEvent({id: params.id});
        if(!departmentFound){
            return responseApi(res, 400, null, "event doesnt exist")
        }
        await Event.update({...params}, {where: {id: params.id}});
        let updatedEvent = await Event.findOne({where: {id: params.id}});
        return responseApi(res, 200, updatedEvent, "event updated");

    }catch(error){

        return responseApi(res, 500, null, error.message); 
    }

}


async function findEvent(req, res){
    try{
        let event = await getEvent({id: req.params.id});
        if(!event){
            return responseApi(res, 400, null, "no event found")
        }
        return responseApi(res,200, event, "event found");
    
    }catch(e){
        console.error(e.message);
        return responseApi(res, 500, null, e.message);
    }
}

async function fetchEvents(req, res){
    try{
        let events = await Event.findAll();
        if(events.length  < 1){
            return responseApi(res, 400, null, "no event found");
        }else{
            return responseApi(res, 200, events, "event found");
        }
    
    }catch(e){
        console.error(e.message);
        return responseApi(res, 500, null, e.message);
    }

}

async function getEvent(query){
    let event = await Event.findOne({...query});
    return event;
}

module.exports = {
    createEvent,
    findEvent,
    fetchEvents,
    updateEvent

}
