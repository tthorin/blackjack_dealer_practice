<script setup>
import { ref, onMounted } from 'vue'
import { getShuffledCards } from '../../js/cards'
import CardHand from './CardHand.vue';
import ActiveHand from './ActiveHand.vue';
import Timer from '../Timer.vue';

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

const handsStrings = ["hand-one", "hand-two", "hand-three", "hand-four", "hand-five", "hand-six", "hand-seven", "hand-eight", "hand-nine", "hand-ten", "hand-eleven", "hand-dealer", "card-shoe"]
const hands = [handOne, handTwo, handThree, handFour, handFive, handSix, handSeven, handEight, handNine, handTen, handEleven, handDealer, cardShoe]

let handCounter = 0
const showActiveHand = ref(false)
const showBeginButton = ref(false)
let activeHand = ref(hands[handCounter].value)

let dealTo = 0
let currentHand = handsStrings[dealTo]
let cardCounter = ref(0)
const backwards = ref(false)

let beginOrReturnBtnMsg = ref("Begin")

const dealCard = (i) => {
	setTimeout(() => {
		const card = cardShoe.value.pop()
		card.hand = currentHand
		hands[dealTo].value.push(card)
		dealTo++
		cardCounter.value++
		if ((dealTo>handsStrings.length-3 && cardCounter.value==23)||dealTo > handsStrings.length - 2) {
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
	else if(handCounter === 0 && backwards.value){
		showActiveHand.value = false
		showBeginButton.value = true
	}
	else if (backwards.value){
		handCounter--
		activeHand.value = hands[handCounter].value
	}

	else if (handCounter === 10) {
		if(!backwards.value){
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
	}
	else {
		emit('updateDisplay', "main")
	}
}



onMounted(() => {
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
		classString += backwards.value? " active-hand backwards" : " active-hand"
	}
	return classString
}
</script>

<template>
	<!-- <button @click="dealCard" :disabled="cardCounter>=cardShoe.length">Deal</button> -->

	<div class="card-table">
		<button @click="emit('updateDisplay', 'main')" key="card-table-back-button">Back to main</button>
		<Timer class="training-timer-container" :shouldRun="!showBeginButton" key="card-table-timer" />
			<CardHand v-for="(hand, index) in hands" :hand="hand" :shoe="cardShoe" :key="`hand-${index}`"
				:class="getClassForHand(hand,index)" />
		<ActiveHand v-if="showActiveHand" :activeHand="activeHand" :backwards="backwards" class="active-hand"
			@correctAnswer="handleCorrectAnswer" :key="`active-${handsStrings[handCounter]}`" />
		<button v-if="showBeginButton" @click="handleBeginOrReturn" class="active-hand btn-big"
			key="card-table-bgein-button">{{ beginOrReturnBtnMsg }}</button>

	</div>
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
		"btn-area . timer-area . ."
		"hand-four hand-five hand-six hand-seven hand-eight"
		"hand-three active-hand active-hand active-hand hand-nine"
		"hand-two active-hand active-hand active-hand hand-ten"
		"hand-one card-shoe hand-dealer . hand-eleven";
	align-items: center;
	justify-items: center;
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
	border-color: red;
	transition: all 0.5s ease-in-out;
	scale: 1.1;
}
.backwards {
	transform: rotate(180deg);
	border-color: chartreuse;
}

.card-table-trans-move {
	transition: all 5s;
}
</style>