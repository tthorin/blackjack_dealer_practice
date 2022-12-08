const bestTimes = [
  {
    date: "2018-01-01",
    time: 5995,
    mistakes: 1,
  },
  {
    date: "2018-01-02",
    time: 5996,
    mistakes: 2,
  },
  {
    date: "2018-01-03",
    time: 5997,
    mistakes: 3,
  },
  {
    date: "2018-01-04",
    time: 5998,
    mistakes: 4,
  },
  {
    date: "2018-01-05",
    time: 5999,
    mistakes: 5,
  },
];
function getBestTimes(version) {
  const localBestTimeVersion = localStorage.getItem("bestTimesVersion");
  if (!localBestTimeVersion || localBestTimeVersion < version) {
	console.log("Updating best times")
    localStorage.setItem("bestTimesVersion", version);
    localStorage.setItem("bestTimes", JSON.stringify({
		ElevenHands: bestTimes,
		DealerOnly: bestTimes,
	  }));
  }
  let localBestTimes = localStorage.getItem("bestTimes");
  if (!localBestTimes) {
    localStorage.setItem("bestTimes", JSON.stringify({
      ElevenHands: bestTimes,
      DealerOnly: bestTimes,
    }));
    localBestTimes = localStorage.getItem("bestTimes");
  }
  return JSON.parse(localBestTimes);
}
const updateBestTimes = (time,wrongAnswers,gameMode) => {
	console.log("time is", time)
	console.log("wrongAnswers is", wrongAnswers)
	console.log("gameMode is", gameMode)
	let localBestTimes = JSON.parse(localStorage.getItem("bestTimes"))
	let newBestTimes = localBestTimes[gameMode]
	const today = new Date()
	const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, '0')
	const entry = {
		date: date,
		time: time,
		mistakes: wrongAnswers
	}
	if (newBestTimes === null) {
		newBestTimes = []
	}
	newBestTimes.push(entry)
	newBestTimes.sort((a, b) => a.mistakes - b.mistakes || a.time - b.time)
	localBestTimes[gameMode] = newBestTimes.slice(0, 5)
	localStorage.setItem("bestTimes", JSON.stringify(localBestTimes))
}

export { getBestTimes, updateBestTimes};
