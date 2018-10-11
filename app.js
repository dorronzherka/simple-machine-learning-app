// Requring Brain.js
const brain = require("brain.js");

// Requiring dataset
const data = require("./data.json");

// Requiring Cli Progress
const _cliProgress = require("cli-progress");

// Intializing the progress bar
const bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
// Intializing neural network
const newtork = new brain.recurrent.LSTM();

// Formatting dataset
const trainingData = data.map(item => ({
  input: item.name,
  output: item.gender
}));

// Starting the progress bar
bar.start(2000, 0);
// Training the neural network with the dataset
newtork.train(trainingData, {
  iterations: 2000,
  callback: data => {
    bar.update(data.iterations);
  },
  callbackPeriod: 10
});

// Running data in neural network
const output = newtork.run(`${process.argv[2]}`);
bar.stop();
console.log(`Gender: ${output}`);
