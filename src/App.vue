<template>
  <div id="app">
    <router-view/>
	<call v-if="refresh"></call>
  </div>
</template>

<script>
	import call from "@/pages/call.vue"
	export default {
	  name: 'App',
	  data(){
		return{
			
		}
	  },
	  created() {
	  },
	  computed:{
		refresh(){
			return this.$store.state.refresh
		}  
	  },
	  components:{
		  call
	  }
	}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
	font-family:"Microsoft YaHei" !important;
}
</style>
