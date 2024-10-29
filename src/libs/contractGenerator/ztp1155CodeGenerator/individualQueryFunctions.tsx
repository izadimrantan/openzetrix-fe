export const balanceOfBatchCode: SmartContractCode = {
    name: "balanceOfBatch",
    code:
`
function balanceOfBatch(paramObj) {
  let result = {};
  result.balances = [];
  let i = 0;
  for (i = 0; i < paramObj.ids.length; i += 1) {
    result.balances.push(getBalance(paramObj.ids[i], paramObj.owners[i]));
  }

  return result;
}
`
}

export const balanceOfCode: SmartContractCode = {
    name: "balanceOf",
    code:
`
function balanceOf(paramObj) {
  let result = {};
  result.balance = getBalance(paramObj.id, paramObj.owner);
  return result;
}
`
}

export const isApprovedForAllCode: SmartContractCode = {
    name: "isApprovedForAll",
    code:
`
function isApprovedForAll(paramObj) {
  let approvedObj = {};
  approvedObj.approved = getApproved(paramObj.owner, paramObj.operator);
  return approvedObj;
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

export const uriCode: SmartContractCode = {
    name: "uri",
    code:
`
function uri(paramObj) {
  let uriObj = {};
  uriObj.uri = getAsset(paramObj.id).uri;
  return uriObj;
}
`
}

export const freezedCode: SmartContractCode = {
    name: "freezed",
    code:
`
function freezed(paramObj) {
  let freezedObj = {};
  freezedObj.freezed = getAsset(paramObj.id).freezed;
  return freezedObj;
}
`
}