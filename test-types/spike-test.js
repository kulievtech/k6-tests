import http from "k6/http";
import { sleep } from "k6";

// 4 times more than the stress test for VUs

export const options = {
  stages: [
    { duration: "2m", target: 10000 }, // ramp up to 10,000 users over 2 minutes
    { duration: "1m", target: 0 }, // ramp down to 0 users over 1 minute
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
}
