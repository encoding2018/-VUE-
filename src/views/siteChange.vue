<template>
	<div class="content site">
		<div class="inputBox">
			<input @input="_judge" type="text" placeholder="请输入姓名" v-model="siteData.name">
		</div>
		<div class="inputBox">
			<input @input="_judge" type="text" placeholder="手机号" v-model="siteData.phone">
			<input @input="_judge" type="text" placeholder="区号(可选)" v-model="siteData.areaCode">
			<input @input="_judge" type="text" placeholder="固定电话(可选)" v-model="siteData.fixedLinePhone">
		</div>
		<div class="siteBox">
			<siteBox type="text" :province="siteDefault.province" :city="siteDefault.city" :area="siteDefault.dist" @selected="_onSelected"/>
		</div>
		<div class="inputBox">
			<input @input="_judge" placeholder="详细地址，如街道名称，楼层，门牌号码等" v-model="siteData.detailedSite">
		</div>
		<div class="default">
			<span @click=" defaultBtnState = !defaultBtnState">
				<img src="../assets/img/icon/icon_check.png" alt="" v-if="defaultBtnState">
			</span>
			<span>设为默认地址</span>
		</div>
		<div class="saveBtn">
			<Btn title="保存" :fn="_save" size="big" :state="saveBtnState"/>
		</div>
		<div class="removeBtn" v-if="isEdit">
			<Btn title="删除" :fn="_remove" size="big" color="red" :state="true"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import siteBox from 'v-distpicker';
        import Btn from '../components/public/button'
        import api from '../utils/api';
        import {createNamespacedHelpers} from 'vuex';

        const {mapState, mapMutations} = createNamespacedHelpers('site');

        export default {
                components: {siteBox, Btn},
                data(){
                        return {
                                saveBtnState: false,
                                defaultBtnState: true,
                                siteData: {
                                        name: '',
                                        phone: '',
                                        areaCode: '',
                                        fixedLinePhone: '',
                                        detailedSite: '',
                                        province: '',
                                        city: '',
                                        dist: '',
                                },
                                siteDefault: {
                                        province: '',
                                        city: '',
                                        dist: '',
                                },
                        }
                },
                computed: {
                        ...mapState(['isEdit', 'EditId'])
                },
                methods: {
                        _dataRefresh(){ //重置地址页数据
                                if(!this.isEdit) return;
                                let obj = this.siteData;
                                for(let i in obj){
                                        if(typeof obj[i] === 'object')
                                                for(let j in obj[i]){obj[i][j] = '';}
                                        else
                                                this.siteData[i] = ''
                                }
                                for(let i in this.siteDefault){
                                        this.siteDefault[i] = '';
                                }
                        },
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text', 'Back'], NavTextContent: '添加地址'});
                        },
                        _setFooterMenuState(payload){ //设置脚部
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        _onSelected(data){ //set 选中的地址
                                this.siteData.province = data.province.value;
                                this.siteData.city = data.city.value;
                                this.siteData.dist = data.area.value;
                        },
                        _getSite(){ // 获取要修改的地址
                                if(!this.isEdit) return;
                                this.$http.post(api.site.CHANGE, {act: 'get', id: this.EditId})
                                        .then(result => {
                                                this.siteData = result;
                                                for(let i in this.siteDefault){this.siteDefault[i] = result[i];}
                                                this._judge();
                                        });
                        },
                        _judge(){ //判断 地址存储是否合规
                                this.saveBtnState = false;
                                let reg = /(?:^1[3456789]|^9[28])\d{9}$/,{name,phone,detailedSite,city,dist,province}=this.siteData;
                                let msg=(t)=>{this.msg=t};
                                if(name.length < 1){msg('名字不能为空');return}
                                if(!reg.test(phone)){msg('手机号输入错误');return}
                                if(detailedSite.length <= 6){msg('详细地址不能少于6位');return}
                                if(!city || !dist || !province){msg('请选择地区');return}
                                this.saveBtnState = true;
                        },
                        _stateFun(state){ //辅助方法 成功后执行弹窗
                                if(!state) return;
                                this.$alert.info('操作成功');
                                this.$router.replace({path: '/site'});
                        },
	                _onSiteInit(){ //保存或修改地址后打开地址信息初始化开关
                                this.$store.commit('site/changeInitState',true);
	                },
                        _save(){ //保存及编辑地址
                                this._onSiteInit();
                                if(!this.saveBtnState){this.$alert.info(this.msg);return;}
                                if(this.isEdit)
                                        this.$http.post(api.site.CHANGE, {act: 'change', data: this.siteData})
                                                .then(({ok}) => this._stateFun(ok));
                                else
                                        this.$http.post(api.site.ADD, this.siteData)
                                                .then(({ok}) => this._stateFun(ok));
                        },
                        _remove(){ //删除地址
                                this._onSiteInit();
                                this.$http.post(api.site.CHANGE, {act: 'remove', id: this.EditId})
                                        .then(({ok}) => this._stateFun(ok));
                        },
                },
                activated(){
                        this._getSite();
                        this._setIndexNavBtnState();
                        this._setFooterMenuState();
                },
                deactivated(){
                        this._setFooterMenuState(true);
                        this._dataRefresh();
                        this.$store.commit('site/changeIsSelectEdit',false);
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.content.site
		padding 0.3rem 0.3rem 0
		background rgb(226, 226, 226)

		.inputBox
			border-radius 0.15rem
			border 0.01rem solid rgba(0, 0, 0, 0.1)
			display flex
			flex-direction column
			overflow hidden
			margin-bottom 0.2rem

			input
				border 0
				padding 0.3rem
				font-size 0.26rem
				outline none
			input:

			:-webkit-input-placeholder
				color rgba(127, 127, 127, .8)

		.siteBox
			border-radius 0.15rem
			overflow hidden
			margin-bottom 0.2rem
			box-shadow inset 0 0.03rem 0.05rem -0.04rem rgba(0, 0, 0, .4), inset -0.05rem 0 0.03rem -0.02rem rgba(0, 0, 0, .1), 0.05rem 0 0 hsla(0, 0%, 100%, .1)

			.distpicker-address-wrapper
				width 100%

				select
					padding 0.2rem 0.3rem
					font-size 0.3rem
					width 100%
					outline none
					height 1rem
					border 0
					border-radius 0
					border-bottom 0.01rem solid rgba(100, 100, 100, 0.2)

				option
					color black
					outline none
					font-size 0.2rem

		.default
			display flex
			padding 0.2rem
			color #686868
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

		.saveBtn
			margin 0.2rem 0 0.2rem 0

</style>