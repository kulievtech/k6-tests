import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  vus: 10, // Number of virtual users
  duration: "5s", // Duration of the test
  thresholds: {
    http_req_duration: ["p(95)<250"], // 95% of requests should complete in under 250ms
    my_counter: ["count>10"], // Ensure that the custom counter is incremented at least 10 times during the test
    response_time_news_page: ["p(95)<150", "p(99)<200"], // 95% of news page requests should complete in under 150ms
  },
};

let myCounter = new Counter("my_counter");
let newsPageResponseTrend = new Trend("response_time_news_page");

export default function () {
  let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
  myCounter.add(1); // Increment the custom counter
  sleep(1); // Simulate user think time

  res = http.get("https://quickpizza.grafana.com/news.php");
  newsPageResponseTrend.add(res.timings.duration); // Record the response time for the news page
  sleep(1); // Simulate user think time
}
