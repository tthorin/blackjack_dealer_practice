<script setup>
import { ref, onUpdated,onMounted } from 'vue';
import PlayingCard from './PlayingCard.vue';

const props = defineProps({
	activeHand: Object
})
const emit = defineEmits(['correctAnswer'])

const answerOne = ref(0)
let answerTwo = ref(0)
const attemptOne = ref('')
const attemptTwo = ref('')

const getAnswerTwo = (cards) => {
	let answer = 0
	cards.forEach(card => {
		if (card.secondaryValue === 11 && answer + 11 <= 21) {
			answer += 11
		} else if (card.secondaryValue === 11) {
			answer += 1
		} else {
			answer += +card.value
		}
	})
	return answer
}

const resetInputs = () => {
	const inputOne = document.getElementById('answer-one-input')
	attemptOne.value = ''
	attemptTwo.value = ''
	inputOne.focus()
}
onUpdated(() => {
	answerOne.value = props.activeHand.reduce((a, b) => a + +b.value, 0)
	answerTwo.value = getAnswerTwo(props.activeHand)
	if (answerOne.value === +attemptOne.value && props.activeHand.length === 2 && (answerTwo.value === answerOne.value || answerTwo.value === +attemptTwo.value)) {
		emit('correctAnswer', "deal")
		resetInputs()
	} else if (answerOne.value === +attemptOne.value && (answerTwo.value === answerOne.value || answerTwo.value === +attemptTwo.value || answerTwo.value > 21) && props.activeHand.length === 3) {
		emit("correctAnswer", "nextHand")
		resetInputs()
	}
})
onMounted(() => {
	console.log("mounted")
	const inputOne = document.getElementById('answer-one-input')
	attemptOne.value = ''
	inputOne.focus()
})
</script>

<template>
	<div class="active-hand">
		<div class="active-cards">
			<PlayingCard v-for="card in props.activeHand" :card="card" :key="card.id" />
		</div>
		<div class="active-inputs">
			<input v-model="attemptOne" id="answer-one-input"/>
			<input v-if="answerOne !== answerTwo && answerTwo <= 21" v-model="attemptTwo" />
		</div>
	</div>
</template>

<style scoped>
.active-hand {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(2, 1fr);
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.active-inputs {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.active-cards {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

input {
	width: 4rem;
	font-size: 2rem;
	margin: 1rem;
	text-align: center;
}
</style>