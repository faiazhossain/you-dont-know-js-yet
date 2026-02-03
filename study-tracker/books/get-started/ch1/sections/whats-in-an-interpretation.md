# Get Started - Chapter 1: What Is JavaScript?

**Section**: What's in an Interpretation?
**Source**: `../../../../ydkjs-books/get-started/ch1.md`
**Recommended Days**: Part of Days 7-8

---

## Key Concepts

### Compiled vs Interpreted

- Historically, "interpreted" languages were looked down on as inferior
- Common misconceptions: Lack of performance, dynamic typing is "less mature"
- Distribution model (source vs binary) became less relevant over time
- What really matters: How errors are handled
- Interpreted: Line-by-line execution, errors discovered during runtime
- Compiled: Parsing phase first, static errors caught before execution
- ***

### How JavaScript Executes

- JS source code is parsed before execution (specification requirement)
- "Early errors" (static errors like duplicate parameter names) are reported before code runs
- JS engine does not commonly switch to line-by-line execution after parsing
- That would be highly inefficient
- ***

### Compilation in JavaScript

- JS follows the parsed → compiled → executed flow
- Parsed JS is converted to optimized binary byte code
- Byte code is handed to JS virtual machine for execution
- Some call VM execution "interpretation" but that's misleading
- By this definition, Java would also be "interpreted" (contradicts common understanding)
- In spirit and practice: **JS is a compiled language**
- ***

### JIT (Just-In-Time) Compilation

- JS engines can employ multiple passes of JIT processing/optimization
- Post-parsing optimization stages
- Can be labeled "compilation" or "interpretation" depending on perspective
- Fantastically complex situation under the hood
- Multiple passes refine and convert the code further
- ***

### Why This Matters for Your Code

- Static errors (malformed syntax) are reported before execution
- This is substantively different from traditional scripting programs
- More helpful interaction model
- Understanding this explains: early errors, hoisting, scope behavior
- ***

### Web Assembly (WASM)

- **ASM.js**: A subset of valid JS that signals typing information to enable engine optimizations
  - Never meant to be authored by developers
  - Result of transpilation from languages like C
  - Demonstrated by Mozilla's Unreal 3 game engine port running at 60fps in browsers
- **WASM**: A binary representation format that can be processed by JS engines with minimal parsing
  - Designed for non-JS programs (C, Go, Rust, etc.) to run in the browser
  - Ahead-of-Time (AOT) compiled binary format, not text like JS
  - Skips JS parsing/compilation overhead for faster startup
- **Why WASM Matters**:
  - Brings more parity for non-JS languages to the web platform
  - Relieves pressure to add JS features only needed by transpiled languages
  - Allows languages like Go to use features JS doesn't have (e.g., threads)
- **WASM != JS replacement**:
  - WASM is not suitable for sourcing from JS/TS due to lack of static typing
  - AssemblyScript attempts to bridge JS/TS to WASM
  - WASM augments what the web can accomplish, not replacing JS
  - WASM is evolving beyond the web as a cross-platform VM
- ***

---

## Code Examples

```javascript
// Examples showing execution behavior

// Traditional interpreted (scripting) language:
// Line 1 executes
// Line 2 executes
// Line 3 has error -> error discovered only after lines 1-2 ran

// Compiled language like JS:
// Parse entire file first
// Line 3 has error -> error caught before ANY code runs

// JS compilation flow:
// 1. Source code -> Transpilation (Babel, Webpack)
// 2. Parse to Abstract Syntax Tree (AST)
// 3. Convert to byte code (binary IR)
// 4. Optimize with JIT compiler
// 5. Execute in VM

// ASM.js example (transpiled, not handwritten):
function add(a, b) {
    a = a|0;  // Tells JS engine: treat as 32-bit integer
    b = b|0;
    return (a + b)|0;
}

// WASM binary format (not human-readable):
// Compiles from C/Rust/Go to binary .wasm file
// Loaded and executed with minimal parsing overhead
```

---

## My Notes

-
-

---

## Questions I Have

1.
2.
3.

---

## Confidence Level

**After First Read**: _____/5
**After Deep Dive**: _____/5

---

## Status

- [ ] First read complete
- [ ] Deep dive complete
- [ ] Practice exercises done

---

## Notes from Re-reading

**Re-read #1 (Date: _______)**
-
-
