<script setup>
import { ref,computed } from 'vue';

const emit = defineEmits(['updateDisplay'])

const props = defineProps({
	bestTimes: Object
})

const bestTimes = ref(localStorage.getItem('bestTimes') ? JSON.parse(localStorage.getItem('bestTimes')) : props.bestTimes)

function getMinutes(time) {
return Math.floor(time / 600);
}
const getSeconds = (time) => {
	return (Math.floor(time / 10) % 60).toString().padStart(2, '0')
}
const getTenths = (time) => {
	return time % 10
}
const getTimeString = (time) => {
	return `${getMinutes(time)} minutes ${getSeconds(time)},${getTenths(time)} seconds`
}
</script>

<template>
	<div class="best-times">
		<h1>UNDER CONSTRUCTION</h1>
		<h2>Best Times</h2>
		<h3>Dealer Only:</h3>
		<div class="best-times-list">
			<ul >
				<li v-for="(time,index) in bestTimes" :key="`time-${index}`" class="best-time">
					<span class="best-time-name">{{ time.date }}: </span>
					<span class="best-time-time">{{ getTimeString(time.time) }}, </span>
					<span class="best-time-name">{{ time.mistakes }} mistakes. </span>
				</li>
			</ul>
		</div>
		<button class="back-button" @click="emit('updateDisplay','main')">Back</button>
	</div>
</template>

<style scoped>
.best-times {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
}
@media (max-width: 768px) {
h1{
	font-size: 1.5em;
}	

}
</style>