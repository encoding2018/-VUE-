<template>
	<div class="content" v-if="isShow">
		<div class="floor1">
			<inputBox :inputData="inputData[0]" :inputFn="inputFn"/>
		</div>
		<div class="floor2">
			<inputBox :inputData="inputData[1]" :inputFn="inputFn"/>
			<btnBox :title="getAuthCodeBtnText" :fn="getMsgCode" color="white" :state="true"/>
		</div>
		<div class="floor3">
			<inputBox :inputData="inputData[2]" :inputFn="inputFn"/>
		</div>
		<div class="floor4" v-if="inputShow">
			<inputBox :inputData="inputData[3]" :inputFn="inputFn"/>
		</div>
		<div class="autoLogin">
			<span @click=" signUpBtnState(true)">
				<img src="../assets/img/icon/icon_check.png" alt="" v-if="autoBtnState">
			</span>
			<span>我已阅读并同意遵守</span>
			<router-link to="#">法律声明</router-link>
			<span>和</span>
			<router-link to="#">隐私条款</router-link>
		</div>
		<btnBox title="注册" :fn="signUp" size="big" :state="btnState"/>
		<div class="loginBtn">
			<span>如果您已拥有 Smartisan ID，则可在此</span>
			<router-link to="/user/login">
				登录
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import inputBox from '../components/login/input_box';
        import btnBox from '../components/public/button';
        import api from '../utils/api';

        export default {
                components: {inputBox, btnBox},
                data(){
                        return {
                                inputData: [
                                        [{placeholder: '手机号'}],
                                        [{placeholder: '短信验证码'}],
                                        [{placeholder: '请输入密码',type:'password'}],
                                        [{placeholder: '重复密码',type:'password'}]
                                ],
	                        isShow:true,
                                inputShow: true,
                                autoBtnState: true,
	                        btnState:false,
	                        input:{
                                        phoneCode:'',
		                        msgCode:'',
		                        password:'',
		                        RPassword:''
	                        },
	                        getAuthCodeBtnState:false,
                                getAuthCodeBtnText:'获取验证码',
	                        signUpErrorMsg:'请输入正确的手机号',
                        }
                },
                computed: {},
                methods: {
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text'], NavTextContent: '注册 Smartisan ID'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        inputFn(sign,e){
                                if(sign&&e){
                                        switch(sign){
                                                case '手机号':
                                                        this.input.phoneCode = e.target.value;
                                                        break;
                                                case '短信验证码':
                                                        this.input.msgCode = e.target.value;
                                                        break;
                                                case '请输入密码':
                                                        this.input.password = e.target.value;
                                                        break;
                                                case '重复密码':
                                                        this.input.RPassword = e.target.value;
                                                        break;
                                        }
                                }
                                this.signUpBtnState(false);
                        },
	                signUpBtnState(state){ // 判断用户输入
                                let reg = /(?:^1[3456789]|^9[28])\d{9}$/,
	                                {autoBtnState,input:{password,RPassword,phoneCode}}=this,
                                        msg= (m)=>{ this.signUpErrorMsg = m };                                //更改错误信息 函数
                                if(state)this.autoBtnState = !this.autoBtnState;                                //自动登录按钮
                                this.btnState =false;                                                                         //将登录按钮重置
                                this.getAuthCodeBtnState=false;                                                     //将获取验证码按钮重置
		                if(!reg.test(phoneCode)){msg('请输入正确的手机号');return}           //检测手机号
                                this.getAuthCodeBtnState=true;                                                     //手机号正确打开获取验证码按钮
		                if(password.length<=5){msg('密码小于6位');return}                        //密码不能低于6位
                                if(password !== RPassword){msg('两次密码输入不相同');return}     //检测两次密码是否相同
                                if(!autoBtnState){msg('请阅读法律声明和隐私条款');return}            //检测同意条款按钮
                                this.btnState =true;                                                                          //所有检测通过打开注册按钮
	                },
                        getMsgCode(){
                                if(!this.getAuthCodeBtnState) {this.$alert.info(this.signUpErrorMsg); return}
                                this.$http.post(api.user.SIGNUP,{act:'acthCode',phoneCode:this.input.phoneCode})
                                        .then(result=>{
                                                if(result.ok){
                                                        this.$alert.info(`验证码为:${result.msg}`);
                                                        this.getAuthCodeBtnState=false;
                                                        let time = 60;
                                                        let timer = setInterval(()=>{
                                                                time--;
                                                                this.getAuthCodeBtnText = `再次获取(${time})`;
                                                                if(time === 0){
                                                                        clearInterval(timer);
                                                                        this.getAuthCodeBtnText = `获取验证码`;
                                                                        this.getAuthCodeBtnState = true;
                                                                }
                                                        },1000)
                                                }else  this.$alert.info(result.msg);
                                        })
                        },
                        signUp(){
                                if(!this.btnState) {this.$alert.info(this.signUpErrorMsg); return} //按钮未激活 弹出信息
                                this.$http.post(api.user.SIGNUP,{act:'signup',...this.input})
	                                .then(result=>{
                                        if(result.ok){
                                                this.$router.push({path:'/'});                              //注册成功自动登录
                                                this.$store.commit('openAllInit');
                                                this.$alert.info('注册成功');
                                        }                                                                                //打开所有初始化开关
                                        else this.$alert.info(result.msg);                                //弹出失败消息
                                        })

                        },
	                refreshState(){
                                for(let i in this.input){this.input[i] = ''}
                                this.isShow = false;
                        }
                },
                activated(){
                        this._setIndexNavBtnState();
                        this._setFooterMenuState(false);
                        this.isShow = true;
                },
                mounted(){

                },
                updated(){

                },
                deactivated(){
                        this._setFooterMenuState(true);
                        this.refreshState();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.v-enter , .v-leave {
		opacity: 0;
		transition: opacity 1s;
	}

	.v-enter-to, .v-leave-to{
		opacity: 1;
	}

	.content
		background rgb(226, 226, 226)
		padding 0.3rem

		& > div
			margin-bottom 0.15rem

		.floor2
			display flex
			justify-content space-between

			.button
				height 1rem
				width 2.2rem

		.autoLogin
			margin 0.3rem 0
			display flex
			font-size 0.26rem
			color rgb(153,153,153)
			justify-content center
			span:first-child
				height 0.35rem
				width 0.35rem
				display flex
				border 0.02rem solid rgba(0, 0, 0, 0.2)
				border-radius 100%
				justify-content center
				align-items center
				margin-right 0.2rem

				img
					width 100%
		.loginBtn
			margin-top 0.5rem
			text-align center
			color rgb(153,153,153)


</style>