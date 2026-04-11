import http from "k6/http";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    "http_req_duration{status:200}": ["p(95)<1000"],
    "http_req_duration{status:201}": ["p(95)<1000"],
  },
};

export default function () {
  http.get("https://dd5002ebe2654f63a08bb3ee2267360e.api.mockbin.io/");
  http.get("https://b712fb5d983f403686d3fb8d282561a7.api.mockbin.io/");
}
