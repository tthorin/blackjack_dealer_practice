<script setup>
defineProps({
	card: Object
})
</script>

<template>
	<div class="card" :class="card.color">
		<img class="card-img" :src="card.image"/>
		<!--<span class="card_suit card_suit_top">{{ card.suit }}</span>
		<span class="card_value">{{ card.display }}</span>
		<span>{{card.id}}</span> This is just for debugging
		<span class="card_suit card_suit_bottom">{{ card.suit }}</span>-->
	</div>
</template>

<style scoped>
.card {
	width: 119px;
	height: 169px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	margin: 10px;
	border: 2px solid black;
}
.card>img{
	width: 100%;
	height: 100%;
}

.red {
	color: red;
}

.black {
	color: black;
}

.card_suit {
	font-size: 2em;
}

.card_value {
	font-size: 3em;
}

.card_suit_top {
	align-self: flex-start;
}

.card_suit_bottom {
	align-self: flex-end;
	transform: rotate(180deg);
}
@media (max-width: 768px) {
	.card {
		width: 55px;
		height: 80px;
		padding: 4px;
	}
	.card_suit{
		font-size: 1.5em;
	}
	.card_value{
		font-size: 2em;
	}
}
</style>