<script setup>
import { ref, onMounted } from 'vue'
import { getShuffledCards } from '../../js/cards'
import CardHand from './CardHand.vue';
import ActiveHand from './ActiveHand.vue';
import Timer from '../Timer.vue';
import { updateBestTimes } from '../../js/bestTimes'
import ElevenhandsInstructions from './ElevenHandsInstructions.vue'

const props = defineProps({
	display: String
})
const emit = defineEmits(['updateDisplay'])
const cardShoe = ref(getShuffledCards())
const handOne = ref([])
const handTwo = ref([])
const handThree = ref([])
const handFour = ref([])
const handFive = ref([])
const handSix = ref([])
const handSeven = ref([])
const handEight = ref([])
const handNine = ref([])
const handTen = ref([])
const handEleven = ref([])
const handDealer = ref([])
const mistakes = ref(0);
const timerShouldRun = ref(false)
const showInstructions = ref(false)

const handsStrings = ["hand-one", "hand-two", "hand-three", "hand-four", "hand-five", "hand-six", "hand-seven", "hand-eight", "hand-nine", "hand-ten", "hand-eleven", "hand-dealer", "card-shoe"]
const hands = [handOne, handTwo, handThree, handFour, handFive, handSix, handSeven, handEight, handNine, handTen, handEleven, handDealer,cardShoe]

let handCounter = 0
const showActiveHand = ref(false)
const showBeginButton = ref(false)
let activeHand = ref(hands[handCounter].value)

let dealTo = 0
let currentHand = handsStrings[dealTo]
let cardCounter = ref(0)
const backwards = ref(false)

let beginOrReturnBtnMsg = ref("Begin")

const dealCard = async (i) => {
	setTimeout(() => {
		const card = cardShoe.value.pop()
		card.hand = currentHand
		hands[dealTo].value.push(card)
		dealTo++
		cardCounter.value++
		if ((dealTo > handsStrings.length - 3 && cardCounter.value == 23) || dealTo > handsStrings.length - 2) {
			dealTo = 0
		}
		currentHand = handsStrings[dealTo]

	}
		, i)
}
const handleCorrectAnswer = (arg) => {
	if (arg === "deal") {
		dealCard()
	}
	else if (handCounter === 0 && backwards.value) {
		timerShouldRun.value = false
		showActiveHand.value = false
		showBeginButton.value = true

	}
	else if (backwards.value) {
		handCounter--
		activeHand.value = hands[handCounter].value
	}

	else if (handCounter === 10) {
		if (!backwards.value) {
			backwards.value = true
		}
	}
	else {
		handCounter++
		activeHand.value = hands[handCounter].value
	}
}

const isActiveHand = (hand) => hand.value === activeHand.value

const handleBeginOrReturn = () => {
	if (handCounter === 0 && !backwards.value) {
		showBeginButton.value = false
		showActiveHand.value = true
		beginOrReturnBtnMsg.value = "Done"
		timerShouldRun.value = true
	}
	else {
		emit('updateDisplay', "main")
	}
}



onMounted(async () => {
	const numberOfStartingCards = 23
	const delayInMs = 700

	for (let i = 0; i < numberOfStartingCards; i++) {
		dealCard(delayInMs * i)
	}

	setTimeout(() => {
		showBeginButton.value = true
	}, delayInMs * numberOfStartingCards)
})

const getClassForHand = (hand, index) => {
	let classString = ""
	classString += handsStrings[index]
	if (isActiveHand(hand)) {
		classString += backwards.value ? " currently-active-hand backwards" : " currently-active-hand"
	}
	return classString
}
</script>

<template>
	<button @click="emit('updateDisplay', 'main')" class="ct-back-to-main-btn" key="card-table-back-button">Back to main</button>
	<button @click="showInstructions = !showInstructions" class="help-button"
		key="card-table-instructions-button">{{ showInstructions ? "Back" : "Instructions" }}</button>
	<div v-if="!showInstructions" class="card-table">
		
			<Timer class="training-timer-container" :shouldRun="timerShouldRun"
				@timeAtStop="(time) => updateBestTimes(time, mistakes, 'ElevenHands')" key="card-table-timer" />
			<p class="card-table-mistake-counter">Mistakes: {{ mistakes }}</p>
			<CardHand v-for="(hand, index) in hands" :hand="hand" :shoe="cardShoe" :key="`hand-${index}`"
				:class="getClassForHand(hand, index)" />
			<ActiveHand v-if="showActiveHand" :activeHand="activeHand" :backwards="backwards" class="active-hand"
				@correctAnswer="handleCorrectAnswer" @madeMistake="() => mistakes++"
				:key="`active-${handsStrings[handCounter]}`" />
			<button v-if="showBeginButton" @click="handleBeginOrReturn" class="active-hand btn-big"
				key="card-table-bgein-button">{{ beginOrReturnBtnMsg }}</button>
	</div>
	<ElevenhandsInstructions v-if="showInstructions" key="card-table-instructions" />
</template>

<style scoped>
.card-table {
	position: relative;
	max-width: 1280px;
	max-height: 100vh;
	height: 85vh;
	width: 100%;
	transition: transform 1s;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: 4em repeat(4, 1fr);
	grid-template-areas:
		"btn-area . timer-area mistake-counter help-button-area"
		"hand-four hand-five hand-six hand-seven hand-eight"
		"hand-three active-hand active-hand active-hand hand-nine"
		"hand-two active-hand active-hand active-hand hand-ten"
		"hand-one card-shoe hand-dealer . hand-eleven";
	align-items: center;
	justify-items: center;
}

.card-table-mistake-counter {
	grid-area: mistake-counter;
}
.ct-back-to-main-btn{
	position: absolute;
	left: 2em;
	z-index: 1;
}
.help-button {
	position: absolute;
	right: 2em;
	z-index: 1;
}

.active-hand {
	grid-area: active-hand;
}

.card-shoe {
	grid-area: card-shoe;
	justify-self: left;
	margin-left: 1rem;
}

.hand-one {
	grid-area: hand-one;
}

.hand-two {
	grid-area: hand-two;
}

.hand-three {
	grid-area: hand-three;
}

.hand-four {
	grid-area: hand-four;
}

.hand-dealer {
	grid-area: hand-dealer;
}

.hand-five {
	grid-area: hand-five;
}

.hand-six {
	grid-area: hand-six;
}

.hand-seven {
	grid-area: hand-seven;
}

.hand-eight {
	grid-area: hand-eight;
}

.hand-nine {
	grid-area: hand-nine;
}

.hand-ten {
	grid-area: hand-ten;
}

.hand-eleven {
	grid-area: hand-eleven;
}

.deck {
	position: absolute;
	bottom: 0%;
	left: 50%;
}

.training-timer-container {
	grid-area: timer-area;
}

.currently-active-hand {
	border-color: purple;
	transition: all 0.5s ease-in-out;
	scale: 1.1;
}

.backwards {
	border-color: chartreuse;
}
</style>