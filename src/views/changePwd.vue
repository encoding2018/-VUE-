<template>
	<div class="content" v-if="isShow">
		<div class="state-1" v-if="pageState.state1">
			<div class="floor1">
				<inputBox :inputData="inputData[0][0]" :inputFn="inputFn"/>
			</div>
			<div class="floor2">
				<inputBox :inputData="inputData[0][1]" :inputFn="inputFn"/>
				<div class="authBox" ref="authBox" @click="getPictureAuthCode"></div>
			</div>
			<btnBox title="下一步" :fn="verifyPhoneCode" size="big" :state="state1nextBtnState"/>
		</div>
		<div class="state-2" v-if="pageState.state2">
			<div class="floor1">
				<inputBox :inputData="[{value:curPhoneCode}]" :inputFn="inputFn"/>
			</div>
			<div class="floor2">
				<inputBox :inputData="inputData[1]" :inputFn="inputFn"/>
				<btnBox :title="getAuthCodeBtnText" :fn="getMsgCode" color="white" :state="true"/>
			</div>
			<btnBox title="下一步" :fn="authenticationNext" size="big" :state="state2nextBtnState"/>
		</div>
		<div class="state-3" v-if="pageState.state3">
			<div class="floor1">
				<inputBox :inputData="[{value:curPhoneCode}]" :inputFn="inputFn"/>
			</div>
			<div class="floor2">
				<inputBox :inputData="inputData[2][0]" :inputFn="inputFn"/>
			</div>
			<div class="floor3">
				<inputBox :inputData="inputData[2][1]" :inputFn="inputFn"/>
			</div>
			<btnBox title="确认修改" :fn="changePwdBtn" size="big" :state="state3nextBtnState"/>
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
                                        [[{placeholder: '手机号'}], [{placeholder: '验证码'}]],
                                        [{placeholder: '手机验证码'}],
                                        [[{placeholder: '新密码',type:'password'}], [{placeholder: '重复密码',type:'password'}]]
                                ],
                                isShow:true,
                                pageState: {
                                        state1: true,
                                        state2: false,
                                        state3: false,
                                },
                                phoneCode: '17705301996',
                                pictureAuthCodeText: '',
                                pictureAuthCode: '',
	                        authCode:'',
	                        password:'',
	                        RPassword:'',
                                getAuthCodeBtnText: '获取验证码',
                                getAuthCodeBtnState:true,
                                state1nextBtnState: false,
                                state2nextBtnState: false,
                                state3nextBtnState:false,
                        }
                },
                computed: {
                        curPhoneCode(){
                                return `${this.phoneCode.slice(0, 4)}****${this.phoneCode.slice(7, 11)}`
                        }
                },
                methods: {
                        _setIndexNavBtnState(payload){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text'], NavTextContent: payload});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        inputFn(sign, e){ //获取子组件的值
                                let reg = /(?:^1[3456789]|^9[28])\d{9}$/;
                                this.state1nextBtnState = false;
                                switch(sign){
                                        case '手机号':this.phoneCode = e.target.value;break;
                                        case '验证码':this.pictureAuthCode = e.target.value;break;
	                                case '手机验证码':this.authCode = e.target.value;break;
                                        case '新密码':this.password = e.target.value;break;
                                        case '重复密码':this.RPassword = e.target.value;break;
                                }
                                if(reg.test(this.phoneCode) && this.pictureAuthCode.length !== 0) this.state1nextBtnState = true;
                                this.state2nextBtnState = this.authCode.length!==0;
                                this.state3nextBtnState = this.password.length>=5&&this.password===this.RPassword;
                        },
                        getPictureAuthCode(){ // 从服务器获取图片验证码
                                if(!this.pageState.state1) return;
                                this.$http.post(api.user.CHANGEPWD, {act: 'pictureAuth'})
                                        .then(({text, data}) => {
                                                this.pictureAuthCodeText = text;
                                                this.$refs.authBox.innerHTML = data;
                                                this.$refs.authBox.children[0].style.width = '100%';
                                                this.$refs.authBox.children[0].style.height = '100%';
                                        })
                        },
                        verifyPhoneCode(){ // 初始验证判断用户输入
                                let {state1nextBtnState,pictureAuthCode,pictureAuthCodeText,phoneCode} = this;
                                if(!state1nextBtnState){
                                        this.$alert.info('手机号不正确或验证码为空');
                                        return
                                }
                                if(pictureAuthCode !== pictureAuthCodeText){
                                        this.getPictureAuthCode();
                                        this.$alert.info('验证码错误');
                                        return
                                }
                                this.$http.post(api.user.CHANGEPWD, {act: 'initialVerifyUser', phoneCode, pictureAuthCode})
                                        .then(result => {
                                                if(result.ok){
                                                        this.pageState.state1 = false;
                                                        this.pageState.state2 = true;
                                                        this._setIndexNavBtnState('安全验证')
                                                }
                                                else{
                                                        this.$alert.info(result.msg);
                                                        this.getPictureAuthCode()
                                                }
                                        })

                        },
                        getMsgCode(){ // 身份验证获取手机验证码
                                if(!this.getAuthCodeBtnState) return;
                                this.$http.post(api.user.CHANGEPWD, {act: 'noteAuth', phoneCode: this.phoneCode})
                                        .then(result => {
                                                if(result.ok){
                                                        this.$alert.info(`验证码为:${result.Code}`);
                                                        this.getAuthCodeBtnState=false;
                                                        let time = 60;
                                                        let timer = setInterval(() => {
                                                                time--;
                                                                this.getAuthCodeBtnText = `再次获取(${time})`;
                                                                if(time === 0){
                                                                        clearInterval(timer);
                                                                        this.getAuthCodeBtnText = `获取验证码`;
                                                                        this.getAuthCodeBtnState=true;
                                                                }
                                                        }, 1000)
                                                }
                                        })
                        },
                        authenticationNext(){ // 判断输入 正确跳转到修改密码操作
                                if(!this.state2nextBtnState){this.$alert.info('验证码不能为空');return}
                                this.$http.post(api.user.CHANGEPWD,{act:'judgeAuth',authCode:this.authCode,phoneCode:this.phoneCode})
	                                .then(result=>{
	                                        if(result.ok){
	                                                this.pageState.state2=false;
	                                                this.pageState.state3=true;
                                                        this._setIndexNavBtnState('修改密码');
	                                        }else{
	                                                this.$alert.info(result.msg);
	                                        }
	                                })
                        },
                        changePwdBtn(){ // 更改密码
                                if(this.password.length<=5){this.$alert.info('新密码最少6位');return}
                                if(this.password!==this.RPassword){this.$alert.info('两次密码不相同');return}
                                this.$http.post(api.user.CHANGEPWD,{act:'changePwd',phoneCode:this.phoneCode,pwd:this.password})
	                                .then(result=>{
	                                        if(result.ok){
	                                                this.$alert.info('修改成功即将跳转至登录页');
	                                                this.$store.commit('openAllInit');              //打开初始化开关
	                                                setTimeout(()=>{
	                                                        this.$router.push({path:'/user/login'});
	                                                },2000)
	                                        }else{
                                                        this.$alert.info(result.msg);
	                                        }
	                                });
                        },
	                refreshState(){ // 组件状态初始化
                                this.pageState.state1=true;
                                this.pageState.state2=false;
                                this.pageState.state3=false;
                                this.isShow = false;
                        }
                },
                activated(){
                        this.getPictureAuthCode(); //获取图片验证码
                        this._setIndexNavBtnState('找回密码');
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
	.content
		padding 0.3rem
		background rgb(226, 226, 226)

		.state-1
			& > *
				margin-bottom 0.15rem

			.floor2
				display flex
				justify-content space-between

				& > *
					flex-basis 0

				.inputContent
					flex-grow 0.6

				.authBox
					flex-grow 0.35
					border-radius 0.15rem
					border 0.01rem solid rgba(0, 0, 0, 0.2)

		.state-2
			& > *
				margin-bottom 0.15rem

			.floor2
				display flex
				justify-content space-between

				& > *
					flex-basis 0

				.inputContent
					flex-grow 0.6

				.button
					height 1rem
					flex-grow 0.35
		.state-3
			&>*
				margin-bottom 0.15rem
</style>