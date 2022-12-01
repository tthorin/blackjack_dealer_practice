<script setup>
import { ref } from 'vue'
import { generateCards, getShuffledCards } from './js/cards'
import ShuffleDisplay from './components/ShuffleDisplay.vue';
import CardTable from './components/CardTable.vue';
import BestTimes from './components/BestTimes.vue';
import DealerOnly from './components/DealerOnly.vue';
import bestTimes from './js/bestTimes';


const display = ref("main")
const shoe = ref(generateCards())
const best = getBestTimes()

function getBestTimes() {
	let value = localStorage.getItem("bestTimes")
	console.log(value)
	if (!value) {
		localStorage.setItem("bestTimes", JSON.stringify(bestTimes))
		value = localStorage.getItem("bestTimes")
		console.log("added to localStorage")
	}
	return JSON.parse(value)
}
</script>

<template>
	<div v-if="display === 'main'" class="main-display">
		<button class="btn-main" @click="display = 'other'">View card shuffling</button>
		<button class="btn-main" @click="display = 'table'">11 hands + dealer practice</button>
		<button class="btn-main" @click="display = 'dealer-practice'">Dealer only (mobile friendly)</button>
		<button class="btn-main" @click="display = 'best-times'">Your best times</button>
	</div>

	<ShuffleDisplay v-else-if="display === 'other'" :shoe="shoe" :display="display"
		@updateDisplay="(msg) => display = msg" />
	<CardTable v-else-if="display === 'table'" :display="display" @updateDisplay="(msg) => display = msg" />
	<DealerOnly v-else-if="display === 'dealer-practice'" @updateDisplay="(msg) => display = msg" />
	<BestTimes v-else-if="display === 'best-times'" :bestTimes="best" @updateDisplay="(msg) => display = msg" />

</template>

<style scoped>
.main-display {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	width: 100vw;
	height: 80vh;
	place-items: center;
}

.btn-main {
	background-color: #fff;
	border: 1px solid #000;
	border-radius: 1vw;
	color: #000;
	cursor: pointer;
	font-weight: 700;
	transition: all 0.3s ease-in-out;
	width: 20vw;
	height: 20vw;
	font-size: 2vw;
}

.btn-main:hover {
	background-color: #000;
	color: #fff;
	border-color: #646cff;
	transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
	.btn-main {
		width: 150px;
		height: 150px;
		margin: 10px;
		font-size: 1.2em;
		border-radius: 15px;
	}
}
</style>
