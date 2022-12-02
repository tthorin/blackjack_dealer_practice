<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
	shouldRun: Boolean,
	shouldReset: Boolean
})
const emit = defineEmits(['timeAtStop','timerReset'])
const running = ref(false)
const time = ref(0)
const interval = ref(null)

const start = () => {
	running.value = true
	interval.value = setInterval(() => {
		time.value++
	}, 100)
}

const stop = () => {
	running.value = false
	emit('timeAtStop', time.value)
	clearInterval(interval.value)
}
const reset = () => {
	console.log("timer component reset got called")
	time.value = 0
	emit('timerReset')
}

watch(() => props.shouldRun, (newVal) => {
	if (newVal) {
		time.value = 0
		start()
	} else {
		stop()
	}
})
watch(() => props.shouldReset, (newVal) => {
	if (newVal) {
		reset()
	}
})
const tenths = computed(() => {
	return time.value % 10
})
const seconds = computed(() => {
	return (Math.floor(time.value / 10) % 60).toString().padStart(2, '0')
})
const minutes = computed(() => {
	return Math.floor(time.value / 600)
})
</script>

<template>
	<div>
		<p class="training-timer-display" :class="running ? 'active' : ''">{{ minutes }}:{{ seconds }}:{{ tenths }}</p>
	</div>
</template>

<style scoped>
.training-timer-display {
	font-size: 3rem;
	font-weight: 700;
	margin: 0;
}

.active {
	color: #fff;
	text-shadow: 0 0 20px rgb(206, 28, 28);
}
</style>