<script setup>
defineProps({
	card: Object
})
</script>

<template>
	<div class="card" :class="card.color">
		<span class="card_suit card_suit_top">{{ card.suit }}</span>
		<span class="card_value">{{ card.display }}</span>
		<!--<span>{{card.id}}</span> This is just for debugging-->
		<span class="card_suit card_suit_bottom">{{ card.suit }}</span>
	</div>
</template>

<style scoped>
.card {
	width: 100px;
	height: 150px;
	border-radius: 10px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin: 10px;
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
</style>