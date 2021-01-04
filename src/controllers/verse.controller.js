const Verse = require('../../models/Verse');



const responseApi = (res, status, data, message)=>{
    return res.status(status).send({data, message});
}


async function saveVerse(req, res){
    try{
     //   console.log("Im here");
        await Verse.update({status: 'inactive'});
        let sermon = await Verse.create({...req.body});
        return responseApi(res, 201, sermon, "Verse saved successfully");
    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}



async function updateVerse(req, res){
    try{
        let verse = await getVerse({id: req.body.id});
        if(!verse){
            return responseApi(res, 400, null, "No verse found");
        }
        await Verse.update({...req.body}, {where: {id: req.body.id}});
        let updatedVerse = await Verse.findOne({where: {id: req.body.id}});
        return responseApi(res, 201, updatedVerse, "Verse updated successfully");
    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}


async function fetchVerses(req, res){
    try{
        let verses = await Verse.findAll();
        if(verses.length < 1){
            return responseApi(res, 204, null, "No verses found");
        }
        return responseApi(res, 200, verses, "Verses found");

    }catch(error){
        console.error(error.message);
        return responseApi(res, 500, null, error.message);
    }
}

async function getVerse(query){
    let verse = await Verse.findOne({...query});
    return verse;
}


module.exports = {
    saveVerse, 
    updateVerse,
    fetchVerses
}