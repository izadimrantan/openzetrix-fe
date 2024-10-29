export const baseCodePrefixes: SmartContractCode = {
    name: "prefixes",
    code:
`'use strict';
const ASSET_PRE = 'asset';
const BALANCE_PRE = 'balance';
const APPROVE_PRE = 'approve';
const CONTRACT_PRE = 'contract_info';
const ZTP_PROTOCOL = 'ztp1155';
`
}

export const utilityCode: SmartContractCode = {
    name: "utility",
    code:
`
function _isHexStr64(str) {
  let a = /^[A-Fa-f0-9]{64,64}$/;
  return a.test(str);
}

function getKey(first, second, third = '') {
  return (third === '') ? (first + '_' + second) : (first + '_' + second + '_' + third);
}

function _maxSupply(ID) {
  let result = Utils.hexToDec(ID.substr(48, 16));
  return Utils.int64Add(result, "0");
}

function loadObj(key) {
  let data = Chain.load(key);
  return JSON.parse(data);
}

function saveObj(key, value) {
  Chain.store(key, JSON.stringify(value));
}

function getBalance(id, owner) {
  let data = Chain.load(getKey(BALANCE_PRE, id, owner));
  if (data === false) {
    return "0";
  }

  return JSON.parse(data).value;
}

function saveBalance(id, owner, value) {
  let result = Utils.int64Compare(value, "0");
  Utils.assert(value >= 0, 'Value must gt or equal 0.');
  if (result === 0) {
    Chain.del(getKey(BALANCE_PRE, id, owner));
    return;
  }

  let balanceObj = {};
  balanceObj.value = value;
  saveObj(getKey(BALANCE_PRE, id, owner), balanceObj);
}

function getApproved(owner, operator) {
  let data = Chain.load(getKey(APPROVE_PRE, owner, operator));
  if (data === false) {
    return false;
  }

  return JSON.parse(data).approved;
}

function saveApproved(owner, operator, approved) {
  let approvedObj = {};
  approvedObj.approved = approved;
  saveObj(getKey(APPROVE_PRE, owner, operator), approvedObj);
}

function saveAsset(id, issuer, uri, value, freezed) {
  let nftObj = {};
  nftObj.id = id;
  nftObj.issuer = issuer;
  nftObj.uri = uri;
  nftObj.value = value;
  nftObj.freezed = freezed;
  saveObj(getKey(ASSET_PRE, id), nftObj);
}

function getAsset(id) {
  return loadObj(getKey(ASSET_PRE, id));
}

function checkAssetExist(id) {
  let data = Chain.load(getKey(ASSET_PRE, id));
  if (data === false) {
    return false;
  }

  return true;
}

function _transFrom(id, from, to, value, data) {
  //If it doesn't exist, make lazy casting
  if (checkAssetExist(id) === false) {
    _mint(id, from, data, _maxSupply(id));
  }

  let approved = getApproved(from, Chain.msg.sender);

  let rawFromValue = getBalance(id, from);
  let rawToValue = getBalance(id, to);

  let fromValue = Utils.int64Sub(rawFromValue, value);
  let toValue = Utils.int64Add(rawToValue, value);
  
  //Check if your assets are owned or approved
  saveBalance(id, to, toValue);
  saveBalance(id, from, fromValue);

  //TODO: trigger contract execution if it is a contract
}
`
}

export const initCode: SmartContractCode = {
    name: "init",
    code:
`
function init(input_str) {
  let paramObj = JSON.parse(input_str).params;
  Utils.assert(paramObj.name !== undefined && paramObj.name.length > 0, 'Param obj has no name.');
  Utils.assert(paramObj.symbol !== undefined && paramObj.symbol.length > 0, 'Param obj has no symbol.');
  Utils.assert(paramObj.describe !== undefined && paramObj.describe.length > 0, 'Param obj has no describe.');
  Utils.assert(paramObj.protocol !== undefined && paramObj.protocol.length > 0 && paramObj.protocol.toLowerCase() === ZTP_PROTOCOL, 'Param obj protocol must be ZTP721.');
  Utils.assert(paramObj.version !== undefined && paramObj.version.length > 0, 'Param obj has no version.');

  saveObj(CONTRACT_PRE, paramObj);
  return;
}
`
}