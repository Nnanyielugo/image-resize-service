import jsonpatch from 'jsonpatch';

import patchObject from '../helpers/patchObject.json';
import {addToArray, filterArraById} from '../helpers/helper_functions';

export const getOriginalObject = (req, res, next) => {
  if(patchObject.length < 1) {
    return res.status(200).json({message: "No objects in patch document. Please create some!"})
  }
  return res.status(200).json(patchObject);
}

export const addToOriginalObject = (req, res, next) => {
    if(typeof req.body.name === 'undefined' || typeof req.body.description === 'undefined') {
    return res.status(400).json({message: "request body cannot be empty"})
  }
  return res.status(201).json(addToArray(patchObject, req.body))
}

export const patchOriginalObject = (req, res, next) => {
  const id = req.params.id; 
  const fetchedDocument = filterArraById(patchObject, id);
  const thePatch = [
    {"op": "replace", "path": "/name", "value": req.body.name ? req.body.name : fetchedDocument.name},
    {"op": "replace", "path": "/description", "value": req.body.description ? req.body.description : fetchedDocument.description}
  ]
  const patchedDoc = jsonpatch.apply_patch(fetchedDocument, thePatch)
  
  return res.status(200).json(patchedDoc)
}