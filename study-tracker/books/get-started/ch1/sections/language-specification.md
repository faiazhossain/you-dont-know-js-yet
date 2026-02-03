# Get Started - Chapter 1: What Is JavaScript?

**Section**: Language Specification
**Source**: `../../../../ydkjs-books/get-started/ch1.md`
**Recommended Days**: Part of Days 5-6

---

## Key Concepts

### ECMAScript Specification

- TC39 manages the official specification for ECMAScript.
- They meet regularly to vote on agreed changes, then submit them to ECMA, the standards organization.
- The specification version (e.g., ES2019 = ES10) is indicated in the official ECMA URL (e.g., ecma-international.org/ecma-262/10.0/).

### TC39 Committee

- A group of 50–100 volunteers from web-invested companies (e.g., browser makers like Mozilla, Google, Apple; device makers like Samsung).
- Most are employees whose companies may compensate them for committee work.
- Meetings are held every other month for about three days, rotating among member company locations.

### Specification Process

- TNew proposals follow a five-stage process (Stage 0 to Stage 4).
- Stage 0: A TC39 member champions an idea.
- Stage 4: Proposal is ready for inclusion in the next yearly ECMAScript revision.
- Proposals are managed openly on TC39’s GitHub (github.com/tc39/proposals).
- Non-members can contribute to discussions, but only TC39 members can vote.

### Why the Spec Matters

- One JavaScript: There is only one official JS standard, managed by TC39 and ECMA.
- All major browsers and engines commit to complying with this single specification.
- This ensures consistency across environments (e.g., V8, SpiderMonkey) — no forked or incompatible versions.

### How to Read the Spec

- The official specification is hosted on ECMA International's website.
- It defines JS syntax, behavior, and features.
- Useful for understanding language details, edge cases, and new additions.

### The Web Rules Everything About (JS)

- The web is the dominant environment that rules JS development
- JS engines have 20+ years of observable behaviors that web content relies on
- Sometimes TC39 backtracks on spec changes if they would break existing web content
- Examples: `contains(..)` renamed to `includes(..)`, `flatten(..)` renamed to `flat(..)` (smooshgate)

### Appendix B: Web Browser Exceptions

- The JS spec includes Appendix B detailing mismatches between official spec and web reality
- Section B.1 and B.2: Additions to JS that web browsers include for historical reasons
  - `0`-prefixed octal literals
  - `escape(..)` / `unescape(..)` utilities
  - String helpers like `anchor(..)` and `blink()`
  - RegExp `compile(..)` method
- Section B.3: Conflicts where code may run differently in web vs non-web environments
  - Many relate to early errors in strict mode
- Best practice: Avoid Appendix B constructs to be future-safe
- ***

### Not All (Web) JS...

- Environment-specific APIs like `alert(..)`, `fetch(..)`, `getUserMedia(..)` are not in the JS spec
- These look like JS but are controlled by the environment running the JS engine
- `console.log(..)` is not specified in JS but defined by most JS environments by consensus
- Most "JS is inconsistent" complaints are actually about differences in environment behaviors, not JS itself
- An `alert(..)` call uses JS syntax, but `alert` itself is a guest, not part of the official spec
- ***

### It's Not Always JS

- Browser Developer Tools console/REPL is NOT a pure JS environment
- These tools prioritize Developer Experience (DX) over strict-spec compliance
- Quirks to watch out for:
  - Whether `var` or `function` declarations create real globals in console
  - Multiple `let` and `const` declarations in top-level scope
  - How `"use strict";` behaves across line entries
  - How `this` default-binding works in function calls
  - How hoisting works across multiple line entries
- Don't trust console behavior as exact JS semantics
- Think of console as a "JS-friendly" environment, not a pure one
- ***

## Code Examples

```javascript
// Example of spec-governed behavior:
// The `Array.prototype.flat` method (added in ES2019)
const arr = [1, [2, [3, [4]]]];
console.log(arr.flat(2)); // [1, 2, 3, [4]] – spec defines flattening depth

// Example: Temporal Dead Zone (TDZ) for let/const
// console.log(a); // ReferenceError – a is in TDZ
let a = 10; // Spec defines hoisting and TDZ behavior
```

---

## My Notes

- JS is not fragmented — the “multiple versions” myth is outdated (referring to old JScript days).
- The spec evolves yearly via a transparent, collaborative process.
- Learning the spec means learning one JS that works everywhere.

- ***

## Questions I Have

1.
2.
3.

---

## Confidence Level

**After First Read**: **3**/5
**After Deep Dive**: **4**/5

---

## Status

- [✅] First read complete
- [✅] Deep dive complete
- [❌] Practice exercises done

---

## Notes from Re-reading

## **Re-read #1 (Date: **\_\_\_**)**

-
