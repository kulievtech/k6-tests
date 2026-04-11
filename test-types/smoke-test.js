import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 3, // number of virtual users to simulate
  duration: "30s", // total duration of the test
};

export default function () {
  http.get("https://quickpizza.grafana.com/test.k6.io/");
  sleep(1); // simulate user think time
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2); // simulate user think time
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2); // simulate user think time
}
