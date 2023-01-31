import { db } from './db.js';

export const findUserById = (id) => db.find((user) => user.id === id);

export const createUser = (user) => {
  db.push(user);
  const createdUser = findUserById(user.id);
  return createdUser;
};

export const updateUser = (user) => {
  const userIndex = db.findIndex((item) => item.id === user.id);
  Object.assign(db[userIndex], user);
  const updatedUser = findUserById(user.id);
  return updatedUser;
};

export const getAutoSuggestUsers = (loginSubstring, limit) => {
  const list = db
    .filter((user) => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
  return list;
};

export const deleteUser = (id) => {
  const userIndex = db.findIndex((item) => item.id === id);
  db[userIndex].isDeleted = true;
  const deletedUser = findUserById(id);
  return deletedUser.isDeleted;
};
