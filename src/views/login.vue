<template>
	<div class="content" v-if="isShow">
		<div>
			<inputBox :inputData="inputData" :inputFn="inputFn"/>
		</div>
		<div class="btnBox">
			<div class="autoLogin">
				<span @click="autoBtnState = !autoBtnState">
					<img src="../assets/img/icon/icon_check.png" alt="" v-if="autoBtnState">
				</span>
				<span>自动登录</span>
			</div>
			<div class="singUp">
				<router-link to="/user/register">
					<span>注册</span>
				</router-link>
				<router-link to="/user/change">
					<span>忘记密码</span>
				</router-link>
			</div>
		</div>
		<div :class="">
			<btnBox title="登录" :fn="login" size="big" :state="btnState"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import inputBox from '../components/login/input_box';
        import btnBox from '../components/public/button';
        import api from '../utils/api';

        export default {
                name:'login',
                components: {inputBox, btnBox},
                data(){
                        return {
                                inputData: [
                                        {placeholder: '手机号/邮箱', fn: ''},
                                        {placeholder: '密码', fn: '', type: 'password'}
                                ],
                                autoBtnState: true,
                                password: '',
                                username: '',
                                btnState: false,
	                        isShow:false,
                        }
                },
                computed: {},
                methods: {
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text'], NavTextContent: '登陆官网'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        login(){
                                let {username,password} = this;
                                if(!this.btnState){this.$alert.info('请输入正确的手机号');return;}
                                if(password.length <= 5){this.$alter.info('密码不能为空且最少6位');return;}
                                this.$http.post(api.user.LOGIN, {username, password})
                                        .then(result => {
                                                if(result.ok){
                                                        this.$alert.info('登陆成功');
                                                        this.$store.commit('openAllInit');              //登陆成功打开所有初始化开关
                                                        this.$router.replace('/user');
                                                        this.$store.commit('_changeLoginState',{state:true,username});
                                                }else{
                                                        this.$alert.info(result.msg);
                                                }
                                        });
                        },
                        inputFn(sign, e){
                                let reg = /(?:^1[3456789]|^9[28])\d{9}$/;
                                switch(sign){
                                        case '手机号/邮箱':
                                                this.username = e.target.value;
                                                break;
                                        case '密码':
                                                this.password = e.target.value;
                                                break;
                                }
                                this.btnState = reg.test(this.username)&&this.password.length >= 6;
                        },
                },
                activated(){
                        this._setIndexNavBtnState();
                        this._setFooterMenuState();
                        this.isShow = true;
                        this.username = '';
                        this.password = ''
                },
                mounted(){

                },
                updated(){

                },
                deactivated(){
                        this._setFooterMenuState(true);
                        this.isShow = false;
                        this.btnState = false;
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		background rgb(226, 226, 226)
		padding 0.3rem

	.btnBox
		display flex
		justify-content space-between
		padding 0.2rem

		.autoLogin
			display flex
			font-size 0.26rem

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

			span:last-child
				color rgb(127, 127, 127)

		.singUp
			display flex
			align-items center
			justify-content center

			span
				color rgb(127, 127, 127)
				margin-left 0.2rem

</style>