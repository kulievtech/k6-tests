import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 2,
  duration: "5s",
};

// In k6, there are 4 stages of execution:
// 1. init stage: executed once per VU, before the test starts
// 2. setup stage: executed once per test, before the VU stage
// 3. VU stage: executed by each VU, for the duration of the test
// 4. teardown stage: executed once per test, after the VU stage

console.log(" -- init stage --");

export function setup() {
  console.log(" -- Setup stage --");
  sleep(10);
  const data = { foo: "bar" };
  return data;
}

export default function (data) {
  console.log(" -- VU stage --");
  console.log(`Data from setup: ${JSON.stringify(data)}`);
  sleep(1);
}

export function teardown(data) {
  console.log(" -- Teardown stage --");
  console.log(`Data from setup: ${JSON.stringify(data)}`);
}
