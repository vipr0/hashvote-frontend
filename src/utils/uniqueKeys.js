import { v4 as uuidv4 } from "uuid";

export const addKeysToArray = (arr) => {
  return arr.map((elem) => ({ ...elem, key: uuidv4() }));
};

export const addKey = (obj) => ({ ...obj, key: uuidv4() });
