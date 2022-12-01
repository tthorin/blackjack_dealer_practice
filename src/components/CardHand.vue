<script setup>
import PlayingCard from './PlayingCard.vue';
import PlayingCardSmall from './PlayingCardSmall.vue';
import redBack from '../assets/red_back.svg';

const props = defineProps({
  hand: Object,
  shoe: Object
})
const hand = props.hand;
const cardShoe = props.shoe;

</script>

<template>
		<transition-group tag="div" name="addCard" :class="hand===shoe?'shoe':'card-hand'">
			<PlayingCardSmall v-for="card in props.hand.value" :card="card" :key="`card-hand-${card.id}`" :class="hand===shoe?'shoe-card':''"/>
			<!--<PlayingCardSmall v-if="hand!==cardShoe" v-for="card in props.hand.value" :card="card" :key="card.id" />-->
		</transition-group>
</template>

<style scoped>
.card-hand {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	/*width: 100vw; */
	margin: 0em;
	border: 5px solid antiquewhite;
	border-radius: 15px;
	padding: 10px;
	min-height: 125px;
	min-width: 215px;
	transition: all 0.5s ease-in-out;
}
.addCard-move,
.addCard-leave-active,
.addCard-enter-active {
	transition: all 1s ease;
}
.addCard-enter-from,
.addCard-leave-to {
	opacity: 0;
	transform: translateX(100px) ;
}
.shoe{
	display: grid;
}
.shoe-card{
	grid-column: 1;
	grid-row: 1;
	color: rgba(245, 245, 245, 0);
	background-color: red;
	background-image: url('../assets/red_back.svg');
	background-size: auto 80px;
	width:55px;
	scale: 2;
}

</style>