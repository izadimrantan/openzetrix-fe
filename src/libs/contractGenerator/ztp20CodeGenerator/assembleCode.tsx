import { approveCode, transferCode, transferFromCode } from './individualMainFunctions';
import { allowanceCode, balanceOfCode, contractInfoCode } from './individualQueryFunctions';
import { baseCodePrefixes, utilityCode, initCode } from './baseFunctions';
import { Ztp20Options, Ztp20OptionsCodeMap } from '../ztpOptions';

const ztp20MainRecipe: SmartContractCode[] = [ 
    approveCode,
    transferCode,
    transferFromCode
]

const ztp20QueryRecipe: SmartContractCode[] = [
    allowanceCode,
    balanceOfCode,
    contractInfoCode
]



function mainCodeGenerator(ztp20MainFunctionList: SmartContractCode[]): string {
    let funcList = `
function main(input_str) {
    let funcList = {`
    for (let i = 0; i < ztp20MainFunctionList.length; i++) {
        if (i !== (ztp20MainFunctionList.length - 1)) {
            funcList += `
        '${ztp20MainFunctionList[i].name}': ${ztp20MainFunctionList[i].name},`
        } else {
            funcList += `
        '${ztp20MainFunctionList[i].name}': ${ztp20MainFunctionList[i].name}`
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

function queryCodeGenerator(ztp20QueryFunctionList: SmartContractCode[]): string {
    let queryList = `
function query(input_str) {
    let queryList = {`
    for (let i = 0; i < ztp20QueryFunctionList.length; i++) {
        if (i !== (ztp20QueryFunctionList.length - 1)) {
            queryList += `
        '${ztp20QueryFunctionList[i].name}': ${ztp20QueryFunctionList[i].name},`
        } else {
            queryList += `
        '${ztp20QueryFunctionList[i].name}': ${ztp20QueryFunctionList[i].name}`
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

export function completeZtp20CodeAssembly(ztp20Options: Ztp20Options[]): string {
    const fullMainRecipe = [...ztp20MainRecipe];
    const fullQueryRecipe = [...ztp20QueryRecipe];
    fullMainRecipe.push(...ztp20Options.filter(option => Ztp20OptionsCodeMap[option]).map(option => Ztp20OptionsCodeMap[option]));

    let ztp20Code = ""
    ztp20Code += baseCodePrefixes.code
    ztp20Code += utilityCode.code
    ztp20Code += fullMainRecipe.map(recipe => recipe.code).join('');
    ztp20Code += fullQueryRecipe.map(recipe => recipe.code).join('');
    ztp20Code += initCode.code
    ztp20Code += mainCodeGenerator(fullMainRecipe)
    ztp20Code += queryCodeGenerator(fullQueryRecipe)
    return ztp20Code
}