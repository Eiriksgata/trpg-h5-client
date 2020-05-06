let Config = {};
//特殊的进制位数转换
Config.CODERULE26 = "abcdefghijklmnopqrstuvwxyz";
Config.CODERULE52 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Config.CODERULE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
Config.CODERULE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

//10转任意
function hexadecimalConversion(divisible, hexadecimal, letter) {
    let out = "";
    let remainder = 0;

    while (true) {
        remainder = divisible % hexadecimal;
        out = letter.charAt(remainder) + out;
        if (divisible > hexadecimal - 1) {
            divisible = Math.floor(divisible / hexadecimal);
        } else {
            break;
        }
    }
    return out;
}

//任意转10
function hexadecimalReversal(inputString, hexadecimal, letter) {
    let remainder = 0;
    let i = 0,
        j = 0,
        sum = 0;
    while (true) {
        if (inputString.charAt(i) === letter.charAt(j)) {
            sum = sum + j * parseInt(Math.pow(hexadecimal, inputString.length - (i + 1)));
            i++;
            j = 0;
        } else {
            j++;
        }
        if (i > inputString.length) {
            break;
        }
    }

    return sum;
}

//进制字符选择
function charSelect(value) {
    let result = "";
    if (value === 26) {
        result = Config.CODERULE26
    }
    if (value <= 62 && value !== 32 && value !== 52) {
        result = Config.CODERULE62;
    }
    if (value === 52) {
        result = Config.CODERULE52;
    }
    if (value === 64) {
        result = Config.CODERULE64;
    }
    return result;
}