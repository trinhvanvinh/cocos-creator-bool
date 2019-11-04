// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       jumpHeight: 0,
       jumpDuration: 0,
       maxMoveSpeed: 0,
       accel: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        
        this.accel=false;
        this.accRight=false;

        this.xSpeed = 0;

        this.setInputControl();
    },

    setJumpAction: function(){
        var deltaPos = cc.p(0,this.jumpHeight);
        var easeObj = cc.easeCubicActionOut();
        var jumUp= cc.moveBy(this.jumpDuration, deltaPos).easing(easeObj);

        deltaPos = cc.p(0, -this.jumpHeight);
        easeObj = cc.easeCubicActionIn();
        var jumpDown = cc.moveBy(this.jumpDuration, deltaPos).easing(easeObj);

        var action = cc.sequence(jumUp, jumpDown);
        return cc.repeatForever(action);
    },

    setInputControl:function(){
        var self = this;

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a:
                        self.accLeft=true;
                        self.accRight=false;
                        break;
                    case cc.KEY.d:
                        self.accLeft=false;
                        self.accRight=true;
                        break;
                }
            },
            onKeyReleased:function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a:
                        self.accLeft=false;
                      
                        break;
                    case cc.KEY.d:
                        self.accRight=false;
                        
                        break;
                }
            }
        }, self.node);
    },

    start () {

    },

    update (dt) {
        if(this.accLeft){
            this.xSpeed -= this.accel*dt;
        }else if(this.accRight) {
            this.xSpeed += this.accel*dt;
        }

        if(Math.abs(this.xSpeed)> this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed/Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
    },
});
