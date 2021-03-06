cc.Class({
    "extends": cc.Component,

    properties: {
        nums: {
            "default": [],
            type: [cc.Label]
        },
        _inputIndex: 0
    },

    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    // use this for initialization
    onLoad: function onLoad() {},

    onEnable: function onEnable() {
        this.onResetClicked();
    },

    onInputFinished: function onInputFinished(roomId) {
        cc.vv.userMgr.enterRoom(roomId, (function (ret) {
            if (ret.errcode == 0) {
                this.node.active = false;
            } else {
                var content = "房间[" + roomId + "]不存在，请重新输入!";
                if (ret.errcode == 4) {
                    content = "房间[" + roomId + "]已满!";
                }
                cc.vv.alert.show("提示", content);
                this.onResetClicked();
            }
        }).bind(this));
    },

    onInput: function onInput(num) {
        if (this._inputIndex >= this.nums.length) {
            return;
        }
        this.nums[this._inputIndex].string = num;
        this._inputIndex += 1;

        if (this._inputIndex == this.nums.length) {
            var roomId = this.parseRoomID();
            console.log("ok:" + roomId);
            this.onInputFinished(roomId);
        }
    },

    onN0Clicked: function onN0Clicked() {
        this.onInput(0);
    },
    onN1Clicked: function onN1Clicked() {
        this.onInput(1);
    },
    onN2Clicked: function onN2Clicked() {
        this.onInput(2);
    },
    onN3Clicked: function onN3Clicked() {
        this.onInput(3);
    },
    onN4Clicked: function onN4Clicked() {
        this.onInput(4);
    },
    onN5Clicked: function onN5Clicked() {
        this.onInput(5);
    },
    onN6Clicked: function onN6Clicked() {
        this.onInput(6);
    },
    onN7Clicked: function onN7Clicked() {
        this.onInput(7);
    },
    onN8Clicked: function onN8Clicked() {
        this.onInput(8);
    },
    onN9Clicked: function onN9Clicked() {
        this.onInput(9);
    },
    onResetClicked: function onResetClicked() {
        for (var i = 0; i < this.nums.length; ++i) {
            this.nums[i].string = "";
        }
        this._inputIndex = 0;
    },
    onDelClicked: function onDelClicked() {
        if (this._inputIndex > 0) {
            this._inputIndex -= 1;
            this.nums[this._inputIndex].string = "";
        }
    },
    onCloseClicked: function onCloseClicked() {
        this.node.active = false;
    },

    parseRoomID: function parseRoomID() {
        var str = "";
        for (var i = 0; i < this.nums.length; ++i) {
            str += this.nums[i].string;
        }
        return str;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});