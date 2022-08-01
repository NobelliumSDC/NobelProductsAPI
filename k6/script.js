import http from 'k6/http';
import { check , sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '10s',
};
let url = `http://127.0.0.1:5001/products/${~~(Math.random() * 1900000)}/styles`
export default function () {

  let res = http.get(url);
  check(res, { 'status was 200': (r) => r.status === 200,
               'duration was less than 200ms': r => r.timings.duration < 200,
               'duration was less than 100ms': r => r.timings.duration < 100,
               'duration was less than 50ms': r => r.timings.duration < 50,
               'duration was less than 30ms': r => r.timings.duration < 30,
               'duration was less than 25ms': r => r.timings.duration < 25,
 });
}