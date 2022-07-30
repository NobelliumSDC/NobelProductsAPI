import http from 'k6/http';
import { check , sleep } from 'k6';
export const options = {
  vus: 100,
  duration: '3s',
};
let url = 'http://127.0.0.1:5001/products/1000000'
export default function () {


  let res = http.get(url);
  check(res, { 'status was 200': (r) => r.status === 200,
               'duration was less than 200ms': r => r.timings.duration < 200
 });
}