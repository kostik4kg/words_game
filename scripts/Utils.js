export class Subject {
  observers = [];

  add_observer = (observer) => {
    this.observers.push(observer);
  };

  remove_observer = (observer) => {
    const observer_index = this.observers.indexOf(observer);
    if (observer_index !== -1) {
      this.observers.splice(observer_index, 1);
    } else {
      console.error("No such observer exists!");
    }
  };

  notify_all = () => {
    for (const o of this.observers) {
      if (o.onStateUpdate) {
        o.onStateUpdate();
      }
    }
  };
}

export function getMaxLetterCounts(words) {
  let maxLetterCount = {};
  words.forEach(word => {
    let letterCount = {};
    for (let letter of word) {
      if (letterCount[letter]) {
        letterCount[letter]++;
      } else {
        letterCount[letter] = 1;
      }
    }
    for (let letter in letterCount) {
      if (!maxLetterCount[letter] || letterCount[letter] > maxLetterCount[letter]) {
        maxLetterCount[letter] = letterCount[letter];
      }
    }
  });

  return maxLetterCount;
}