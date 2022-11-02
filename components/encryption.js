import SimpleCrypto from "simple-crypto-js";

//Encryption key using which everything is encrypted in this assignment
const cipherKey = "EncryptionKeyUsedToEncryptTheValuesOfTokenId";
export const simpleCrypto = new SimpleCrypto(cipherKey);

//Array to store multiple code values []
export let codeValueStorage = new Array();

// counts code values in the array
let countCodeValues = codeValueStorage.length;

// adds code value into the array so that it can be checked against input code value given by the user
export function AddCodeValue(encryptedCodeValue) {
    try {
        

        if (encryptedCodeValue == NaN) {
            console.log("Cannot enter code value of a non adddressable numbers");

        }

        else {
            codeValueStorage[countCodeValues] = encryptedCodeValue;
            countCodeValues++;
        }

        console.log(`console logged codeValueStorage ${codeValueStorage}`);
        return codeValueStorage;
    }

    catch (error) {

        console.log(`Error occured in encryption js :::: ${error} <<<<`);

    }
}

