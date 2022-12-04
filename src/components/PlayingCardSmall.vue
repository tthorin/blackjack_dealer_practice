<script setup>
defineProps({
	card: Object
})
</script>

<template>
	<div class="card-small" :class="card.color">
		<!--<span class="card-small-suit card-small-suit-top">{{ card.suit }}</span>
		<span class="card-small-value">{{ card.display }}</span>
		<span>{{card.id}}</span> This is just for debugging
		<span class="card-small-suit card-small-bottom">{{ card.suit }}</span>-->
		<img class="card-small-img" :src="card.image"/>
	</div>
</template>

<style scoped>
.card-small {
	width: 58px;
	height: 83px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	margin: 5px;
}
.card-small > img{
	width: 100%;
	height: 100%;
	border: 2px solid black;
	border-radius: 5px;
}
span{
	margin:0;
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
.shoe-card img{
	display: none;
}

@media (max-width: 768px) {
	.card-small-suit {
		font-size: 0.8em;
	}

	.card-small-value {
		font-size: 1.2em;
	}
}
</style>