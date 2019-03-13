<template>
	<div class="content cart bgColor-228">
		<template v-if="isShow">
			<div class="floor1" v-if="!isEdit">
				<div class="img-box"><img src="@assets/img/icon/icon_discount.png" alt=""></div>
				<div class="text-box">点击领取优惠券</div>
			</div>
			<div class="product-box" v-if="cart" ref="cartBScroll">
				<ul>
					<li class="placeholderTop" v-if="!isEdit">placeholder</li>
					<li class="product-bar" v-for="(item,i) in cart" :key="i">
						<div class="check-box" @click="changeCheckState(i)"><span>
						<img v-if="allCheckBtnState[i]" src="@assets/img/icon/icon_check.png" alt=""></span>
						</div>
						<div class="product-avatar"><img :src="item.avatar" alt=""></div>
						<div class="product-type" >
							<div class="show-name">
								<div class="name" v-text="item.name"></div>
								<div class="type" v-if="!item.size">
									<span>{{item.color||item.edition}}</span>
									<span v-if="item.type">•</span>
									<span>{{item.type}}</span>
								</div>
								<div class="type" v-if="item.size">
									<span>{{item.color}}</span>
									<span>•</span>
									<span>{{item.size}}</span>
									<span>•</span>
									<span>{{item.style}}</span>
								</div>
							</div>
							<div class="show-type">
								<span class="num-box" v-if="isEdit">
									<input type="button" class="reduce" @click="reduce(i,item.quantity)">
									<span class="num">{{item.quantity}}</span>
									<input type="button" class="add" @click="add(i,item.quantity)">
								</span>
								<span class="price" >
									<span>￥</span>
									<span>{{`${item.price}.00`}}</span>
								</span>
								<span class="num" v-if="!isEdit">
									<span>x</span>
									<span>{{item.quantity}}</span>
								</span>
							</div>
						</div>
					</li>
					<li class="placeholderBottom">placeholder</li>
				</ul>
			</div>
			<div class="menu">
				<div class="check-box">
				<span class="check" @click="allCheck">
					<img v-if="allBtnState" src="@assets/img/icon/icon_check.png" alt="">
				</span>
					<span><span>已选</span><span>{{selectNum}}</span><span>件</span></span>
				</div>
				<div class="price" v-if="!isEdit">
					<div class="total"><span>合计:</span><span><span>￥</span><span></span>{{`${allPrice}.00`}}</span>
					</div>
					<div v-if="150 - allPrice >=0"><span>还差</span><span>￥</span><span>{{`${150 - allPrice}.00`}}</span><span>元包邮</span>
					</div>
					<div v-if="150 - allPrice <=0"><span>已享免邮费</span></div>
				</div>
				<div class="pay-btn">
					<btn :title="isEdit ? '删除商品' : '现在结算'" :color="isEdit ? 'red' : 'blue'" :fn="payAndRemove" :state="payBtnState"/>
				</div>
			</div>
		</template>
		<template v-if="!isShow">
			<div class="nullCart">
				<img src="../assets/img/icon/icon_null_cart.png" alt="">
				<p>购物车暂无商品</p>
				<p>添加到购物车的商品将会显示在这里</p>
				<p><btn v-if="!$store.state.isLogin" title="登录" :fn="login" size="big" :state="true"/><router-link to="/category">现在选购</router-link></p>
			</div>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
        import navMenu from '../components/nav/header_menu';
        import footerMenu from '../components/nav/footer_menu';
        import btn from '../components/public/button';
	import recommend from '../components/index/floor';
        import BScroll from 'better-scroll';
        import vue from 'vue';

        import {createNamespacedHelpers} from 'vuex';
        const {mapState, mapActions,mapMutations} = createNamespacedHelpers('cart');
        export default {
                components: {navMenu, footerMenu, btn,recommend},
                data(){
                        return {
                                allCheckBtnState: {},
                                allPrice: 0,
                                allBtnState: false,
                                allId: [],
                                selectNum:0,
	                        payBtnState:false,
	                        isShow:false,
	                        isInit:true
                        }
                },
                computed: {
                        ...mapState(['cart','isEdit']),

                },
                watch: {
                        isEdit(){
                                this._refreshAllCheckBtnState();
                                this.selectNum = 0;
                                this.allBtnState = false;
                                this.payBtnState = false;
                                this._countPrice();
                        }
                },
                methods: {
                        ...mapActions(['init','minus','augment','remove']),
	                ...mapMutations(['changeEditState','setOrder','changeInitState']),
                        _setCartNavBtnState(){
                                this.$store.commit('template/changeBtnState', {btn: ['Text',`${this.isShow?'Edit':''}`], NavTextContent: '购物车'});
                        },
                        _getCart(){ //获取购物车数据
                                this.init().then(result => {
                                        if(!result) return; /*未登录直接return*/
                                        this.$store.commit('template/changeEdit',!!this.cart.length);
                                        if(!this.cart.length) {this.isShow = false;return}
                                        this.isShow=true;
                                        if(this.isInit) this.cart.forEach((v,i)=>vue.set(this.allCheckBtnState, i, false)); //初始化选中状态
                                        this.isInit = false;
                                })
                        },
	                _refreshData(){
                                this.allBtnState=false;
                                this.payBtnState=false;
                                this.allPrice = 0;
                                this.selectNum = 0;
                                this.isInit=true;
	                },
	                _refreshAllCheckBtnState(){
                                for(let i in this.allCheckBtnState){
                                        this.allCheckBtnState[i] = false;
                                }
	                },
                        _initCartBScroll(){  //初始化滚动插件
                                if(!this.$refs.cartBScroll) return;
                                if(this.cartBScroll){this.cartBScroll.refresh();return}
                                this.cartBScroll = new BScroll(this.$refs.cartBScroll, {
                                        click: true,
                                })
                        },
                        _countPrice(){ //计算选中商品的价格
                                let obj = this.allCheckBtnState, temp = [], allPrice = 0;
                                for(let i in obj){if(obj[i]){temp.push(parseInt(i))}}
                                temp.forEach(v => {
                                        allPrice += this.cart[v].price * this.cart[v].quantity;
                                });
                                this.allPrice = allPrice;
                        },
                        changeCheckState(n){ //选中状态
                                if(this.allCheckBtnState[n])
                                        vue.set(this.allCheckBtnState, n, false);
                                else
                                        vue.set(this.allCheckBtnState, n, true);
                                this._countPrice();
                                /*判断是否全选*/
                                let obj = this.allCheckBtnState,allNum=0,selectNum =0;
                                for(let i in obj){allNum++;if(obj[i]){selectNum++;}}
                                this.payBtnState = selectNum>=1;
                                this.allBtnState = allNum===selectNum;
                                this.selectNum = selectNum;
                        },
                        allCheck(){ //全选操作
                                let obj = this.allCheckBtnState;
                                let allNum = 0;
                                for(let i in obj){
                                        if(obj[i] !== null){
                                                this.allCheckBtnState[i] = !this.allBtnState;
                                        }
                                        allNum++;
                                }
                                this.selectNum = this.allBtnState ? 0 : allNum ;
                                this.allBtnState = !this.allBtnState;
                                this.payBtnState = this.allBtnState;
                                this._countPrice();
                        },
                        reduce(n,quantity){
                                if(quantity<=1) {this.$alert.info('达到最小数量'); return}
                                this.minus({id:this.cart[n].id,n})
	                                .then(()=>this._countPrice())
                        },
	                add(n,quantity){
                                if(quantity>=3) {this.$alert.info('达到单项商品上限'); return}
                                this.augment({id:this.cart[n].id,n})
                                        .then(()=>this._countPrice())
	                },
                        login(){
                                this.$router.replace('/user/login');
                        },
                        payAndRemove(){
                                if(!this.payBtnState) return;
                                let obj = this.allCheckBtnState, selectIdArr = [],selectObjId=[];
                                for (let i in obj){
                                        if(obj[i]){
                                                selectIdArr.push(this.cart[i].cartid);  //收集选中的商品pid
                                                selectObjId.push(i);
                                        }
                                }
                                if(this.isEdit){        //判断是否是编辑状态
                                        this.changeInitState(true);
                                        this.remove(selectIdArr)
                                                .then(result=>{
	                                                if(!result)return;
	                                                this._getCart();
	                                                this.changeEditState();
                                                        selectObjId.forEach(v=>{
                                                           delete  this.allCheckBtnState[v];
                                                        });
	                                                this.$alert.info('删除成功');
	                                        });
                                }else{ //进入订单页
                                        this.setOrder(selectIdArr);
                                        this.$router.push({path:'/order'})
                                }
                        },
                },
                activated(){
                        this._setCartNavBtnState();
                        this.$store.dispatch('isLogin');
                        this._getCart();
                        this._refreshData();
                        this.changeEditState(true);
                        this._refreshAllCheckBtnState();
                },
                mounted(){

                },
                updated(){
                        this._initCartBScroll();
                },
                destroyed(){

                }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		display flex
		flex-direction column

		.floor1
			position fixed
			top 1rem
			z-index 2
			width 100%
			display flex
			align-items center
			padding 0.4rem
			background rgb(255, 231, 229)
			box-shadow inset 0 5px 13px rgba(0, 0, 0, .12), 0 5px 13px rgba(0, 0, 0, .12)
			margin-bottom 0.2rem

			.img-box
				width 0.5rem
				margin-right 0.3rem

				img
					width 100%

			.text-box
				font-size 0.3rem
				color #d04f48
				font-weight 700
				flex-grow 1


		.product-box
			flex-grow 1
			background #fff
			overflow hidden

			.placeholderTop, .placeholderBottom
				width 100%
				color #fff
				margin-bottom 0.2rem

			.placeholderTop
				padding 0.4rem
				font-size 0.5rem

			.placeholderBottom
				height 1rem

			.product-bar
				display flex
				align-items center
				padding 0.2rem 0.3rem
				border-bottom 0.01rem solid rgb(240, 240, 240, 0.1)

				.check-box
					width 10%

					span
						height 0.4rem
						width 0.4rem
						display flex
						border 0.02rem solid rgba(0, 0, 0, 0.2)
						border-radius 100%
						justify-content center
						align-items center
						margin-right 0.2rem

						img
							width 100%

				.product-avatar
					width 30%
					flex-shrink 0
					margin-right 0.3rem

					img
						width 100%

				.product-type
					flex-grow 1
					padding-right 0.3rem
					.show-name
						margin-bottom 0.1rem

						.name
							font-size 0.24rem
							font-weight 700
							color #000000
							white-space nowrap
							overflow hidden
							text-overflow ellipsis
							margin-bottom 0.05rem

						.type
							font-size 0.22rem
							font-weight 500
							white-space nowrap
							overflow hidden
							text-overflow ellipsis
							color #666


					.show-type
						display flex
						align-items center
						margin-bottom 0.1rem
						.num-box
							display flex
							align-items center
							flex-grow 1
							input
								width 0.6rem
								height 0.6rem
								border none
								background-repeat no-repeat
								background-size 100%
								outline none
							.reduce
								margin-right 0.2rem
								background-image  url("../assets/img/icon/icon-reduce.png")
							.num
								margin 0 0.1rem
								font-size 0.3rem
							.add
								margin-left 0.2rem
								background-image  url("../assets/img/icon/icon-add.png")

						.price
							color rgb(212, 77, 68)
							font-weight 700
							font-size 0.24rem
							flex-shrink 0

							span:first-child
								font-size 0.2rem

						.num
							font-size 0.24rem
							font-weight 700
							color rgb(153, 153, 153)

		.menu
			position fixed
			width 100%
			height 1rem
			bottom 0.98rem
			background #fff
			box-shadow 0 -0.1rem 0.2rem rgba(150, 150, 150, 0.2)
			padding 0 0.3rem
			display flex
			align-items center

			.check-box
				flex-shrink 0
				display flex
				align-items center
				padding-right 0.2rem

				.check
					height 0.4rem
					width 0.4rem
					display flex
					border 0.02rem solid rgba(0, 0, 0, 0.2)
					border-radius 100%
					justify-content center
					align-items center
					margin-right 0.2rem

					img
						width 100%

				span:last-child
					font-weight 700
					color rgb(153, 153, 153)
					font-size 0.26rem

					span
						margin-right 0.05rem

			.price
				flex-grow 1
				flex-basis 0

				.total
					margin-bottom 0.1rem

					& > span:first-child
						font-weight 700
						color #666

					& > span:last-child
						color rgb(212, 77, 68)
						font-weight 700

				div:last-child
					color rgb(212, 77, 68)

			.pay-btn
				height 100%
				flex-grow 1
				flex-basis 0
				padding 0.1rem 0.1rem
				div
					height 100%
		.nullCart
			position fixed
			top 50%
			left 50%
			transform translateX(-50%) translateY(-50%)
			text-align center
			&>*
				margin-bottom 0.1rem
			p
				white-space nowrap
				color rgb(202, 202, 202)
			p:nth-child(2)
				font-size 0.5rem
			p:nth-child(3)
				font-size 0.28rem
				margin-bottom 0.3rem
			p:nth-child(4)
				height 0.8rem
				display flex
				justify-content space-between
				&>*:nth-child(1)
					flex-grow 1
					margin-right 0.1rem
				&>*:nth-child(2)
					flex-grow 1
					margin-left 0.1rem
				a
					display inline-block
					padding 0.2rem 0.5rem
					border-radius 0.1rem
					font-size 0.28rem
					font-weight 700
					color #666
					border 1px solid rgba(0, 0, 0, 0.2)
</style>