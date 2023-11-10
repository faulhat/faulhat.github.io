---
layout: default
title: My Projects
permalink: /projects/
date: 2023-09-11
---

#### Project: riemann (Active)

`riemann` is a Linux graphing calculator with some analysis capabilities. I'm still actively developing it. User-provided expressions are just-in-time compiled into real subroutines using the [asmjit](https://github.com/asmjit/asmjit/) library, so that they can be computed for many, many values of `x` very quickly. The graphics are done using GTK.

<img class="inline-img" src="/assets/images/riemann_mc.png" />

My plans for the project going forward are to add support for graphing multiple functions at once, to add symbolic derivation, and to add automatic root finding/equation solving.

View the source code here: [Github](https://github.com/faulhat/riemann)

<br>

#### Project: _Bullet Heaven!_ (Complete)

_Bullet Heaven!_ is a bullet hell game (get it? :P ) that I created for my IB CS class's end-of-year game jam in 12th grade over the course of about ten days. 

<img class="inline-img" src="/assets/images/bh_screengrab.png" />

You can watch me play through the game here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/LAjp5RynJ2I?si=v1IJGZXf1CHi43Dm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="inline-frame"></iframe>

View the source code here: [Github](https://github.com/faulhat/bulletheaven)

<br>

#### Project: author-id (Complete)

`author-id` was my IA project (aka big whole-second-semester project) for IB CS. The premise of the project was that we had to make something for an actual client. My client was my AP Statistics teacher, Mr. Rice. The project is a tool to help him figure out, when a student turns in an assignment without writing their name, who the assignment belongs to (via handwriting classification).

The full documentation, formatted according to IB standards, is available on this site [here](/author_id/IA-docs/cover_page.htm).

You can watch the demo video from the above documentation on Youtube here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/dci1jO2SLgo?si=IaobODhDvVjFvTft" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="inline-frame"></iframe>

You can view the source code for the classification model here: [Github](https://github.com/faulhat/author-id-model)

You can view the source code for the webapp here: [Github](https://github.com/faulhat/author-id-server)

<br>

#### Project: particles (Complete)

`particles` is a very simple visualization of the particle swarm optimization algorithm written in TypeScript. It picks a random cubic polynomial, adds some random noise to it, and then uses PSO to try to approximate it.

<img class="inline-img" src="/assets/images/particles.png" />

You can try the program out for yourself [here](/particles/).

View the source code here: [Github](https://github.com/faulhat/particles)

<br>

#### Project: asm-experiments (Active?)

This is just a collection of small assembly programs I wrote for fun. I plan to add to it whenever inspiration strikes.

View the source code here: [Github](https://github.com/faulhat/asm-experiments)

<br>

#### Project: tomc (Abandoned)

`tomc` was my attempt at a C compiler. I lost interest in it before building in any actual compilation functionality, but it can still make cool graphical representations of C programs.

The program
```
#include <stdio.h>

int main(int argc, char *argv[])
{
    printf("Hello, world!");
    return 0;
}
```

is transformed into

<img class="inline-img" src="/assets/images/tree.png" />

View the source code here: [Github](https://github.com/faulhat/tomc)

<br>

#### Project: faulhat.github.io (Active)

This site is continuously in development as I come up with new things to add to it, as well as small aesthetic changes from time to time.

