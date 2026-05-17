import { group, sleep, check } from "k6";
import http from "k6/http";
export { sleep, group, check } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<250"],
    // The `expected_response:true` tag is automatically added by k6 to requests
    // that receive a "successful" HTTP response (status 200–399). This threshold
    // isolates only those successful requests, so errors (4xx/5xx) don't skew
    // your latency percentiles — giving you a cleaner view of real performance.
    "http_req_duration{expected_response:true}": ["p(95)<250"],
    // Defining thresholds for groups is a bit different than for requests. You need to use the group name as a prefix, and then the metric you want to set the threshold for. For example, if you want to set a threshold for the duration of the "Main page" group, you would use:
    "group_duration{group:::Main page}": ["p(95)<100"],
    "group_duration{group:::Main page::Assets}": ["p(95)<150"],
    "group_duration{group:::News page}": ["p(95)<100"],
  },
};

export default function () {
  // group
  group("Main page", function () {
    const res = http.get("https://7d289ece66444200a76e9c608bdba1fa.api.mockbin.io/");
    check(res, {
      "status is 200": (r) => r.status === 200,
    });

    // sub-group
    group("Assets", function () {
      http.get("https://quickpizza.grafana.com/test.k6.io/static/css/site.css");
      http.get("https://quickpizza.grafana.com/test.k6.io/static/js/prisms.js");
    });
  });

  group("News page", function () {
    http.get("https://quickpizza.grafana.com/news.php");
  });

  sleep(1);
}

// k6 run groups.js --summary-mode=full
