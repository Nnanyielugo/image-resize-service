export const addToArray = (array, requestBody) => {
  if(!array){
    return "No array input specified!"
  }

  let maxId = 0;
  for(let i = 0; i < array.length; i++){
    maxId = Math.max(parseInt(array[i].id))
  }
  console.log(maxId)
  requestBody.id = maxId += 1;
  array.push(requestBody);

  return array;
}

export const filterArraById = (array, Id) => {
  return array.find(document => document.id == Id);
}