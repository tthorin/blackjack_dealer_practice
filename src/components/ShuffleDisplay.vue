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
			<img v-for="card in shoe"  :key="card.id" :src="card.image"/>
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
img{
	width: 117px;
	height: 166.5px;
	margin: 5px;
}
</style>