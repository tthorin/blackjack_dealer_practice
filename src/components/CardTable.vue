<script setup>
import { ref, onMounted } from 'vue'
import { generateCards, getShuffledCards } from '../js/cards'
import CardHand from './CardHand.vue';
import PlayingCard from './PlayingCard.vue';
import ActiveHand from './ActiveHand.vue';
import Timer from './Timer.vue';

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
const dealtCards = ref([])

const handsStrings = ["hand-one", "hand-two", "hand-three", "hand-four", "hand-five", "hand-six", "hand-seven", "hand-eigth", "hand-nine", "hand-ten", "hand-eleven", "hand-dealer", "card-shoe"]
const hands = [handOne, handTwo, handThree, handFour, handFive, handSix, handSeven, handEight, handNine, handTen, handEleven, handDealer, cardShoe]

let handCounter = 0
const showActiveHand = ref(false)
const showBeginButton = ref(false)
let activeHand = ref(hands[handCounter].value)

let dealTo = 0
let currentHand = handsStrings[dealTo]
let cardCounter = ref(0)

const dealCard = (i) => {
	setTimeout(() => {
		const card = cardShoe.value.pop()
		card.hand = currentHand
		hands[dealTo].value.push(card)
		dealTo++
		cardCounter.value++
		if (dealTo > handsStrings.length - 2) {
			dealTo = 0
		}
		currentHand = handsStrings[dealTo]

	}
		, i)
}
const handleCorrectAnswer = (arg) => {
	console.log(handCounter)
	if (arg === "deal") {
		dealCard()
	}
	else if (handCounter === 11){
		showActiveHand.value = false
		showBeginButton.value = true
	}
	else {
		handCounter++
		activeHand.value = hands[handCounter].value
	}
}

const isActiveHand = (hand) => hand.value === activeHand.value



onMounted(() => {
	const numberOfStartingCards = 24
	const delayInMs = 700
	for (let i = 0; i < numberOfStartingCards; i++) {
		dealCard(delayInMs * i)
	}
	setTimeout(() => {
		//showActiveHand.value = true
		showBeginButton.value = true
	}, delayInMs * numberOfStartingCards)
})

</script>

<template>
	<!-- <button @click="dealCard" :disabled="cardCounter>=cardShoe.length">Deal</button> -->
	<Timer :shouldRun="!showBeginButton"/>
	<div class="card-table">
		<CardHand v-for="(hand, index) in hands" :hand="hand" :shoe="cardShoe" :key="`hand-${index}`"
			:class="isActiveHand(hand) ? `currently-active-hand ${handsStrings[index]}` : `${handsStrings[index]}`" />

		<ActiveHand v-if="showActiveHand" :activeHand="activeHand" class="active-hand" @correctAnswer="handleCorrectAnswer"
			:key="`active-${handsStrings[handCounter]}`" />
		<button v-if="showBeginButton" @click="showActiveHand = true;showBeginButton=false" class="active-hand">Begin</button>
	</div>
</template>

<style scoped>
.card-table {
	position: relative;
	max-width: 100vw;
	max-height: 100vh;
	height: 90vh;
	transition: transform 1s;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(4, 1fr);
	grid-template-areas:
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

.shuffleMedium-move {
	transition: transform 0.5s;
}

.currently-active-hand {
	border-color: red;
	box-shadow: 5px 5px 5px 5px rgb(143, 7, 7);
}
</style>