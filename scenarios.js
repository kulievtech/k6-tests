import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

// <Metrics Reference>
// https://grafana.com/docs/k6/latest/using-k6/metrics/reference/

export const options = {
  vus: 10, // Number of virtual users
  duration: "10s", // Duration of the test
  thresholds: {
    // Define thresholds for performance metrics
    http_req_duration: ["p(95)<100"], // 95% of requests should complete in under 100ms
    http_req_duration: ["max<2000"], // Maximum request duration should be under 2000ms
    http_req_failed: ["rate<0.01"], // Fail if more than 1% of requests fail
    http_reqs: ["count>35"], // Ensure at least 35 requests are made during the test
    http_reqs: ["rate>4"], // Ensure at least 10 requests per second are made during the test
    vus: ["value>9"], // Ensure that at least 10 virtual users are active during the test
    checks: ["rate>=0.98"], // Ensure that at least 98% of checks pass during the test
  },
};

export default function () {
  const res = http.get(
    "https://quickpizza.grafana.com/test.k6.io/" + exec.scenario.iterationInTest === 1 ? "foo" : "",
  );

  // Good practice to check the response status and content to ensure the test is working as expected
  check(res, {
    "is status 200": (r) => r.status === 200,
    "page is startpage": (r) => r.body.includes("Public pages"),
  });

  sleep(2); // Simulate user think time
}
