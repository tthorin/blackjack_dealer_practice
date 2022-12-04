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
	flex-direction: row;
	/*width: 100vw; */
	margin: 0em;
	border: 5px solid antiquewhite;
	border-radius: 15px;
	padding: 10px;
	min-height: 125px;
	min-width: 215px;
	transition: all 0.5s ease-in-out;
	position: relative;
}
.card-hand > :nth-child(1) {
}
.card-hand > :nth-child(2) {
	position: absolute;
	top: 10px;
	left: 40px;
	z-index: 1;
}
.card-hand > :nth-child(3) {
	position: absolute;
	top: 10px;
	left: 80px;
	z-index: 2;
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
.shoe-card img{
	display: none;
	height: 19px;
}
.shoe-card{
	grid-column: 1;
	grid-row: 1;
	color: rgba(245, 245, 245, 0);
	background-color: red;
	background-image: url('../../assets/red_back.svg');
	background-size: auto 82px;
	width:58px;
	scale: 2;
}

</style>