export const ownerOfCode: SmartContractCode = {
    name: "ownerOf",
    code:
`
function ownerOf(paramObj) {
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  let result = {};
  result.address = getAssetOwner(paramObj.id);
  return result;
}
`
}

export const balanceOfCode: SmartContractCode = {
    name: "balanceOf",
    code:
`
function balanceOf(paramObj) {
  Utils.assert(paramObj.owner !== undefined && paramObj.owner.length > 0, 'Param obj has no owner');
  let result = {};
  result.count = getAssetUserCount(paramObj.owner);
  return result;
}
`
}

export const contractInfoCode: SmartContractCode = {
    name: "contractInfo",
    code:
`
function contractInfo() {
  return loadObj(CONTRACT_PRE);
}
`
}

export const getApprovedCode: SmartContractCode = {
    name: "getApproved",
    code:
`
function getApproved(paramObj) {
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  let result = {};
  result.address = getApproveSingle(paramObj.id);
  return result;
}
`
}

export const tokenURICode: SmartContractCode = {
    name: "tokenURI",
    code:
`
function tokenURI(paramObj) {
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  let result = {};
  result.uri = loadObj(getKey(ASSET_PRE, paramObj.id)).uri;
  return result;
}
`
}

export const totalSupplyCode: SmartContractCode = {
    name: "totalSupply",
    code:
`
function totalSupply(paramObj) {
  let result = {};
  result.count = getAssetSupply();
  return result;
}
`
}

export const isApprovedForAllCode: SmartContractCode = {
    name: "isApprovedForAll",
    code:
`
function isApprovedForAll(paramObj) {
  Utils.assert(paramObj.owner !== undefined && paramObj.owner.length > 0, 'Param obj has no owner.');
  Utils.assert(paramObj.operator !== undefined && paramObj.operator.length > 0, 'Param obj has no operator.');
  let result = {};
  result.approved = getApproveAll(paramObj.owner, paramObj.operator);
  return result;
}
`
}