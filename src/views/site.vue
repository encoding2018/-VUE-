<template>
	<div class="content">
		<div class="siteBar"   v-for="(item,i) in site" :key="i" @click="pitchSite(item)">
			<div class="left">
				<div class="top">
					<span>{{item.name}}</span>
					<span>{{item.phone}}</span>
					<span></span>
				</div>
				<div class="bottom">
					<span>{{item.province}}</span>
					<span>{{item.city}}</span>
					<span>{{item.dist}}</span>
					<span>{{item.detailedSite}}</span>
				</div>
			</div>
			<div class="right" @click.stop="_siteEdit(item.id)"></div>
		</div>
		<div class="btnBox">
			<btn title="添加地址"  size="big" :fn="_addSite" :state="true"/>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {createNamespacedHelpers} from 'vuex';
	import btn from '../components/public/button';
	const {mapActions,mapState,mapMutations} = createNamespacedHelpers('site');
        export default {
                components:{btn},
                data(){
                        return{

                        }
                },
	        computed:{
                        ...mapState(['site','isEdit','isSelect',"isSelectEdit"])
	        },
	        methods:{
                        ...mapActions(['getSite']),
		        ...mapMutations(['changeEditState']),
                        _setIndexNavBtnState(){ // 设置nav状态
                                this.$store.commit('template/changeBtnState', {btn: ['Text','Back'], NavTextContent: '地址列表'});
                        },
                        _setFooterMenuState(payload){
                                this.$store.commit('template/changeFooterMenu', payload);
                        },
                        _siteEdit(n){
                                this.changeEditState({state:true,EditId:n});
                                if(this.isSelect) this.$store.commit('site/changeIsSelectEdit',true);
                                this.$router.replace({path:'/site/change'});
                        },
                        _addSite(){
                                this.changeEditState({state:false,EditId:0});
                                if(this.isSelect) this.$store.commit('site/changeIsSelectEdit',true);
                                this.$router.replace({path:'/site/change'});
                        },
                        pitchSite(siteData){
                                if(!this.isSelect) return;
                                this.$store.commit('site/changeSelect',{state:false,siteId:siteData.id});
                                this.$router.replace('/order');
                        }
	        },
	        activated(){
                        this.getSite();
                        this._setIndexNavBtnState();
                        this._setFooterMenuState();
                },
	        mounted(){

	        },
	        updated(){

	        },
	        deactivated(){
                        if(!this.isSelectEdit) this.$store.commit('site/changeSelect',{state:false});
                        this._setFooterMenuState(true);
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		background rgb(228,228,228)
		.siteBar
			padding 0.2rem 0.4rem
			background #fff
			display flex
			.left
				flex-grow 1
				.top
					margin-bottom 0.2rem
					font-weight 700
					color #333
					font-size 0.3rem
				.bottom
					font-size 0.24rem
					color #666
					&>*
						margin-right 0.1rem
			.right
				width 1rem
				background url("../assets/img/icon/nextBtn.png")
				background-position center
				background-size 0.7rem
				background-repeat no-repeat
		.btnBox
			margin-top 0.2rem
			padding 0.3rem
</style>