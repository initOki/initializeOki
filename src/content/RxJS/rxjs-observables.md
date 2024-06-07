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

##### Example
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

observable.subscribe({
  next(x) {
    toast.success('got value ' + x);
  },
  error(err) {
    toast.error('something wrong occurred: ' + err);
  },
  complete() {
    toast.success('done');
  },
});
```
(공식문서에서는 console.log()를 사용하지만, 여기서는 toast를 사용했습니다.)

---

##### Pull versus Push
Pull과 Push는 데이터 생산자가 데이터 소비자와 통신하는 방법을 설명하는 두 가지 프로토콜입니다.

**What is Pull?** Pull systems에서 소비자는 데이터 생산자로부터 데이터를 받는 시기를 결정합니다. 생산자는 데이터가 언제 소비자에게 전달될지 알 수 없습니다.

모든 자바스크립트 함수는 Pull system입니다. 함수는 데이터의 생산자이며, 함수를 호출하는 코드는 호출에서 하나의 반환값을 "끌어와"("pulling") 데이터를 소비합니다.

ES2015에는 Pull system의 또 다른 유형인 제너레이터 함수와 이터레이터(함수*)가 도입되었습니다. iterator.next()를 호출하는 코드는 반복자(생산자)로부터 여러 값을 "끌어오는" 소비자 역할을 합니다.

|       | PRODUCER   | CONSUMER  |
|-------|----------|-----------|
| **Pull** | **Passive:** 요청이 있을 때 데이터를 생성  | **Active:** 데이터 요청 시기를 결정 |
| **Push** | **Active:** 일정한 속도로 데이터를 생성 | **Passive:** 수신된 데이터에 반응  |

<br />

**What is Push?** 푸시 시스템에서는 생산자가 소비자에게 데이터를 전송할 시기를 결정합니다. 소비자는 해당 데이터를 언제 받을지 알 수 없습니다.  

프로미스는 오늘날 자바스크립트에서 가장 일반적인 푸시 시스템 유형입니다. 프로미스(프로바이더)는 확인된 값을 등록된 콜백(소비자)에 전달하지만, 함수와 달리 해당 값이 콜백에 "푸시"되는 정확한 시점을 결정하는 것은 프로미스입니다.

RxJS는 자바스크립트를 위한 새로운 푸시 시스템인 옵저버블을 도입했습니다. 옵저버블은 여러 값을 생성하여 옵저버(소비자)에게 "푸시"하는 프로바이더입니다.

- 함수는 호출 시 단일 값을 동기적으로 반환하는 느리게 평가되는 연산입니다.
- 제너레이터는 반복 시 0에서 (잠재적으로) 무한대의 값을 동기적으로 반환하는 느리게 평가되는 계산입니다.
- 프로미스는 최종적으로 하나의 값을 반환할 수도 있고 반환하지 않을 수도 있는 계산입니다.
- Observable은 느리게 평가되는 연산으로, 호출된 시점부터 0에서 (잠재적으로) 무한대 값까지 동기 또는 비동기적으로 반환할 수 있습니다.

>
> 옵저버블을 프로미스로 변환할 때 사용하는 방법에 대한 자세한 내용은 [이 가이드](https://rxjs.dev/deprecations/to-promise)를 참조하세요.
>

---

#### Observables as generalizations of functions
흔히 알려진 것과는 달리 Observables는 이벤트이미터와 같지 않으며 여러 값에 대한 프로미스와도 다릅니다. 옵저버블은 일부 경우, 즉 RxJS Subjects를 사용하여 멀티캐스트하는 경우 이벤트이미터처럼 동작할 수 있지만 일반적으로는 이벤트이미터처럼 동작하지 않습니다.

>
> 옵저버블은 인수가 0인 함수와 같지만 여러 값을 허용하도록 일반화합니다.
>

아래 부분을 참고해봅시다.
```javascript
function foo() {
  console.log('Hello');
  return 42;
}

const x = foo.call(); // same as foo()
console.log(x);
const y = foo.call(); // same as foo()
console.log(y);
```

결과값은 아래와 같습니다.
```
"Hello"
42
"Hello"
42
```

Obaservables를 사용해서 위와 동일한 동작을 작성할 수 있습니다.
```javascript
import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe((x) => {
  console.log(x);
});
foo.subscribe((y) => {
  console.log(y);
});
```
이는 함수와 Observables가 모두 지연 계산이기 때문에 발생합니다. 함수를 호출하지 않으면 console.log('Hello')가 발생하지 않습니다. 옵저버블의 경우에도 (구독을 사용하여) "호출"하지 않으면 console.log('Hello')가 발생하지 않습니다. 또한 "호출" 또는 "구독"은 분리된 작업으로, 두 개의 함수 호출은 두 개의 개별 부작용을 트리거하고 두 개의 Observable 구독은 두 개의 개별 부작용을 트리거합니다. 부작용을 공유하고 구독자의 존재 여부에 관계없이 열심히 실행하는 EventEmitters와 달리 Observables는 공유 실행이 없으며 지연이 발생합니다.