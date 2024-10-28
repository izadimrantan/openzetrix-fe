export const approveCode: SmartContractCode = {
    name: "approve",
    code:
`
function approve(spender, value) {
    Utils.assert(Utils.addressCheck(spender) === true, "Arg-spender is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") >= 0, "Arg-value of spender " + spender + " must greater or equal to 0.");
    let key = makeAllowanceKey(Chain.msg.sender, spender);
    Chain.store(key, value);
    Chain.tlog('Approve', Chain.msg.sender, spender, value);
    return true;
}
`
}

export const transferCode: SmartContractCode = {
    name: "transfer",
    code: 
`
function transfer(to, value) {
    Utils.assert(Utils.addressCheck(to) === true, "Arg-to is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must be greater than 0.");
    Utils.assert(Chain.msg.sender !== to, "Transaction initiator cannot be the receiver.");
    let senderValue = Chain.load(Chain.msg.sender);
    Utils.assert(senderValue !== false, "Failed to get the balance of " + Chain.msg.sender + " from metadata.");
    Utils.assert(Utils.int64Compare(senderValue, value) >= 0, "Balance:" + senderValue + " of sender:" + Chain.msg.sender + " < transfer value:" + value + ".");
    let toValue = Chain.load(to);
    toValue = (toValue === false) ? value: Utils.int64Add(toValue, value);
    Chain.store(to, toValue);
    senderValue = Utils.int64Sub(senderValue, value);
    Chain.store(Chain.msg.sender, senderValue);
    Chain.tlog('Transfer', Chain.msg.sender, to, value);
    return true;
}
`
}

export const transferFromCode: SmartContractCode = {
    name: "transferFrom",
    code: 
`
function transferFrom(from, to, value) {
    Utils.assert(Utils.addressCheck(from) === true, "Arg-from is not a valid address.");
    Utils.assert(Utils.addressCheck(to) === true, "Arg-to is not a valid address.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must be greater than 0.");
    Utils.assert(from !== to, "Sender cannot be the receiver.");
    let fromValue = Chain.load(from);
    Utils.assert(fromValue !== false, "Failed to get the value, probably because " + from + " has no value.");
    Utils.assert(Utils.int64Compare(fromValue, value) >= 0, from + " Balance:" + fromValue + " < transfer value:" + value + ".");
    let allowValue = allowance(from, Chain.msg.sender);
    Utils.assert(Utils.int64Compare(allowValue, value) >= 0, "Allowance value:" + allowValue + " < transfer value:" + value + " from " + from + " to " + to + ".");
    let toValue = Chain.load(to);
    toValue = (toValue === false) ? value: Utils.int64Add(toValue, value);
    Chain.store(to, toValue);
    fromValue = Utils.int64Sub(fromValue, value);
    Chain.store(from, fromValue);
    let allowKey = makeAllowanceKey(from, Chain.msg.sender);
    allowValue = Utils.int64Sub(allowValue, value);
    Chain.store(allowKey, allowValue);
    Chain.tlog('Transfer', from, to, value);
    return true;
}
`
}

export const mintCode: SmartContractCode = {
  name: "mint",
  code:
`
function mint(to, value) {
    Utils.assert(to !== undefined && to.length > 0, "Param obj has no to.");
    Utils.assert(Utils.addressCheck(to), "To address is invalid.");
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must > 0.");
    let contractInfo = JSON.parse(Chain.load(CONTRACT_PRE));
    Utils.assert(contractInfo.issuer === Chain.msg.sender, "Only issuer can mint.");
    let toValue = Chain.load(to);
    toValue = (toValue === false) ? value: Utils.int64Add(toValue, value);
    contractInfo.supply = Utils.int64Add(contractInfo.supply, value);
    Chain.store(to, toValue);
    Chain.store(CONTRACT_PRE, JSON.stringify(contractInfo));
    Chain.tlog("Transfer", "0x", to, value);
}
`
}

export const burnCode: SmartContractCode = {
  name: "burn",
  code:
`
function burn(value) {
    Utils.assert(Utils.stoI64Check(value) === true, "Arg-value must be alphanumeric.");
    Utils.assert(Utils.int64Compare(value, "0") > 0, "Arg-value must > 0.");
    let contractInfo = JSON.parse(Chain.load(CONTRACT_PRE));
    Utils.assert(contractInfo.issuer === Chain.msg.sender, "Only issuer can burn.");
    let senderValue = Chain.load(Chain.msg.sender);
    Utils.assert(senderValue !== false, "Failed to get the balance of " + Chain.msg.sender + " from metadata.");
    Utils.assert(Utils.int64Compare(senderValue, value) >= 0, "Balance:" + senderValue + " of sender:" + Chain.msg.sender + " < transfer value:" + value + ".");
    contractInfo.supply = Utils.int64Sub(contractInfo.supply, value);
    senderValue = Utils.int64Sub(senderValue, value);
    Chain.store(Chain.msg.sender, senderValue);
    Chain.store(CONTRACT_PRE, JSON.stringify(contractInfo));
    Chain.tlog("Transfer", Chain.msg.sender, "0x", value);
}
`
}
