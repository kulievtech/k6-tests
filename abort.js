import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "60s",
};

export function setup() {
  const res = http.get("https://hel-lo-world.k6.io");
  if (res.error) {
    exec.test.abort(`Aboring test, application is down. Error: ${res.error}`);
  }
}

export default function () {
  http.get("https://some-page.io");
  sleep(1);
}
