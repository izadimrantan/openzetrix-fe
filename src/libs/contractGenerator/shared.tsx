export function initCodeGenerator(ztpContractInfo: ZtpContractInfo): string {
    let initCode = `
function init() {
    let paramObj;`

    // ZTP20 or ZTP1155
    if ('decimals' in ztpContractInfo && ztpContractInfo.decimals !== undefined) {
        initCode += `
    paramObj.name = "${ztpContractInfo.name}";`
        initCode += `
    paramObj.symbol = "${ztpContractInfo.symbol}";`
        initCode += `
    paramObj.describe = "${ztpContractInfo.description}";`
        initCode += `
    paramObj.decimals = "${ztpContractInfo.decimals}";`
        initCode += `
    paramObj.version = "${ztpContractInfo.version}";`
        initCode += `
    paramObj.protocol = ZTP_PROTOCOL;`
        initCode += `
    Chain.store(CONTRACT_PRE, JSON.stringify(paramObj));`
        initCode += `
}
`
    } else { // ZTP721
        initCode += `
    paramObj.name = "${ztpContractInfo.name}";`
        initCode += `
    paramObj.symbol = "${ztpContractInfo.symbol}";`
        initCode += `
    paramObj.describe = "${ztpContractInfo.description}";`
        initCode += `
    paramObj.version = "${ztpContractInfo.version}";`
        initCode += `
    paramObj.protocol = ZTP_PROTOCOL;`
        initCode += `
    Chain.store(CONTRACT_PRE, JSON.stringify(paramObj));`
        initCode += `
}
`
    }

    return initCode
}

export function mainCodeGenerator(ztpMainFunctionList: SmartContractCode[]): string {
    let funcList = `
function main(input_str) {
    let funcList = {`
    for (let i = 0; i < ztpMainFunctionList.length; i++) {
        if (i !== (ztpMainFunctionList.length - 1)) {
            funcList += `
        '${ztpMainFunctionList[i].name}': ${ztpMainFunctionList[i].name},`
        } else {
            funcList += `
        '${ztpMainFunctionList[i].name}': ${ztpMainFunctionList[i].name}`
        }
    }

    funcList += `
    };
    let inputObj = JSON.parse(input_str);
    Utils.assert(funcList.hasOwnProperty(inputObj.method) && typeof funcList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
    funcList[inputObj.method](inputObj.params);
}
    `
    return funcList
}

export function queryCodeGenerator(ztpQueryFunctionList: SmartContractCode[]): string {
    let queryList = `
function query(input_str) {
    let queryList = {`
    for (let i = 0; i < ztpQueryFunctionList.length; i++) {
        if (i !== (ztpQueryFunctionList.length - 1)) {
            queryList += `
        '${ztpQueryFunctionList[i].name}': ${ztpQueryFunctionList[i].name},`
        } else {
            queryList += `
        '${ztpQueryFunctionList[i].name}': ${ztpQueryFunctionList[i].name}`
        }
    }

    queryList += `
    };
    let inputObj = JSON.parse(input_str);
    Utils.assert(queryList.hasOwnProperty(inputObj.method) && typeof queryList[inputObj.method] === "function", "Cannot find func:" + inputObj.method);
    return JSON.stringify(queryList[inputObj.method](inputObj.params));
}
    `
    return queryList
}
