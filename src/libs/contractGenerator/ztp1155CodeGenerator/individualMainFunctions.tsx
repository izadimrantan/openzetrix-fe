export const safeTransferFromCode: SmartContractCode = {
    name: "safeTransferFrom",
    code:
`
function safeTransferFrom(paramObj) {
  //Checking parameter Validity
  _transFrom(paramObj.id, paramObj.from, paramObj.to, paramObj.value, paramObj.data);

  //trigger event
  Chain.tlog('TransferSingle', Chain.msg.sender, paramObj.from, paramObj.to, paramObj.id, paramObj.value);
}
`
}

export const safeBatchTransferFromCode: SmartContractCode = {
    name: "safeBatchTransferFrom",
    code: 
`
function safeBatchTransferFrom(paramObj) {

  //Transfer assets and keep records
  let i = 0;
  for (i = 0; i < paramObj.ids.length; i += 1) {
    Utils.assert(Utils.int64Compare(paramObj.values[i], 0) > 0, 'Value must greater than 0.');
    _transFrom(paramObj.ids[i], paramObj.from, paramObj.to, paramObj.values[i], paramObj.datas[i]);
  }

  //trigger event
  Chain.tlog('TransferBatch', Chain.msg.sender, paramObj.from, paramObj.to, JSON.stringify(paramObj.ids), JSON.stringify(paramObj.values));
}
`
}

export const setApprovalForAllCode: SmartContractCode = {
    name: "setApprovalForAll",
    code: 
`
function setApprovalForAll(paramObj) {
  //state of preservation
  saveApproved(Chain.msg.sender, paramObj.operator, paramObj.approved);

  //Trigger log
  Chain.tlog('ApprovalForAll', Chain.msg.sender, paramObj.operator, paramObj.approved);
}
`
}

export const setURICode: SmartContractCode = {
  name: "setURI",
  code:
`
function setURI(paramObj) {
  let asset = getAsset(paramObj.id);
  saveAsset(asset.id, asset.issuer, paramObj.uri, asset.value, paramObj.freezed);
  Chain.tlog('URI', paramObj.uri, paramObj.id);
  if (paramObj.freezed === true) {
    Chain.tlog('Freezed', paramObj.uri, paramObj.id);
  }

  return;
}
`
}

export const mint1155Code: SmartContractCode = {
  name: "mint",
  code:
`
function _mint(id, to, uri, value) {
  saveAsset(id, to, uri, value, false);
  saveBalance(id, to, value);
}

function mint(paramObj) {
 //Issue additional assets and keep records
  _mint(paramObj.id, paramObj.to, paramObj.uri, paramObj.value);

  //trigger event
  Chain.tlog('TransferSingle', Chain.msg.sender, '0x', paramObj.to, paramObj.id, paramObj.value);
}

`
}

export const burn1155Code: SmartContractCode = {
    name: "burn",
    code:
  `
function _burn(id, from, value) {
  //Check whether you approve or own assets
  let approved = getApproved(from, Chain.msg.sender);
  let rawFromValue = getBalance(id, from);
  let fromValue = Utils.int64Sub(rawFromValue, value);
  
  //Transfer assets and keep records
  saveBalance(id, from, fromValue);
}

function burn(paramObj) {
  //Destruction of assets
  _burn(paramObj.id, paramObj.from, paramObj.value);

  //trigger event
  Chain.tlog('TransferSingle', Chain.msg.sender, paramObj.from, '0x', paramObj.id, paramObj.value);
}
  `
}