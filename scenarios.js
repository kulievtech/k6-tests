import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // Number of virtual users
  duration: "10s", // Duration of the test
  thresholds: {
    // Define thresholds for performance metrics
    http_req_duration: ["p(95)<100"], // 95% of requests should complete in under 100ms
    http_req_failed: ["rate<0.01"], // Fail if more than 1% of requests fail
  },
};

export default function () {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/");

  // Good practice to check the response status and content to ensure the test is working as expected
  check(res, {
    "is status 200": (r) => r.status === 200,
    "page is startpage": (r) => r.body.includes("Public pages"),
  });

  sleep(2); // Simulate user think time
}
