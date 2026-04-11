import http from "k6/http";
import { check } from "k6";

export default function () {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/");

  // Good practice to check the response status and content to ensure the test is working as expected
  check(res, {
    "is status 200": (r) => r.status === 200,
    "page is startpage": (r) => r.body.includes("Public pages"),
  });
}
