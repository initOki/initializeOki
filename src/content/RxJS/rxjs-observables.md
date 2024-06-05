---
title: 'RxJS_2'
description: 'RxJS 구글 번역'
pubDate: 'Jun 05 2024'
heroImage: '/blog-placeholder-3.jpg'
linkPage: 'rxjs-observables'
---

### Observable
Observable은 여러 값의 지연 푸시 컬렉션입니다.

|       | SINGLE   | MULTIPLE  |
|-------|----------|-----------|
| Pull | Function | Iterator |
| Push | Promise  | Observable |

---

#### Example
다음은 구독 시 즉시(동기식) 값 1, 2, 3을 푸시하고 구독 호출 후 1초가 경과한 후 값 4를 푸시한 다음 완료하는 Observable입니다:
```javascript
const observable = new Observale((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
})
```
