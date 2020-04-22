/**
 * 这些数据绝大部分都是 需要用到的时候，会进行一次服务器读取，判断为null时进行数据载入
 */

//存储用户需要用到的 用户数据
window.allMemberInfoMap = {};

//长连接
window.socket;

//当前用户的信息
window.myUserInfo;

//房间信息
window.allRoomInfoMap = {};

//用户加入的房间信息
window.allJoinRoomInfoMap = {};

//角色卡信息 ,以Id进行唯一识别对应
window.allRoleInfoMap = {};

//从链接后接收到的信息
window.allChatMessageRecord = {};

//房间与用户和角色卡关系
window.allRelaiton = {};



