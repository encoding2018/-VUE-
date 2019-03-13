<template>
	<div class="update-bar" >{{text}}</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props:['state'],
	        data(){
                        return{

                        }
	        },
	        computed:{
                        text(){
                                return this.state? '下拉加载更多。。。':'加载中。。。';
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.update-bar

</style>