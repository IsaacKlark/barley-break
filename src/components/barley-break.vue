<template>
  <div>
    <h1>Barley break (пятнашки)</h1>
    <select v-if="game" class="size" v-on:change="e => size(e)" name="size" id="size">
      <option value="size">size</option>
      <option value="3">3x3</option>
      <option value="4">4x4</option>
      <option value="5">5x5</option>
      <option value="6">6x6</option>
      <option value="7">7x7</option>
    </select>
    <div v-if="game" class="table">
      <div v-for="row of numbers" :key="row.id" class="row">
        <div
          class="cell"
          v-for="number of row.row"
          :key="number"
          :class="{number: number}"
          v-on:click="e => remix(e)"
        >{{ number }}</div>
      </div>
    </div>
    <div v-else>
      <h2>Congratulations! You win!</h2>
      <button class="try-again" v-on:click="tryAgain">Try again</button>
    </div>
  </div>
</template>

<script>
import generateNumbers, 
{ originalNumbers, length } from "../scripts/generateNumbers";

export default {
  name: "barley-break",
  data: function() {
    return {
      numbers: generateNumbers(),
      game: true
    };
  },
  methods: {
    size: function(e) {
      const value = e.target.value;

      if (!isNaN(+value)) {
        this.numbers = generateNumbers(+value);
      }
    },
    tryAgain: function() {
      this.numbers = generateNumbers();
      this.game = true;
    },
    remix: function(e) {
      const clickedNumber = +e.target.innerText;
      let array = this.numbers.map(numbers => {
        return numbers.row;
      });
      let newResult = [];
      let change = true;

      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (
            change &&
            array[i][j] === clickedNumber &&
            array[i][j - 1] === ""
          ) {
            array[i][j - 1] = array[i][j];
            array[i][j] = "";
            change = false;
          } else if (
            change &&
            array[i][j] === clickedNumber &&
            array[i][j + 1] === ""
          ) {
            array[i][j + 1] = array[i][j];
            array[i][j] = "";
            change = false;
          } else if (
            change &&
            array[i - 1] &&
            array[i][j] === clickedNumber &&
            array[i - 1][j] === ""
          ) {
            array[i - 1][j] = array[i][j];
            array[i][j] = "";
            change = false;
          } else if (
            change &&
            array[i + 1] &&
            array[i][j] === clickedNumber &&
            array[i + 1][j] === ""
          ) {
            array[i + 1][j] = array[i][j];
            array[i][j] = "";
            change = false;
          }
        }

        if (array[i]) {
          newResult.push({
          row: array[i],
          id: "row" + i
        });
        }
      }

      this.numbers = newResult;

      if (originalNumbers.toString() === array.flat().toString()) {
        this.game = false;
      }

    }
  }
};
</script>

<style scoped>
.size {
  padding: 5px 10px;
  color: lightgreen;
  font-size: 20px;
  background-color: #4a4b50;
  border: 0;
  outline: 0;
}

.cell {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin: 5px;
}

.number:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(50, 50, 255, 1);
  border: 1px solid rgba(50, 50, 255, 1);
  transform: scale(1.1, 1.1);
  background-color: lightblue;
  color: blue;
}

.number {
  border: 1px solid black;
  transition: transform 0.2s;
  background-color: lightgray;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.try-again {
  padding: 10px 20px;
  border: 0;
  outline: 0;
  background-color: lightgreen;
  border-radius: 5px;
  transition: background-color 1s, color 1s;
}

.try-again:hover {
  cursor: pointer;
  background-color: lightblue;
  color: blue;
}
</style>