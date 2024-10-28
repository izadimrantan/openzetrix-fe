export function initiateWalletConnection(): Promise<string> {
    console.log("Called initiateWalletConnection() function")
    return new Promise((resolve, reject) => {
        console.log("Called initiateWalletConnection() function: Entered Promise")
        if (typeof window.zetrix !== undefined) {
            console.log("Called initiateWalletConnection() function: Passed window.zetrix check")
            window.zetrix.authorize(
                { method: "changeAccounts" },
                (resp) => {
                    if (resp.code === 0) {
                        window.zetrix.authorize(
                            { method: "sendRandom", param: { random: "blob" } },
                            (resAuth) => {
                                if (resAuth.code === 0) {
                                    const { address } = resp.data;
                                    const { signData, publicKey } = resAuth.data;

                                    // Resolve the promise with the address
                                    resolve(address);
                                } else {
                                    reject(new Error("Failed:" + resAuth.message));
                                }
                            }
                        );
                    } else {
                        reject(new Error("Failed: " + resp.message));
                    }
                }
            );
        } else {
            reject(new Error("Zetrix wallet not found"));
        }
    });
}

export function shortenZetrixAddress(address: string) {
    if (!address.startsWith("ZTX")) {
        throw new Error("Invalid Zetrix address");
    }

    const firstPart = address.slice(0, 6); // 'ZTX' + first 3 characters
    const lastPart = address.slice(-4); // Last 4 characters

    return `${firstPart}***${lastPart}`;
}

export function sign(blob: string): Promise<any> {
    console.log("Called sign function");
    return new Promise((resolve, reject) => {
        console.log("Entered Promise in sign");
        if (typeof window.zetrix !== undefined) {
            window.zetrix.signMessage({ message: blob }, function (result) {
                if (result.code === 0) {
                    resolve(result.data)
                } else {
                    reject({})
                }
            });
        } else {
            reject({})
        }
    })
}
