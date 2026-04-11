import http from "k6/http";
import { Counter } from "k6/metrics";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<400"], // Global threshold
    "http_req_duration{page:order}": ["p(95)<350"], // Tag-based threshold
    http_errors: ["count==0"], // Global threshold
    "http_errors{page:order}": ["count==0"], // Tag-based threshold
    checks: ["rate>0.99"], // Global threshold
    "checks{page:order}": ["rate>0.99"], // Tag-based threshold
  },
};

let httpErrors = new Counter("http_errors");

export default function () {
  let res = http.get("https://dd5002ebe2654f63a08bb3ee2267360e.api.mockbin.io/");

  if (res.error) {
    httpErrors.add(1);
  }

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  res = http.get("https://b712fb5d983f403686d3fb8d282561a7.api.mockbin.io/", {
    tags: {
      page: "order",
    },
  });

  if (res.error) {
    httpErrors.add(1, { page: "order" });
  }

  check(
    res,
    {
      "status is 201": (r) => r.status === 201,
    },
    { page: "order" },
  );

  sleep(1);
}
