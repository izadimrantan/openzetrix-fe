export const safeTransferFromCode: SmartContractCode = {
    name: "safeTransferFrom",
    code:
`
function safeTransferFrom(paramObj) {
  Utils.assert(paramObj.from !== undefined && paramObj.from.length > 0, 'Param obj has no from.');
  Utils.assert(paramObj.to !== undefined && paramObj.to.length > 0, 'Param obj has no to.');
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  Utils.assert(Utils.addressCheck(paramObj.from), 'From address is invalid.');
  Utils.assert(Utils.addressCheck(paramObj.to), 'To address is invalid.');
  _transFrom(paramObj.id, paramObj.from, paramObj.to);
  return;
}
`
}

export const transferFromCode: SmartContractCode = {
    name: "transferFrom",
    code: 
`
function transferFrom(paramObj) {
  Utils.assert(paramObj.from !== undefined && paramObj.from.length > 0, 'Param obj has no from.');
  Utils.assert(paramObj.to !== undefined && paramObj.to.length > 0, 'Param obj has no to.');
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  Utils.assert(Utils.addressCheck(paramObj.from), 'From address is invalid.');
  Utils.assert(Utils.addressCheck(paramObj.to), 'To address is invalid.');
  _transFrom(paramObj.id, paramObj.from, paramObj.to);
  return;
}
`
}

export const approveCode: SmartContractCode = {
    name: "approve",
    code: 
`
function approve(paramObj) {
  Utils.assert(paramObj.approved !== undefined && paramObj.approved.length >= 0, 'Param obj has no approved.');
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  Utils.assert(Utils.addressCheck(paramObj.approved) || paramObj.approved === '', 'Approved address is invalid.');
  Utils.assert(Chain.msg.sender !== paramObj.approved, 'Approved cannot equal msg sender.');
  Utils.assert(checkAssetExist(paramObj.id), 'NFT does not exist.');
  let owner = getAssetOwner(paramObj.id);
  Utils.assert(owner === Chain.msg.sender, 'No privilege to trans.');
  
  _approve(owner, paramObj.id, paramObj.approved);
  return;
}
`
}

export const setApprovalForAllCode: SmartContractCode = {
  name: "setApprovalForAll",
  code:
`
function setApprovalForAll(paramObj) {
  Utils.assert(paramObj.operator !== undefined && paramObj.operator.length > 0, 'Param obj has no operator.');
  Utils.assert(paramObj.approved !== undefined, 'Param obj has no approved.');
  Utils.assert(paramObj.approved === true || paramObj.approved === false, 'Approved must be true or false.');
  Utils.assert(Utils.addressCheck(paramObj.operator), 'Operator address is invalid.');
  Utils.assert(Chain.msg.sender !== paramObj.operator, 'Operator cannot equal msg sender.');
  saveApproveAll(Chain.msg.sender, paramObj.operator, paramObj.approved);
  Chain.tlog('ApprovalForAll', Chain.msg.sender, paramObj.operator, paramObj.approved);
  return;
}
`
}

export const mint721Code: SmartContractCode = {
  name: "mint",
  code:
`
function mint(paramObj) {
  Utils.assert(paramObj.to !== undefined && paramObj.to.length > 0, 'Param obj has no to.');
  Utils.assert(paramObj.uri !== undefined && paramObj.uri.length > 0, 'Param obj has no uri.');
  Utils.assert(Utils.addressCheck(paramObj.to), 'To address is invalid.');
  let newId = Utils.int64Add(getAssetSupply(), '1');
  let newUserCount =  Utils.int64Add(getAssetUserCount(paramObj.to), '1');
  saveAsset(newId, Chain.msg.sender, paramObj.uri);
  saveAssetOwner(newId, paramObj.to);
  saveAssetUserCount(paramObj.to, newUserCount);
  saveAssetSupply(newId);
  Chain.tlog('Transfer', '0x', paramObj.to, newId);
  return;
}
`
}

export const burn721Code: SmartContractCode = {
    name: "burn",
    code:
  `
function burn(paramObj) {
  Utils.assert(paramObj.id !== undefined && paramObj.id.length > 0, 'Param obj has no id.');
  Utils.assert(checkAssetExist(paramObj.id), 'Check nft not exsit.');
  let owner = getAssetOwner(paramObj.id);
  Utils.assert(owner === Chain.msg.sender || getApproveSingle(paramObj.id) === Chain.msg.sender || getApproveAll(owner, Chain.msg.sender), 'No privilege to burn.');
  saveAssetUserCount(owner, Utils.int64Sub(getAssetUserCount(owner), '1'));
  saveAssetOwner(paramObj.id, '');
  _approve(owner, paramObj.id, '');
  Chain.tlog('Transfer', owner, '0x', paramObj.id);
  return;
}
  `
}