<script setup>
import PlayingCardSmall from '../PlayingCardSmall.vue';

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
			<!--<img v-for="card in props.hand.value" class="small-card-img" :key="`card-hand-${card.id}`" :class="hand===shoe?'shoe-card':''" :src="card.image"/>-->
			<!--<PlayingCardSmall v-if="hand!==cardShoe" v-for="card in props.hand.value" :card="card" :key="card.id" />-->
		</transition-group>
</template>

<style scoped>
.card-hand {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	justify-content: center;
	/*width: 100vw; */
	margin: 0em;
	border-radius: 15px;
	padding: 10px;
	min-height: 125px;
	min-width: 150px;
	transition: all 0.5s ease-in-out;
	position: relative;
}
.card-hand > :nth-child(1) {
	position: absolute;
	bottom: 24px;
	left: 50px;
}
.card-hand > :nth-child(2) {
	position: absolute;
	z-index: 2;
	right: 35px;
}
.card-hand > :nth-child(3) {
	position: absolute;
	top: 24px;
	right: 50px;
	z-index: 3;
}
.addCard-move,
.addCard-leave-active,
.addCard-enter-active {
	transition: all 0.9s;
}
.addCard-enter-from{
	opacity: 0;
	transform: translateX(-100px) ;
}
.addCard-leave-to {
	opacity: 0;
	transform: translateX(100px) ;
}
.shoe{
	display: grid;

}

.shoe-card{
	image-rendering: none;
	grid-column: 1;
	grid-row: 1;
	color: rgba(245, 245, 245, 0);
	background-color: red;
	background-size: auto 82px;
	width:58px;
}
.shoe > :nth-last-child(-n+2){
	z-index: 2;
	background-image: url('../../assets/red_back.svg');
}
.shoe > :nth-child(1){
	z-index: 1;
	background-image: url('../../assets/red_back.svg');
}
</style>