import { v4 as uuidv4 } from "uuid";
import { loadJson, saveJson } from "./jsonUtils.js";

export const createNewAccount = (usersIds) => {
  const accounts = loadJson("accounts");
  const newAccount = {
    id: uuidv4(),
    cash: 0,
    credit: 0,
    usersIds: usersIds,
    isActive: true,
  };
  accounts.push(newAccount);
  saveJson(accounts, "accounts");
  return newAccount;
};

export const getTotalCash = (accountIds) => {
  const accounts = loadJson("accounts");
  const filteredAccounts = accounts.filter((account) =>
    accountIds.includes(account.id)
  );
  const totalCash = filteredAccounts.reduce((accum, account) => {
    return accum + account.cash;
  }, 0);
  return totalCash;
};

export const addUserIdToAccounts = (userId, accountIds) => {
  const accounts = loadJson("accounts");
  accounts.forEach((account) => {
    if (accountIds.includes(account.id)) {
      account.usersIds.push(userId);
    }
  });
  saveJson(accounts, "accounts");
};

export const deleteAccounts = (accountIdsArr) => {
  const accounts = loadJson("accounts");
  const indexesToDelete = accountIdsArr.map((accountId) => {
    return accounts.findIndex((account) => account.id === accountId);
  });
  indexesToDelete.forEach((idx) => accounts.splice(idx, 1));
  saveJson(accounts, "accounts");
};

export const deleteUserIdFromAccounts = (userId, accountIds) => {
  // need to add that if the accountIds is empty after delete we need to delete the account?
  const accounts = loadJson("accounts");
  const accountIdsToDelete = [];
  accounts.forEach((account) => {
    if (accountIds.includes(account.id)) {
      const userIdIndex = account.usersIds.findIndex((id) => id === userId);
      account.usersIds.splice(userIdIndex, 1);
      if (account.usersIds.length === 0) {
        accountIdsToDelete.push(account.id);
      }
    }
  });
  saveJson(accounts, "accounts");
  deleteAccounts(accountIdsToDelete);
};
