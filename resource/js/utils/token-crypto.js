(function (w) {

    let encryption = {};
    let _ENCRYPT_KEY = "1q2w3e4r5t6y7u8i";

    encryption.tokenCreate = function () {
        //获取当前的操作页面设备情况 作为解密密钥
        let device = layui.device();

        let base64 = new Base64();
        let decode;
        //将设备信息转为64 的 16位KEY
        device = base64.encode(JSON.stringify(device)).substring(0,16);

        //从本地中读取数据
        let token = layui.data('login').token;
        if (token == null) return null;

        //解密工作
        try{
            decode  = JSON.parse(decrypt(token, device));
        }catch (e) {
            //解码过程出错，清理掉存储的数据结构
            layui.data("login",null);
            return;
        }

        let content = {
            "initTime": (new Date()).getTime() ,
            "expirationTime": (new Date()).getTime() + 1000 * 60 * 5,
            "key": decode.key
        };

        //加密工作
        return encrypt(JSON.stringify(content), _ENCRYPT_KEY);
    };

    encryption.tokenSave = function (token) {
        let device = layui.device();
        let base64 = new Base64();
        device = base64.encode(JSON.stringify(device)).substring(0,16);
        //解码从服务器传来的数据
        let decode = decrypt(token, _ENCRYPT_KEY);
        if (decode == null || decode === undefined) return;

        let encode = encrypt(decode, device);
        layui.data('login', {
            key: 'token',
            value: encode
        });
    };


    /*****************************************************
     * AES加密
     * @param content 加密内容
     * @param key 加密密码，由字母或数字组成
     　　　　　　此方法使用AES-128-ECB加密模式，key需要为16位
     　　　　　　加密解密key必须相同，如：abcd1234abcd1234
     * @return 加密密文Pkcs7
     ****************************************************/

    let encrypt = function (content, key) {
        let sKey = CryptoJS.enc.Utf8.parse(key);
        let sContent = CryptoJS.enc.Utf8.parse(content);
        let encrypted = CryptoJS.AES.encrypt(sContent, sKey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    };

    /*****************************************************
     * AES解密
     * @param content 加密密文
     * @param key 加密密码，由字母或数字组成
     　　　　　　此方法使用AES-128-ECB加密模式，key需要为16位
     　　　　　　加密解密key必须相同，如：abcd1234abcd1234
     * @return 解密明文
     ****************************************************/

    let decrypt = function (content, key) {
        let sKey = CryptoJS.enc.Utf8.parse(key);
        let decrypt = CryptoJS.AES.decrypt(content, sKey, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    };

    w.encryption = encryption;

})(window);
