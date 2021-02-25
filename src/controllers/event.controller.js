const Event = require('../../models/Event');
const Verse = require('../../models/Verse');
const { Op } = require("sequelize");


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
        //console.log("Event here", eventFound)
        if(!eventFound){
            return responseApi(res, 400, null, "event doesnt exist")
        }
        await Event.update({...params}, {where: {id: params.id}});
        let updatedEvent = await Event.findOne({where: {id: params.id}});
        return responseApi(res, 200, updatedEvent, "event updated");

    }catch(error){
        console.error(error);
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


async function deleteEvent(req, res){
    try{

        let event = await getEvent({id: req.params.id});
        if(!event){
            return responseApi(res, 400, null, "no event found")
        }
        await event.destroy();
        return responseApi(res,200, null, "event deleted");

    }catch(error){

    }
}


async function fetchFrontPage(req, res){
        try{
            let nextEvent = await Event.findOne({
                attributes: ['endDate'],
                where: {
                    endDate: {
                        [Op.gt]:Date.now()
                    }
                }
            })
            let upComingEvents = await Event.findAll({
                where: {
                    endDate: {
                        [Op.gt]:Date.now()
                    },
                    status: "active"
                },order:[['endDate', 'ASC']], limit: 3
            })
            let verseOfWeek = await Verse.findOne({status: 'active'});
            return responseApi(res, 200, {nextEvent, verseOfWeek, upComingEvents}, 'Site components fetched');

        }catch(e){
            console.error(e.message);
            return responseApi(res, 500, null, e.message);
        }
    
}

module.exports = {
    createEvent,
    findEvent,
    fetchEvents,
    updateEvent,
    deleteEvent,
    fetchFrontPage

}
