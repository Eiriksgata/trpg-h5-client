(function () {

    let database = {};
    let DBOpenRequest;

    database.allMemberInfoMapper = null;
    database.allRelationMapper = null;
    database.allRoleCardInfoMapper = null;
    database.allRoomInfoMapper = null;
    database.allPublicRecord = null;
    database.allPrivateRecord = null;

    database.dataBaseInit = function () {

        //打开数据库链接
        DBOpenRequest = window.indexedDB.open("RolePlaying");
        DBOpenRequest.onsuccess = function (e) {

            //建立数据库操作映射请求接口
            database.allMemberInfoMapper = DBOpenRequest.result.transaction(["allMemberInfo"], "readwrite").objectStore("allMemberInfo");
            database.allRelationMapper = DBOpenRequest.result.transaction(["allRelation"], "readwrite").objectStore("allRelation");
            database.allRoleCardInfoMapper = DBOpenRequest.result.transaction(["allRoleCardInfo"], "readwrite").objectStore("allRoleCardInfo");
            database.allRoomInfoMapper = DBOpenRequest.result.transaction(["allRoomInfo"], "readwrite").objectStore("allRoomInfo");
            database.allPublicRecord = DBOpenRequest.result.transaction(["allPublicRecord"], "readwrite").objectStore("allPublicRecord");
            database.allPrivateRecord = DBOpenRequest.result.transaction(["allPrivateRecord"], "readwrite").objectStore("allPrivateRecord");

        };

        DBOpenRequest.onupgradeneeded = function (e) {
            let db = e.target.result;
            createDataTable(db);

        }

    };


    database.addPublicRecord = function (record) {
        let store = dbRequest.transaction(["allPublicRecord"], "readwrite")
            .objectStore("allPublicRecord");
        store.add(record);
        store.onerror = function (event) {
            console.log("数据库添加数据失败");
        };

    };

    /**
     * 可以传入一个集合，也可以传入一个数组集合
     */
    database.addMemberInfo = function () {
        let data = arguments[0];
        if (data.length === undefined || data.length == null) {
            database.allRoomInfoMapper.put(data);
        } else {
            $.each(data, function (key, value) {
                database.allMemberInfoMapper.put(value);
            });
        }
        store.onerror = function (event) {
            console.log("数据库添加数据失败");
        }
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