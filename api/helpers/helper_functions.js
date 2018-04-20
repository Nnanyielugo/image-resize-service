export const addToArray = (array, requestBody) => {
  if(!array){
    return "No array input specified!"
  }

  let maxId = 0;
  for(let i = 0; i < array.length; i++){
    maxId = Math.max(parseInt(array[i].id))
  }
  
  requestBody.id = maxId += 1;
  array.push(requestBody);

  return array;
}

export const filterArraById = (array, Id) => {
  return array.find(document => document.id == Id);
}

export const generateRandomName = () => {
  let characterBank = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let date = new Date().getTime();
  let finishedString = 'file-';

  for(let i = 0; i < 8; i++){
    finishedString += characterBank[parseInt(Math.random()*26)]
  } 
  
  return (finishedString += date)
}