<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import { getShuffledCards } from '../js/cards'
import PlayingCard from './PlayingCard.vue';
import Timer from './Timer.vue';
import DealerOnlyInstructions from './DealerOnlyInstructions.vue';

const emit = defineEmits(['updateDisplay'])
let shoe = getShuffledCards(1)
const hand = ref([shoe.pop(), shoe.pop()])
const cardTotalTwo = computed(() => getCardTotalTwo(hand.value))
const answers = ref(getAnswers())
const wrongAnswers = ref(0)
const timerShouldRun = ref(false)
const gameOver = ref(false)
const resetTimer = ref(false)
const showInstructions = ref(false)

const goToMain = () => {
	emit('updateDisplay', "main")
}


function getCardTotalTwo(cards) {
	let answer = 0
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
	return { answer, numberOfAces }
}

const dealCard = () => {
	hand.value.push(shoe.pop())
}

function getAnswers() {
	const randomNumberZeroToFour = Math.floor(Math.random() * 4)
	let newAnswers = []
	for (let i = 0; i < 4; i++) {
		let newAnswer = { value: cardTotalTwo.value.answer - randomNumberZeroToFour + i }
		if (cardTotalTwo.value.numberOfAces > 0 && newAnswer.value < 17 && newAnswer.value > 11) {
			newAnswer.display = `${newAnswer.value - 10} / ${newAnswer.value}`
		}
		else {
			newAnswer.display = newAnswer.value
		}
		newAnswers.push(newAnswer)
	}
	return newAnswers
}


watch(() => hand.value[hand.value.length - 1].id, () => {
	answers.value = getAnswers()
})

const checkShouldDealOrReset = () => {
	if (cardTotalTwo.value.answer >= 17) {
		if (shoe.length < 10) {
			timerShouldRun.value = false
			gameOver.value = true
		}
		else {
			hand.value = [shoe.pop(), shoe.pop()]
		}
	} else {
		dealCard()
	}
}
const checkAnswer = (answer) => {
	if (!timerShouldRun.value) {
		timerShouldRun.value = true
	}

	if (answer === cardTotalTwo.value.answer) {
		checkShouldDealOrReset()
	} else {
		wrongAnswers.value++
	}
}
const updateBestTimes = (time) => {
	let newBestTimes = JSON.parse(localStorage.getItem("bestTimes"))
	const today = new Date()
	const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, '0')
	const entry = {
		date: date,
		time: time,
		mistakes: wrongAnswers.value
	}
	if (newBestTimes === null) {
		newBestTimes = []
	}
	newBestTimes.push(entry)
	newBestTimes.sort((a, b) => a.mistakes - b.mistakes || a.time - b.time)
	localStorage.setItem("bestTimes", JSON.stringify(newBestTimes.slice(0, 5)))
}
const reset = () => {
	shoe.clear
	shoe = getShuffledCards(1)
	hand.value = [shoe.pop(), shoe.pop()]
	wrongAnswers.value = 0
	gameOver.value = false
	timerShouldRun.value = false
	resetTimer.value = true
}
</script>

<template>

	<span @click="showInstructions = !showInstructions" class="instructions-button">{{ showInstructions ? "←" : "?"
	}}</span>
	<div v-if="!showInstructions">
		<Timer :shouldRun="timerShouldRun" :shouldReset="resetTimer" @timeAtStop="(time) => updateBestTimes(time)"
			@timerReset="() => resetTimer = false" />
		<div v-if="!gameOver" class="dealer-only-container">
			<div class="dealer-only-card-hand">
				<PlayingCard v-for="card in hand" :card="card" :key="card.id" />
			</div>
			<button v-if="() => hand.value.length > 1" v-for="answer in answers" :key="`guess-button-${answer.value}`"
				@click="checkAnswer(answer.value)" class="btn-guess">{{ answer.display }}</button>
		</div>
		<div v-else class="game-over-container">
			<h1>Game Over</h1>
			<div class="dealer-only-button-container">
				<button @click="goToMain">Main Menu</button>
				<button @click="reset">Play Again</button>
			</div>
		</div>
		Number of wrong answers: {{ wrongAnswers }}
		<button v-if="!gameOver" @click="goToMain">Go to main page</button>
	</div>
	<DealerOnlyInstructions v-else />
</template>

<style scoped>
.instructions-button {
	position: fixed;
	top: 1em;
	right: 1em;
	font-size: 1.5rem;
	border: 3px solid white;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	font-weight: 600;
	user-select: none;
}

.dealer-only-button-container {
	display: flex;
	justify-content: space-around;
	margin: 2em;
	flex-wrap: wrap;
}

.dealer-only-button-container>button {
	margin: 2em;
}

.dealer-only-card-hand {
	grid-column: 1/3;
	grid-row: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-items: center;
	margin-top: 1em;
}

.btn-guess {
	background-color: #fff;
	border: 1px solid #000;
	border-radius: 1vw;
	color: #000;
	cursor: pointer;
	font-weight: 700;
	transition: all 0.4s ease-in-out;
	width: 120px;
	height: 120px;
	font-size: 2em;
	text-align: center;
	padding: 0.5em;
	margin: 1em;
}

.btn-guess:hover {
	/*background-color: #000;
	color: #fff;
	border-color: #646cff;
	transition: all 0.3s ease-in-out;*/
}

.btn-guess:active {
	background-color: #646cff;
	color: #fff;
	border-color: #646cff;
	transform: scale(1.1);
	transition: all 0.2s;
}

@media (max-width: 768px) {
	.btn-guess {
		width: 25vw;
		height: 25vw;
		font-size: 1.5em;
	}

	.btn-guess:active {
		background-color: #646cff;
		color: #fff;
		border-color: #646cff;
		transform: scale(1.1);
		transition: all 0.2s;
	}
}
</style>