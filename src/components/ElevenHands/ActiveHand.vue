<script setup>
import { ref, onUpdated, onMounted, computed, watch } from 'vue';
import PlayingCard from '../PlayingCard.vue';

const props = defineProps({
	activeHand: Object,
	backwards: Boolean
})
const emit = defineEmits(['correctAnswer', 'madeMistake'])

const answerOne = computed(() => getAnswerOne(props.activeHand))
const answerTwo = computed(() => getAnswerTwo(props.activeHand))
const attemptOne = ref('')
const attemptTwo = ref('')
let suspendMistakeChecking = false

const getAnswerOne = (cards) => {
	let answer = 0
	if (props.backwards) {
		let numberOfAces = 0
		cards.forEach(card => {
			if (card.secondaryValue === 11) {
				numberOfAces++
				answer += card.secondaryValue
			} else {
				answer += +card.value
			}
		})
		while (answer > 21 && numberOfAces > 0) {
			answer -= 10
			numberOfAces--
		}
	}
	else {
		answer = cards.reduce((a, b) => a + +b.value, 0)
	}

	return answer
}
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

watch(attemptOne, (newValue) => {
	if (newValue.length === answerOne.value.toString().length
		&& +newValue !== answerOne.value
		&& !suspendMistakeChecking) {
		console.log("wrong #1")
		emit('madeMistake')
	}
})
watch(attemptTwo, (newValue) => {
	if (newValue.length === answerTwo.value.toString().length
		&& +newValue !== answerTwo.value
		&& answerTwo.value !== answerOne.value
		&& !suspendMistakeChecking) {
		console.log("wrong #2")
		emit('madeMistake')
	}
})
watch(() => props.activeHand.length, () => {
	suspendMistakeChecking = false
})

onUpdated(() => {
	if (answerOne.value === +attemptOne.value && props.activeHand.length === 2 && (answerTwo.value === answerOne.value || answerTwo.value === +attemptTwo.value)) {
		suspendMistakeChecking = true
		resetInputs()
		emit('correctAnswer', "deal")
	} else if (answerOne.value === +attemptOne.value && (answerTwo.value === answerOne.value || answerTwo.value === +attemptTwo.value || answerTwo.value > 21) && props.activeHand.length === 3) {
		suspendMistakeChecking = true
		resetInputs()
		emit("correctAnswer", "nextHand")
	}
})
onMounted(() => {
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
		<div class="active-inputs" :class="props.backwards ? 'backwards' : ''">
			<input v-model="attemptOne" id="answer-one-input" type="tel" />
			<input v-if="answerOne !== answerTwo && answerTwo <= 21" v-model="attemptTwo" type="tel" />
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
	border: 5px solid purple;
	border-radius: 10px;
}

.active-cards {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	align-items: center;
	position: relative;
	/*width: 100%;*/
	margin-right: -70px;
}

.active-cards> :nth-child(1) {
	margin-left: -70px;
	margin-top: -35px;
	z-index: 1;
}

.active-cards> :nth-child(2) {
	margin-left: -70px;
	z-index: 2;
}

.active-cards> :nth-child(3) {
	margin-left: -70px;
	margin-bottom: -35px;
	z-index: 3;
}

input {
	width: 4rem;
	font-size: 2rem;
	margin: 1rem;
	text-align: center;
}

.backwards {
	border-color: chartreuse;
}

@media (max-width: 1919px) {
	input {
		margin: 0.5rem;
	}

	.active-cards> :nth-child(1) {
		margin-left: -50px;
		margin-top: -10px;
		z-index: 1;
	}

	.active-cards> :nth-child(2) {
		margin-left: -50px;
		margin-bottom: -35px;
		z-index: 2;
	}

	.active-cards> :nth-child(3) {
		margin-left: -50px;
		margin-bottom: -75px;
		z-index: 3;
	}
}
</style>