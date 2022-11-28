<script setup>
import { ref } from 'vue'
import { generateCards,getShuffledCards } from './js/cards'
import ShuffleDisplay from './components/ShuffleDisplay.vue';
import CardTable from './components/CardTable.vue';


const display = ref("main")
const shoe = ref(generateCards())
</script>

<template>
	<div v-if="display === 'main'">
		<button @click="display = 'other'">Go to other page</button>
		<button @click="display = 'table'">Go to table page</button>

	</div>

	<ShuffleDisplay v-else-if="display === 'other'" :shoe="shoe" :display="display"
		@updateDisplay="(msg) => display = msg" />
		<CardTable v-else-if="display === 'table'" />
</template>

<style scoped>

</style>
