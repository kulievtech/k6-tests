import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // ramp-up to 10 users over 10 seconds
    { duration: "30s", target: 10 }, // stay at 10 users for 30 seconds
    { duration: "10s", target: 0 }, // ramp-down to 0 users over 10 seconds
  ],
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}
