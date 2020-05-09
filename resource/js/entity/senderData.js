function ChatMessageVo() {

    //消息类型
    let messageType;

    //辅助消息类型字段
    let subsidiaryType;

    //房间id
    let roomId;

    //发送人id
    let senderId;

    //发送人昵称
    let senderNike;

    //接收人id
    let receiverId;

    //区域，用于在房间内创建某种区域，前端默认是两种区域，一个是游戏区域，另外一个是 广场区域，如果是自定义就按照自定义来区分
    //当前前端默认的几个区域：剧情 广场 私聊 （群聊之下，群聊按 messageType划分后 按自定义区域划分）
    let region;

    //容器
    let content;

    //消息气泡风格,一般用于给 普通的聊天消息附带气泡，由前端自己约定好
    let style;

}


