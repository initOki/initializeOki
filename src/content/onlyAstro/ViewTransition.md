---
title: 'ViewTransition'
description: '뷰트랜지션에 대해서 사용해보고 적어보려고 한다.'
pubDate: 'Jun 25 2024'
heroImage: '/blog-placeholder-3.jpg'
linkPage: 'ViewTransition'
---

#### ViewTransition
<br />
Astro에서는 opt-in, per-page, view transitions를 지원하는데 이중에서 view transitions에 대해서 사용해보고 적어보려고 한다.  
Broswer API를 기반으로 만들어져 있고 아래와 같은 기능을 포함하고 있다고 한다.  

- fade, slide, none과 같은 몇가지 기본으로 제공하는 옵션이 있다.
- 이전페이지, 다음페이지 기능에서 애니메이션을 지원한다.
- 원한다면 모든 부분을 직접 커스터마이징 할 수 있다.
- 페이지가 아니라 링크에 대한 클라이언트 측에서 탑색을 방지하는 옵션이 있다.
- 아직 View Transition APIs를 지원하는 않는 브라우저에서도 작동한다.
- prefers-reduced-motion에 대해서 자동지원한다.

>
> 기본적으로는 모든 페이지에서 일반, 전체 페이지, 브라우저 탐색이 사용된다. view transition을 사용하게 될 경우 페이지별로 또는 사이트 전체에서 사용 할 수 있다.
> 

사용방법은 상당히 간단하다.

<br />
<br />

```html
<head>
  <ViewTransition />
</head>
```
위와 같은 방식으로 작성하면 된다.  
해당 부분은 Layout과 같이 공통으로 사용하는 곳에 작성하게 되면 해당 Layout내에서 작동하는 페이지들에 공통으로 적용 할 수 있다.

