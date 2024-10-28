export const baseCodePrefixes: SmartContractCode = {
    name: "prefixes",
    code:
`'use strict';
const CONTRACT_PRE = 'contract_info';
const ZTP_PROTOCOL = 'ztp20';
`
}

export const utilityCode: SmartContractCode = {
    name: "utility",
    code:
`
function makeAllowanceKey(owner, spender) {
    return 'allow_' + owner + '_to_' + spender;
}
`
}

export const initCode: SmartContractCode = {
    name: "init",
    code:
`
function init(input_str) {
    let paramObj = JSON.parse(input_str).params;
    Utils.assert(paramObj.name !== undefined && paramObj.name.length > 0, "Param obj has no name.");
    Utils.assert(paramObj.symbol !== undefined && paramObj.symbol.length > 0, "Param obj has no symbol.");
    Utils.assert(paramObj.describe !== undefined && paramObj.describe.length > 0, "Param obj has no describe.");
    Utils.assert(paramObj.decimals !== undefined && Utils.int64Compare(paramObj.decimals, "0") >= 0, "Param obj decimals error.");
    Utils.assert(paramObj.version !== undefined && paramObj.version.length > 0, "Param obj has no version.");
    Utils.assert(paramObj.supply !== undefined && Utils.int64Compare(paramObj.supply, "0") >= 0, "Param obj supply error.");
    paramObj.protocol = ZTP_PROTOCOL;
    paramObj.issuer = Chain.msg.sender;
    Chain.store(CONTRACT_PRE, JSON.stringify(paramObj));
    // Contract deployer can mint total supply and own it all
    // Chain.store(Chain.msg.sender, paramObj.supply);
    Chain.tlog("Transfer", "0x", Chain.msg.sender, paramObj.supply);
}
`
}