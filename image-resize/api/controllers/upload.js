import sharp from 'sharp';
import request from 'request';
import fs from 'fs';

import { generateRandomName } from '../helpers/helper_functions';

export const upload = (req, res, next) => {
  const imageSrc = req.body.imageSrc;
  request({url: imageSrc, encoding: null}, function(err, response, bodyBuffer){
    sharp(bodyBuffer)
      .resize(50, 50)
      .toBuffer( (err, data, info) =>{
        if(err) return next(err);

        // generate random filename and write image to filesystem
        const generatedName = `./uploads/${generateRandomName()}.${info.format}`;
        const url = generatedName.replace(/./, '')
        fs.writeFile(generatedName, data, function(err){if(err) next(err)});

        // convert buffer to base64 string, then send buffer and url to image  as json response
        const base64Image = Buffer.from(data).toString('base64');
        return res.json({data: base64Image, imageUrl: url, info: info})
      })
  })
}