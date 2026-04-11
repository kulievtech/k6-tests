import http from "k6/http";
import { sleep } from "k6";

// Elastic scaling - Check if the application supports endless scalability.

export const options = {
  stages: [
    { duration: "2h", target: 100000 }, // ramp up to 10,000 users over 2 minutes
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
}
