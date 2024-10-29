export const baseCodePrefixes: SmartContractCode = {
    name: "prefixes",
    code:
`'use strict';

const ASSET_PRE = 'asset';
const ASSET_USER_COUNT_PRE = 'asset_user_count';
const ASSET_OWNER_PRE = 'asset_owner';
const APPROVE_SINGLE_PRE = 'approve_single';
const APPROVE_ALL_PRE = 'approve_all';
const CONTRACT_PRE = 'contract_info';
const ASSET_SUPPLY = 'asset_supply';
const ZTP_PROTOCOL = 'ztp721';
`
}

export const utilityCode: SmartContractCode = {
    name: "utility",
    code:
`
function getKey(first, second, third = '') {
  return (third === '') ? (first + '_' + second) : (first + '_' + second + '_' + third);
}

function loadObj(key) {
  let data = Chain.load(key);
  Utils.assert(data !== false, 'Failed to get storage data, key:' + key);
  return JSON.parse(data);
}

function saveObj(key, value) {
  Chain.store(key, JSON.stringify(value));
}

function checkAssetExist(id) {
  let data = Chain.load(getKey(ASSET_PRE, id));
  if(data === false) {
    return false;
  }
  return true;
}

function saveAsset(id, issuer, uri) {
  let nftObj = {};
  nftObj.id = id;
  nftObj.issuer = issuer;
  nftObj.uri = uri;
  saveObj(getKey(ASSET_PRE, id), nftObj);
}

function getAssetOwner(id) {
  let data = Chain.load(getKey(ASSET_OWNER_PRE, id));
  if(data === false) {
    return '';
  }
  return JSON.parse(data).owner;
}

function saveAssetOwner(id, owner) {
  let obj = {};
  obj.owner = owner;
  saveObj(getKey(ASSET_OWNER_PRE, id), obj);
}

function getAssetUserCount(user) {
  let data = Chain.load(getKey(ASSET_USER_COUNT_PRE, user));
  if(data === false) {
    return '0';
  }
  return JSON.parse(data).count;
}

function saveAssetUserCount(user, count) {
  let key = getKey(ASSET_USER_COUNT_PRE, user);
  if(Utils.int64Compare(count, '0') !== 0) {
    let obj = {};
    obj.count = count;
    saveObj(key, obj);
    return;
  }

  let data = Chain.load(key);
  if(data !== false) {
    Chain.del(key);
  }
}

function getApproveSingle(id) {
  let data = Chain.load(getKey(APPROVE_SINGLE_PRE, id));
  if(data === false) {
    return '';
  }
  return JSON.parse(data).operator;
}

function saveApproveSingle(id, operator) {
  let obj = {};
  obj.operator = operator;
  saveObj(getKey(APPROVE_SINGLE_PRE, id), obj);
}

function delApproveSingle(id) {
  let key = getKey(APPROVE_SINGLE_PRE, id);
  let data = Chain.load(key);
  if(data === false) {
    return false;
  }
  Chain.del(key);
  return true;
}

function getApproveAll(owner, operator) {
  let data = Chain.load(getKey(APPROVE_ALL_PRE, owner, operator));
  if(data === false) {
    return false;
  }
  return JSON.parse(data).approved;
}

function saveApproveAll(owner, operator, approved) {
  let key = getKey(APPROVE_ALL_PRE, owner, operator);
  if(approved) {
    let approvedObj = {};
    approvedObj.approved = approved;
    saveObj(key, approvedObj);
    return;
  }

  let data = Chain.load(key);
  if(data !== false) {
    Chain.del(key);
  }
}

function getAssetSupply() {
  let data = Chain.load(ASSET_SUPPLY);
  if(data === false) {
    return '0';
  }
  return JSON.parse(data).count;
}

function saveAssetSupply(count) {
  let supplyObj = {};
  supplyObj.count = count;
  saveObj(ASSET_SUPPLY, supplyObj);
}

function _approve(owner, id, approved) {
  if(approved !== '') {
    saveApproveSingle(id, approved);
    Chain.tlog('Approval', owner, approved, id);
    return;
  }

  if(delApproveSingle(id)) {
    Chain.tlog('Approval', owner, '0x', id);
    return;
  }
}

function _transFrom(id, from, to) {
  Utils.assert(checkAssetExist(id), 'Check nft not exsit.');
  let owner = getAssetOwner(id);
  Utils.assert(owner === from, 'Nft owner not equal from.');
  Utils.assert(owner === Chain.msg.sender || getApproveSingle(id) === Chain.msg.sender || getApproveAll(owner, Chain.msg.sender), 'No privilege to trans.');
  saveAssetUserCount(from, Utils.int64Sub(getAssetUserCount(from), '1'));
  saveAssetUserCount(to, Utils.int64Add(getAssetUserCount(to), '1'));
  saveAssetOwner(id, to);
  _approve(owner, id, '');
  Chain.tlog('Transfer', owner, to, id);
  return;
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