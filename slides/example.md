---
marp: true
theme: uic-cs
size: 16:9
paginate: true
title: "Example Lecture"
author: Your Name
---

<!-- _class: title -->
<!-- _paginate: false -->

# CS 000: Course Name

## Lecture Title

### Fall/2026

Your Name

<!--
Presenter notes go in HTML comments like this one.
They appear in presenter view (press p in the HTML deck).
-->

---

## Today's plan

| Time | Topic | Check-in |
|---|---|---|
| 0–10 | Slide basics | |
| 10–20 | Columns, code, and click-to-reveal | iClicker 1 |
| 20–25 | Helpers and wrap-up | |

---

<!-- _class: divider -->

# Part 1 · Slide basics
A section divider: `<!-- _class: divider -->`

---

## A normal content slide

- Titles are `##` headings and get the cyan bar automatically
- **Bold** text is navy; *emphasis* is red
- Inline `code` uses a monospace font
  - Nested bullets work as usual

> A blockquote is a highlighted call-out box.

---

## Two columns, revealed in steps

<div class="cols">
<div>

### Always visible
- Left column bullet
- Another bullet

</div>
<div>

* ### Appears on 1st click
  - `* ### Heading` + indented `-` bullets
  - reveal together as one step

* ### Appears on 2nd click
  - Still in the right column

</div>
</div>

---

## Code, then `<pause>`

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;       // ownership moves
    println!("{s1}");  // error[E0382]
}
```
<pause>
Everything after `<pause>` waits for a keypress, then fades in.
<pause>
- Each `<pause>` is one more click
- Works between list items, too

---

<!-- _class: clicker -->

## Q1 · Which line fails to compile?

Look at the code on the previous slide.

**A.** `let s1 = ...`
**B.** `let s2 = s1;`
**C.** `println!("{s1}");`
**D.** None, it compiles

<!-- ~90 seconds to vote. -->

---

<!-- _class: answer -->

## Q1 → **C. `println!("{s1}")`**

- `s1` was **moved** into `s2`, so it can no longer be used
- The compiler rejects the program instead of allowing a double free

---

## Tables, boxes, and helpers

| Feature | Markdown | Result |
|---|---|---|
| Good | `<span class="ok">✓</span>` | <span class="ok">✓ ok</span> |
| Bad | `<span class="bad">✗</span>` | <span class="bad">✗ bad</span> |
| Tag | `<span class="tag">NEW</span>` | <span class="tag">NEW</span> |

<div class="box">

**Box:** wrap content in `<div class="box">` for a tinted panel.

</div>

<span class="small">Small gray text: `<span class="small">`.</span>

---

<!-- _class: title -->
<!-- _paginate: false -->

# Questions?

### Thank you

Your Name · you@uic.edu
