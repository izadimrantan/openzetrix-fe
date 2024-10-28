export const allowanceCode: SmartContractCode = {
    name: "allowance",
    code:
`
function allowance(owner, spender) {
    Utils.assert(Utils.addressCheck(owner) === true, "Arg-owner is not a valid address.");
    Utils.assert(Utils.addressCheck(spender) === true, "Arg-spender is not a valid address.");
    let key = makeAllowanceKey(owner, spender);
    let value = Chain.load(key);
    Utils.assert(value !== false, "Failed to get the allowance given to " + spender + " by " + owner + ".");
    return value;
}
`
}

export const balanceOfCode: SmartContractCode = {
    name: "balanceOf",
    code:
`
function balanceOf(address) {
    Utils.assert(Utils.addressCheck(address) === true, "Arg-address is not a valid address.");
    let value = Chain.load(address);
    return value === false ? "0": value;
}
`
}

export const contractInfoCode: SmartContractCode = {
    name: "contractInfo",
    code:
`
function contractInfo() {
    return Chain.load(CONTRACT_PRE);
}
`
}