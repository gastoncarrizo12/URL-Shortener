import Url from "../model/Url.js";

const redirectToFullUrl = async(req, res) =>{
    const find = await Url.findOne({ shortUrl: req.params.shortUrl })
    if(!find){
        return res.status(404).send({message: "Url no encontrada"});
    } else {
        res.redirect(find.fullUrl)    
    }
};

const createShortUrl = async(req, res) =>{
    
    try{
        const insert = await Url.create({ fullUrl: req.body.url})
        const host = req.get("host");
        const response = { shortUrl: `http://${host}/${insert.shortUrl}`}
    
        res.setHeader("Content-Type", "application/json")
        res.send(JSON.stringify(response))
    
    } catch(error) {
        res.status(500).send({message: error.message})
    } 
};

export {redirectToFullUrl, createShortUrl};