<script setup>
import { ref } from 'vue'
import { shuffleCards } from '../js/cards'
import cardVue from './PlayingCard.vue';

const props = defineProps({
	shoe: Object,
	display: String,
	hand: Object
})
const emit = defineEmits(['updateShoe', 'updateDisplay',"updateHand"])
const shuffleSpeed = "shuffleMedium"
let cardCounter = 0;


const deal = (shoe) => {
	hand.value.push(shoe[cardCounter])
	cardCounter++
// 	console.log(hand.value.reduce((a, b) => a + +b.value, 0))
// 	console.log(hand.value.reduce((a, b) => a + +b.secondaryValue, 0))
}
const goToMain = () => {
	emit('updateDisplay', "main")
}
const dealCard = () => {
	emit('updateHand', hand.value)
}
</script>

<template>
	<div>
		<button @click="goToMain">Go to main page</button>
		<button @click="shuffleCards(shoe)">Shuffle cards</button>
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