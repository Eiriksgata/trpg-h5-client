(function () {

    let database = {};
    let DBOpenRequest;

    database.dataBaseInit = function () {

        //打开数据库链接
        DBOpenRequest = window.indexedDB.open("RolePlaying", 1);
        DBOpenRequest.onsuccess = function (e) {
            window.DBOpenRequest = DBOpenRequest;
            openSocket();
        };

        DBOpenRequest.onupgradeneeded = function (e) {
            let db = e.target.result;
            createDataTable(db);
        }

    };


    database.addMemberInfo = function () {
        let data = arguments[0];
        let allMemberInfoMapper = DBOpenRequest.result.transaction(["allMemberInfo"], "readwrite").objectStore("allMemberInfo");
        allMemberInfoMapper.put(data);
    };

    database.addRoomInfo = function () {
        let data = arguments[0];
        let allRoomInfoMapper = DBOpenRequest.result.transaction(["allRoomInfo"], "readwrite").objectStore("allRoomInfo");
        allRoomInfoMapper.put(data);

    };

    database.addRelation = function () {
        let data = arguments[0];
        let allRelationMapper = DBOpenRequest.result.transaction(["allRelation"], "readwrite").objectStore("allRelation");
        allRelationMapper.put(data);

    };

    database.addRoleCard = function () {
        let data = arguments[0];
        let allRoleCardInfoMapper = DBOpenRequest.result.transaction(["allRoleCardInfo"], "readwrite").objectStore("allRoleCardInfo");
        allRoleCardInfoMapper.put(data);

    };

    database.addPublicRecord = function () {
        let data = arguments[0];
        let allPublicRecord = DBOpenRequest.result.transaction(["allPublicRecord"], "readwrite").objectStore("allPublicRecord");
        allPublicRecord.put(data);
    };

    database.addPrivateRecord = function () {
        let data = arguments[0];
        let allPrivateRecord = DBOpenRequest.result.transaction(["allPrivateRecord"], "readwrite").objectStore("allPrivateRecord");
        allPrivateRecord.put(data);
    };


    /**
     * 查询表格的所有数据
     * @param tableName 查询表名
     * @returns {IDBRequest} 返回一个 openCursor 的方法需要实现
     */
    database.findAll = function (tableName) {
        return DBOpenRequest.result.transaction([tableName], "readonly").objectStore(tableName).openCursor();
    };

    /**
     * 数据库索引查询
     * @param tableName 查询的表格名称
     * @param indexName 查询的索引名称，当为NULL时，是按ID查询
     * @param value 查询返回值 如果是查询id，请直接输入整形数字，不要输入字符串
     * @returns {Promise} 异步同步扁平化处理 如果是按id查询，返回的是一个查询结果数据
     * 如果查询为其他的 索引号，那么返回的是一个数组
     */
    database.findByIndexName = function (tableName, indexName, value) {
        return new Promise(function (resolve, reject) {
            let request = null;
            if (indexName == null || indexName === "id") {
                request = DBOpenRequest.result.transaction([tableName], "readonly")
                    .objectStore(tableName).get(parseInt(value));
            } else {
                request = DBOpenRequest.result.transaction([tableName], "readonly")
                    .objectStore(tableName).index(indexName).getAll(value);
            }

            request.onsuccess = function (event) {
                resolve(request.result);
            };

            request.onerror = function (event) {
                reject("查询数据库信息出错");
            }

        }).then(function (findData) {
            return findData;
        }).catch(function (e) {
            console.log(e);
        });
    };

    database.delete = function (tableName, indexName, value) {

        return new Promise(function (resolve, reject) {
            let request = null;
            if (indexName == null || indexName === "id") {
                request = DBOpenRequest.result.transaction([tableName], "readwrite")
                    .objectStore(tableName).delete(parseInt(value));
            } else {
                request = DBOpenRequest.result.transaction([tableName], "readwrite")
                    .objectStore(tableName).deleteIndex(indexName);
            }

            request.onsuccess = function (event) {
                resolve(request.result);
            };

            request.onerror = function (event) {
                reject("查询数据库信息出错");
            }

        }).then(function () {

            return true;
        }).catch(function (e) {
            console.log(e);
        });
    };


    let createDataTable = function (db) {
        let tempTable;
        if (!db.objectStoreNames.contains("allMemberInfo")) {
            tempTable = db.createObjectStore("allMemberInfo", {keyPath: "id"});
            tempTable.createIndex("nickname", "nickname", {unique: false});
            tempTable.createIndex("userIcon", "userIcon", {unique: false});
            tempTable.createIndex("intro", "intro", {unique: false});
            tempTable.createIndex("sex", "sex", {unique: false});
            tempTable.createIndex("birthday", "birthday", {unique: false});
            tempTable.createIndex("email", "email", {unique: false});
            tempTable.createIndex("mobile", "mobile", {unique: false});
            tempTable.createIndex("lastLoginDate", "lastLoginDate", {unique: false});

        }

        if (!db.objectStoreNames.contains("allRoleCardInfo")) {
            tempTable = db.createObjectStore("allRoleCardInfo", {keyPath: "id"});
            tempTable.createIndex("age", "age", {unique: false});
            tempTable.createIndex("assets", "assets", {unique: false});
            tempTable.createIndex("attribute", "attribute", {unique: false});
            tempTable.createIndex("createTime", "createTime", {unique: false});
            tempTable.createIndex("hometown", "hometown", {unique: false});
            tempTable.createIndex("img", "img", {unique: false});
            tempTable.createIndex("name", "name", {unique: false});
            tempTable.createIndex("occupation", "occupation", {unique: false});
            tempTable.createIndex("remarks", "occupation", {unique: false});
            tempTable.createIndex("residence", "occupation", {unique: false});
            tempTable.createIndex("roleStory", "occupation", {unique: false});
            tempTable.createIndex("sex", "occupation", {unique: false});
            tempTable.createIndex("takeList", "occupation", {unique: false});
            tempTable.createIndex("times", "occupation", {unique: false});
            tempTable.createIndex("weaponList", "occupation", {unique: false});

        }

        if (!db.objectStoreNames.contains("allRoleCardInfo")) {
            tempTable = db.createObjectStore("allRoleCardInfo", {keyPath: "id"});
            tempTable.createIndex("age", "age", {unique: false});
            tempTable.createIndex("assets", "assets", {unique: false});
            tempTable.createIndex("attribute", "attribute", {unique: false});
            tempTable.createIndex("createTime", "createTime", {unique: false});
            tempTable.createIndex("hometown", "hometown", {unique: false});
            tempTable.createIndex("img", "img", {unique: false});
            tempTable.createIndex("name", "name", {unique: false});
            tempTable.createIndex("occupation", "occupation", {unique: false});
            tempTable.createIndex("remarks", "occupation", {unique: false});
            tempTable.createIndex("residence", "occupation", {unique: false});
            tempTable.createIndex("roleStory", "occupation", {unique: false});
            tempTable.createIndex("sex", "occupation", {unique: false});
            tempTable.createIndex("takeList", "occupation", {unique: false});
            tempTable.createIndex("times", "occupation", {unique: false});
            tempTable.createIndex("weaponList", "occupation", {unique: false});

        }

        if (!db.objectStoreNames.contains("allRelation")) {
            tempTable = db.createObjectStore("allRelation", {keyPath: "id"});
            tempTable.createIndex("roleCardId", "roleCardId", {unique: false});
            tempTable.createIndex("roomId", "roomId", {unique: false});
            tempTable.createIndex("userId", "userId", {unique: false});
        }

        if (!db.objectStoreNames.contains("allRoomInfo")) {
            tempTable = db.createObjectStore("allRoomInfo", {keyPath: "id"});
            tempTable.createIndex("createTime", "createTime", {unique: false});
            tempTable.createIndex("createUserId", "createUserId", {unique: false});
            tempTable.createIndex("diceFace", "diceFace", {unique: false});
            tempTable.createIndex("display", "display", {unique: false});
            tempTable.createIndex("houseRules", "houseRules", {unique: false});
            tempTable.createIndex("introduce", "introduce", {unique: false});
            tempTable.createIndex("ioc", "ioc", {unique: false});
            tempTable.createIndex("name", "name", {unique: false});
            tempTable.createIndex("password", "password", {unique: false});
            tempTable.createIndex("player", "player", {unique: false});
            tempTable.createIndex("type", "type", {unique: false});
        }

        if (!db.objectStoreNames.contains("allPublicRecord")) {
            tempTable = db.createObjectStore("allPublicRecord", {keyPath: "id"});

            tempTable.createIndex("time", "time", {unique: false});
            tempTable.createIndex("message", "message", {unique: false});
            tempTable.createIndex("senderId", "senderId", {unique: false});
            tempTable.createIndex("nike", "nike", {unique: false});
            tempTable.createIndex("roomId", "roomId", {unique: false});
            tempTable.createIndex("messageType", "messageType", {unique: false});
            tempTable.createIndex("region", "region", {unique: false});
        }


        if (!db.objectStoreNames.contains("allPrivateRecord")) {
            tempTable = db.createObjectStore("allPrivateRecord", {keyPath: "id"});
            tempTable.createIndex("senderId", "senderId", {unique: false});
            tempTable.createIndex("receiverId", "receiverId", {unique: false});
            tempTable.createIndex("senderNike", "senderNike", {unique: false});
            tempTable.createIndex("receiverNike", "receiverNike", {unique: false});
            tempTable.createIndex("sendTime", "sendTime", {unique: false});
            tempTable.createIndex("roomId", "roomId", {unique: false});
            tempTable.createIndex("message", "message", {unique: false});
            tempTable.createIndex("messageType", "messageType", {unique: false});
            tempTable.createIndex("region", "region", {unique: false});
        }

    };

    database.supportCheck = function () {
        indexedDB = indexedDB || webkitIndexedDB || mozIndexedDB || null;
        if (!indexedDB) {
            alert("你的浏览器当前不支持indexedDB,有些功能将会受到影响.");
        }
    };


    window.database = database;

})();