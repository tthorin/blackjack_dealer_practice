<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { generateCards,getShuffledCards } from './js/cards'
import ShuffleDisplay from './components/ShuffleDisplay.vue';
import CardTable from './components/CardTable.vue';


const display = ref("main")
const shoe = ref(generateCards())
const hand = ref([])
const shuffleSpeed = "shuffleMedium"
const dealCard = () => {
	hand.value.push(shoe.value.pop())
}
</script>

<template>
	<div v-if="display === 'main'">
		<button @click="display = 'other'">Go to other page</button>
		<button @click="display = 'table'">Go to table page</button>

	</div>

	<ShuffleDisplay v-else-if="display === 'other'" :shoe="shoe" :display="display"
		@updateDisplay="(msg) => display = msg" :hand="hand" @updateHand="dealCard"/>
		<CardTable v-else-if="display === 'table'" />
</template>

<style scoped>

</style>
