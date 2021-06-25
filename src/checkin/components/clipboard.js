const tempData = JSON.parse(
  '[{"_id":"60d2eb286df891cf6fdd7f44","slotDay":"THURSDAY","slotDate":"2021-06-24","slots":[{"slot":"6-7am","members":[{"member":"abc"}]},{"slot":"7-8am","members":[{"member":"abc"}]},{"slot":"5-6pm","members":[{"member":"abc"}]}]},{"_id":"60d409fd1ae5bf38338b6b17","slotDay":"THURSDAY","slotDate":"2021-06-24","slots":[{"slot":"6-7am"},{"slot":"7-8am"},{"slot":"5-6pm"}],"__v":0},{"_id":"60d40da51ae5bf38338b6b1b","slotDay":"THURSDAY","slotDate":"2021-06-24","slots":[{"slot":"6-7am"},{"slot":"7-8am"},{"slot":"5-6pm"}],"__v":0}]'
);

// console.info("temp:", tempData);

const reducedArray = tempData[0].slots.reduce((acc, current) => {
  console.log("tes:>", acc);
  if (current.slot === "6-7am") {
    acc.push({
      members: [...current.members, { member: "asdas" }],
      slot: current.slot,
    });
  }
  return acc;
}, []);

console.log("reducedArray:>", JSON.stringify(reducedArray));
