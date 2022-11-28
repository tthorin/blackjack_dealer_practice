<script setup>
defineProps({
	card: Object
})
</script>

<template>
	<div class="card-small" :class="card.color">
		<span class="card-small-suit card-small-suit-top">{{ card.suit }}</span>
		<span class="card-small-value">{{ card.display }}</span>
		<!--<span>{{card.id}}</span> This is just for debugging-->
		<span class="card-small-suit card-small-bottom">{{ card.suit }}</span>
	</div>
</template>

<style scoped>
.card-small {
	width: 50px;
	height: 80px;
	border-radius: 5px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
	margin: 5px;
}

.red {
	color: red;
}

.black {
	color: black;
}

.card-small-suit {
	font-size: 1em;
}

.card-small-value {
	font-size: 1.5em;
}

.card-small-suit-top {
	align-self: flex-start;
}

.card-small-bottom {
	align-self: flex-end;
	transform: rotate(180deg);
}
</style>