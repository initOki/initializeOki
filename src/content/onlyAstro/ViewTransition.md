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
<br />
Broswer API를 기반으로 만들어져 있고 아래와 같은 기능을 포함하고 있다고 한다.  
<br />

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
```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<html>
  ...
  <head>
    ...
    <ViewTransition />
  </head>
  <body>
    ...
  </body>
</html>
```
위와 같은 방식으로 작성하면 된다.  

#### Full site view transitions (SPA mode)

해당 코드가 공유되는 모든 컴포넌트에 해당 코드를 적용시켜 공통적인 동작을 하게 할 수 있으며 애니메이션이 지원되지 않는 브라우저에서도 해당 기능이 동작하도록 제공하고 있다.  
<br />
아래의 코드처럼 사용하면 지원하지 않는 브라우저에서도 기본 fallback을 제어하는 옵션과 사이트 전체에 애니메이션을 추가할 수 있다.

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="generator" content={Astro.generator} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<ViewTransitions />
```

사용 예시
```astro
---
import DefaultHeader from 'src/components/DefaultHeader.astro';
---

<html>
    <head>
        <DefaultHeader title="My Astro Site" description="This is my Astro site" />
    </head>
    <bdoy>
        <slot />
    </body>
</html>
```
이 외에 추가적인 구성은 필요하지 않다.  
하지만 transition directives를 사용하거나 클라이언트 측에서 재정의를 한다면 더 세밀한 제어도 가능하다.

#### Transition Directives

이전 페이지와 새 페이지 모두 고유한 view transition을 자동으로 할당한다.
<br />
만약 navigation에 따라서 더 디테일한 제어를 원한다면 .astro 컴포넌트의 페이지 요소에 transition:* 지시어를 사용하면 된다.

- transition:name : 이전/새 컨텐츠 애니메이션에 대한 Astro의 default element에 대해서 재정의하고 한 쌍의 DOM 요소를 연결할 이름을 지정할 수 있다.
- transition:animate : Astro의 기본 애니메이션을 재정의 할 수 있다. Astro에 내장된 애니메이션을 사용하거나 사용자 정의된 애니메이션을 만들 수 있다.
- transition:persist : 다른 페이지로 이동할 때 이전 페이지를 새로운 element로 대체하는 Astro의 기본값을 재정의하면서 구성되어있는 요소와 HTML 요소를 유지한다.

##### Naming a transition

경우에 따라서 뷰의 전환 요소를 식별하고 싶거나 식별해야 될 수도 있다.
이때 transition:name을 사용해서 한 쌍의 DOM 요소를 연결할 이름을 지정할 수 있다.

```astro
// old-page.astro
<aside transition:name="hello" />
```

```astro
// new-page.astro
<aside transition:name="hello" />
```

해당 방식은 각 페이지에서 한번만 사용 할 수 있고 Astro에서 이름을 유추하지 못하거나 element를 더 세밀하게 제어하고 싶다면 이 값을 수동으로 설정하면 된다.

##### Maintaining State

transition:persist를 사용하면 다른 페이지로 이동할 때 이전 페이지를 새로운 element로 대체하는 Astro의 기본값을 재정의하면서 구성되어있는 요소와 HTML 요소를 유지한다.
<br />
예를 들어서 동영상을 재생시켜놓고 다른 페이지로 이동했을 때 동영상의 재생은 멈추지않고 지속된다.

```astro
<video controls="" autoplay="" transition:persist>
    <source src="movie.mp4" type="video/mp4">
</vide>
```
해당 지시어를 Astro island(client:directive가 있는 UI 프레임워크 컴포넌트)에 배치할 수도 있다.  
해당 컴포넌트가 다음 페이지에 있는 경우에 새 페이지의 컴포넌트로 대체되는 대신 이전 페이지의 컴포넌트는 현재 상태 그대로 계속 표시된다.
<br />
아래의 예시를 보면 transition:persist 속성이 있는 <Counter /> 컴포넌트가 포함 된 페이지를 앞, 뒤로 이동 할 때 컴포넌트 내부의 카운트 상태가 유지된다.

>
> 모든 상태가 이런 방식으로 유지 되는 것은 아니다. transition:persist를 사용하더라도 전환중에 발생하는 CSS 애니메이션의 재시작, iframe의 재로드는 불가피하다.
> 

island/element가 두 개의 페이지 사이에 있든 다른 컴포넌트에 있는 경우에는 해당 element를 수동으로 식별 할 수 있다.
