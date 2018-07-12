<template lang="html">
    <div class="key-box">
        <ul class="key-board" @click="getKey($event)">
            <li>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </li>
            <li>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </li>
            <li>
                <div>7</div>
                <div>8</div>
                <div>9</div>
            </li>
            <li>
                <div class="grey-key"></div>
                <div>0</div>
                <div class="grey-key iconfont icon-delete" @click="deleteKey()"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tradePwd: '',
                pwdIndex: 0
            };
        },
        props:{
            reset: Boolean,
        },
        watch:{
            reset(val){
                if(val){
                    console.log('reset',val);
                    this.tradePwd = '';
                    this.pwdIndex = 0;
                }
            }
        },
        methods:{
            getKey(e){
                let target = e.target;
                let n = target.innerText;
                target.className = 'active';
                setTimeout(()=>{
                    target.className = '';
                },100);
                let pwdLength = this.tradePwd.length;
                if(pwdLength < 6){
                    this.tradePwd += n;
                    this.pwdIndex ++;
                    this.$emit('inputIndex',this.pwdIndex);
                    if(this.tradePwd.length == 6){
                        setTimeout(()=>{
                            this.$emit('pwdCompleted',this.tradePwd);
                        },1000);
                    }
                }
            },
            deleteKey(){
                event.stopPropagation();
                let el = event.target;
                el.className += ' active';
                setTimeout(()=>{
                    el.className = el.className.replace(' active','');
                },100);
                let tradePwdlength = this.tradePwd.length;
                if(tradePwdlength > 0){
                    this.tradePwd = this.tradePwd.substring(0,tradePwdlength-1);
                    this.pwdIndex --;
                }
                this.$emit('inputIndex',this.pwdIndex);
            }
        }
    };
</script>

<style lang="css">
    .key-box{
        background: #fff;
        position: relative;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .key-box    .key-board
            li{
                display: flex;
                border-top: 1px solid #888;
            }
        .key-box    .key-board li  div{
                    flex: 1;
                    text-align: center;
                    width: 33.33%;
                    line-height: 55px;
                    font-size: 35px;
        }
                    .key-box    .key-board li  div:nth-child(2){
                        width: 32%;
                        border-right: 1px solid #888;
                        border-left: 1px solid #888;
                    }
                    .key-box    .key-board li  div .grey-key {
                        background: #ddd;
                        color: #888;
                        font-size: 30px;
                    }
                        .key-box    .key-board li  div .grey-key .active{
                            background: #fff;
                            color: #000;
                        }
                    
                    .key-box    .key-board li  div .active{
                        background: #888;
                        color: #fff;
                    }
                
    
    </style>