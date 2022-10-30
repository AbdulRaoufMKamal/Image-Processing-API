import express, { NextFunction } from 'express';
import  fs from 'fs';
import path from 'path';
import Image from '../../util/image';


const resize = express.Router();



resize.get('/',async (req,res) => {

    const query = req.query
    const isValidData = /^\d+$/.test(query.width as string) && /^\d+$/.test(query.height as string);
    if(!isValidData) {
        res.send('Invalid data entered')
        return
    }
    const image: Image = new Image();
    const promise = image.resizeImage(query.width as string,query.height as string,query.name as string);
    promise.then(() => {
        const imagePath = path.resolve(`./assets/thumb/${query.name as string}_${query.width as string}_${query.height as string}.jpg`)
        if(fs.existsSync(imagePath))
            res.status(200).sendFile(path.resolve(imagePath));
        else 
            res.send('Image was not found')
    })
});

export default resize;

