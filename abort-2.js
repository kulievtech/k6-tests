import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "60s",
};

export default function () {
  const url = "https://httpbin.org/delay/5"; // This endpoint simulates a delay of 5 seconds
  const params = {
    timeout: "2s", // Set a timeout of 2 seconds
  };

  try {
    const response = http.get(url, params);
    console.log(`Response status: ${response.status}`);
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`); // Log the error message
  }

  sleep(1); // Sleep for 1 second before the next iteration
}

/*
This is a k6 load testing script that demonstrates timeout handling. Here's what's happening:

The Setup

- It targets httpbin.org/delay/5 — an endpoint that intentionally waits 5 seconds before responding.
- A 2-second timeout is configured in the request params.

The Flow

1. HTTP GET is made to the slow endpoint with a 2s timeout
2. Since the server takes 5s but the timeout is 2s, the request will always fail — k6 will abort it after 2 seconds and throw an error
3. The catch block logs the error message (something like "request timeout")
4. sleep(1) pauses for 1 second before the next iteration runs

The Intent

This script is likely meant to test or demonstrate how k6 handles timeouts gracefully — showing that your system/test won't hang indefinitely when a server is slow or unresponsive.
*/
