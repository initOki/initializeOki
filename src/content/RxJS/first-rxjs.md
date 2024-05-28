---
title: 'RxJS'
description: 'RxJS 구글 번역'
pubDate: 'Jul 08 2022'
heroImage: '/blog-placeholder-3.jpg'
---

### Introduction
RxJS는 관찰 가능한 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 구성하기 위한 라이브러리입니다. 비동기 이벤트를 컬렉션으로 처리할 수 있도록 하나의 핵심 유형인 Observable, 위성 유형(Observer, Schedulers, Subjects) 및 Array 메소드(map, filter, Reduce, Every 등)에서 영감을 받은 연산자를 제공합니다.
> 
> Think of RxJS as Lodash for events.
> 
ReactiveX는 [Observer 패턴](https://en.wikipedia.org/wiki/Observer_pattern)과 [Iterator 패턴](https://en.wikipedia.org/wiki/Iterator_pattern), [함수형 프로그래밍과 컬렉션](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions)을 결합하여 이벤트 시퀀스를 관리하는 이상적인 방법에 대한 요구를 충족합니다.

비동기 이벤트 관리를 해결하는 RxJS의 필수 개념은 다음과 같습니다.

- Observable: 호출 가능한 미래 가치 또는 이벤트 모음 아이디어를 나타냅니다.
- Observer: Observable에서 발생하는 이벤트에 반응하는 콜백 컬렉션입니다.
- Subscription: Observable의 실행을 나타내는 개체입니다. 취소에 용이합니다.
- Operators: map, filter, concat, flatMap 등과 같은 순수 함수입니다. 이러한 함수는 Observable 인스턴스를 반환하며, 이러한 함수를 사용하여 이벤트 스트림을 조작할 수 있습니다.
- Subject: Observable 및 Observer 역할을 모두 수행할 수 있는 특별한 유형의 Observable입니다. 이러한 유형의 Observable는 여러 Observer에게 동시에 데이터를 전달할 수 있습니다.
- Schedulers: RxJS의 실행 컨텍스트를 나타내는 개체입니다. 이러한 개체는 setTimeout, requestAnimationFrame, Node.js의 setImmediate 및 다른 것과 같은 실행 컨텍스트를 나타낼 수 있습니다.
