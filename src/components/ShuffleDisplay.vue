<script setup>
import { ref } from 'vue'
import { shuffleCards } from '../js/cards'
import cardVue from './PlayingCard.vue';

const props = defineProps({
	shoe: Object,
	display: String
})
const emit = defineEmits(['updateShoe', 'updateDisplay'])
const shuffleSpeed = "shuffleMedium"
const hand = ref([])
let cardCounter = 0;


const deal = (shoe) => {
	console.log(shoe)
	hand.value.push(shoe[cardCounter])
	cardCounter++
}
const goToMain = () => {
	emit('updateDisplay', "main")
}
</script>

<template>
	<div>
		<button @click="goToMain">Go to main page</button>
		<button @click="shuffleCards(shoe)">Shuffle cards</button>
		<button @click="deal(shoe)">Deal</button>
		<div class="card-container">
			<cardVue v-if="hand.length > 0" v-for="card in hand" :card="card" :key="'cc' + card.id" />
		</div>
		<transition-group tag="div" :name="shuffleSpeed" class="card-container">
			<cardVue v-for="card in shoe" :card="card" :key="card.id" />
		</transition-group>
	</div>
</template>

<style scoped>
.card-container {
	display: flex;
	flex-wrap: wrap;
}

.shuffleMedium-move {
	transition: transform 1s;
}
</style>