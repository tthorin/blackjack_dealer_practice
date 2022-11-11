<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { generateCards } from './js/cards'
import ShuffleDisplay from './components/ShuffleDisplay.vue';


const display = ref("main")
const shoe = ref(generateCards())
const shuffleSpeed = "shuffleMedium"
</script>

<template>
	<div v-if="display === 'main'">
		<button @click="display = 'other'">Go to other page</button>
	</div>

	<ShuffleDisplay v-else-if="display === 'other'" :shoe="shoe" :display="display"
		@updateDisplay="(msg) => display = msg" />
</template>

<style scoped>

</style>
