# Types & Grammar Visual Diagrams

**Purpose**: Visual explanations for types, coercion, and abstract operations

---

## Table of Contents

1. [JavaScript Types Overview](#1-javascript-types-overview)
2. [Type Coercion Flowchart](#2-type-coercion-flowchart)
3. [Abstract Operations](#3-abstract-operations)
4. [Equality Comparisons](#4-equality-comparisons)
5. [Truthy/Falsy Values](#5-truthyfalsy-values)
6. [The ToPrimitive Operation](#6-the-toprimitive-operation)

---

## 1. JavaScript Types Overview

### The Seven Built-in Types

```
┌─────────────────────────────────────────────────────────┐
│              JAVASCRIPT'S SEVEN TYPES                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐    ┌─────────────────────────┐   │
│  │   PRIMITIVES    │    │        OBJECTS          │   │
│  │  (6 types)      │    │      (1 type)           │   │
│  ├─────────────────┤    ├─────────────────────────┤   │
│  │                 │    │                         │   │
│  │  • String       │    │  • Object              │   │
│  │  • Number       │    │    (including arrays,   │   │
│  │  • BigInt       │    │     functions, dates)   │   │
│  │  • Boolean      │    │                         │   │
│  │  • Undefined    │    │  Sub-types of Object:   │   │
│  │  • Symbol       │    │  • Array               │   │
│  │                 │    │  • Function            │   │
│  │                 │    │  • Date                │   │
│  │                 │    │  • RegExp              │   │
│  │                 │    │  • Map, Set, etc.      │   │
│  └─────────────────┘    └─────────────────────────┘   │
│                                                         │
│  IMPORTANT:                                             │
│  • Primitives are immutable                            │
│  • Primitives are passed by value                      │
│  • Objects are passed by reference                     │
│  • null is technically primitive, but typeof is bug    │
│                                                         │
└─────────────────────────────────────────────────────────┘

TYPEOF RESULTS:
┌────────────────────────────────────────┐
│  value         → typeof(value)         │
├────────────────────────────────────────┤
│  "hello"       → "string"              │
│  42            → "number"              │
│  true          → "boolean"             │
│  undefined     → "undefined"           │
│  Symbol()      → "symbol"              │
│  42n           → "bigint"              │
│  {}            → "object"              │
│  []            → "object"              │
│  function(){}  → "function"            │
│  null          → "object" ← BUG!       │
└────────────────────────────────────────┘
```

---

## 2. Type Coercion Flowchart

### How JavaScript Converts Between Types

```
┌─────────────────────────────────────────────────────────┐
│              TYPE COERCION DECISION TREE               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  When performing operation with different types:        │
│                                                         │
│  1. What's the operator?                                │
│     └─┬───────────────────┬────────────────┐           │
│       │                   │                │           │
│       ↓                   ↓                ↓           │
│    [+, "string"]     [-, *, /, %]    [comparison]      │
│       │                   │                │           │
│       │                   │                │           │
│       ↓                   ↓                ↓           │
│    Concatenation    ToNumber both   ToNumber or       │
│    (if string)      operands        ToPrimitive       │
│                                         │             │
│                                         ↓             │
│                                    Abstract equality  │
│                                    (see section 4)    │
│                                                         │
└─────────────────────────────────────────────────────────┘

DETAILED COERCION RULES:

String + Number:
  "1" + 2    → "12"   (concatenation, not addition!)
  1 + "2"    → "12"   (concatenation)

String - Number:
  "5" - 2    → 3      (both to Number, subtract)
  5 - "2"    → 3      (both to Number, subtract)

Number * String:
  3 * "4"    → 12     (both to Number, multiply)

Comparison (<, >, <=, >=):
  5 < "10"   → true   (both to Number: 5 < 10)
  "10" < 5   → false  (both to Number: 10 < 5)
```

---

## 3. Abstract Operations

### ToNumber, ToString, ToBoolean Visual

```
┌─────────────────────────────────────────────────────────┐
│              ABSTRACT: ToNumber(value)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Undefined  → NaN                                      │
│  Null       → 0                                        │
│  true       → 1                                        │
│  false      → 0                                        │
│                                                         │
│  String:                                               │
│    "42"       → 42                                     │
│    "42px"     → NaN                                    │
│    ""         → 0                                      │
│    "0"        → 0                                      │
│    "hello"    → NaN                                    │
│                                                         │
│  Object:                                               │
│    1. ToPrimitive(input, "number")                     │
│    2. Then ToNumber(result)                            │
│                                                         │
│  Array:                                                │
│    []         → 0    (ToPrimitive → "")                │
│    [1]        → 1    (ToPrimitive → "1")               │
│    [1, 2]     → NaN  (ToPrimitive → "1,2")             │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              ABSTRACT: ToString(value)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Undefined  → "undefined"                              │
│  Null       → "null"                                   │
│  true       → "true"                                   │
│  false      → "false"                                  │
│                                                         │
│  Number:                                               │
│    42         → "42"                                   │
│    0          → "0"                                    │
│    NaN        → "NaN"                                  │
│    Infinity  → "Infinity"                              │
│                                                         │
│  Object:                                               │
│    1. ToPrimitive(input, "string")                     │
│    2. Then ToString(result)                            │
│                                                         │
│  Array:                                                │
│    []         → ""                                     │
│    [1, 2, 3]  → "1,2,3"                                │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              ABSTRACT: ToBoolean(value)                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  FALSY VALUES (→ false):                               │
│  ┌─────────────────────────────────┐                   │
│  │  • undefined                    │                   │
│  │  • null                         │                   │
│  │  • false                        │                   │
│  │  • 0, -0, 0n                    │                   │
│  │  • NaN                          │                   │
│  │  • "" (empty string)            │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
│  EVERYTHING ELSE IS TRUTHY (→ true):                   │
│  ┌─────────────────────────────────┐                   │
│  │  • "0"        (non-empty string)│                   │
│  │  • "false"    (non-empty string)│                   │
│  │  • []         (empty array)     │                   │
│  │  • {}         (empty object)    │                   │
│  │  • function() {}               │                   │
│  └─────────────────────────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Equality Comparisons

### == vs ===: What's the Difference?

```
┌─────────────────────────────────────────────────────────┐
│          == (LOOSE) vs === (STRICT) EQUALITY            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  === (STRICT):                                         │
│  ─────────────                                         │
│  • No type coercion                                    │
│  • Types must match                                    │
│  • Always prefer this!                                 │
│                                                         │
│  == (LOOSE):                                           │
│  ────────────                                          │
│  • Allows type coercion                                │
│  • Converts then compares                              │
│  • Follows complex algorithm                           │
│                                                         │
└─────────────────────────────────────────────────────────┘

== COERCION ALGORITHM:

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Type(x)          Type(y)          Result              │
│  ─────────        ─────────        ────                │
│                                                         │
│  null             undefined       true                │
│  undefined        null             true                │
│                                                         │
│  number           string          x == ToNumber(y)     │
│  string          number           y == ToNumber(x)     │
│                                                         │
│  boolean          any             ToNumber(x) == y     │
│  any             boolean          x == ToNumber(y)     │
│                                                         │
│  object           string/number   ToPrimitive(x) == y  │
│  string/number    object          x == ToPrimitive(y)  │
│                                                         │
│  otherwise                         false               │
│                                                         │
└─────────────────────────────────────────────────────────┘

SURPRISING RESULTS:

[] == []           → false   (different references)
[] == ![]          → true    (both coerce to 0!)
"0" == false       → true    (both coerce to 0)
"\t\n" == 0        → true    (whitespace to 0)
"" == 0            → true    ("" to 0)
null == undefined  → true    (special case)
```

---

## 5. Truthy/Falsy Values

### The Falsy List (Memorize These!)

```
┌─────────────────────────────────────────────────────────┐
│                   THE FALSY LIST                        │
│                  (Memorize these!)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. undefined                                          │
│  2. null                                               │
│  3. false                                              │
│  4. 0, -0 (positive/negative zero)                     │
│  5. 0n (BigInt zero)                                   │
│  6. NaN (Not a Number)                                 │
│  7. "" (empty string)                                  │
│                                                         │
│  EVERYTHING ELSE IS TRUTHY!                            │
│                                                         │
│  COMMON GOTCHAS (truthy!):                             │
│  ──────────────────────────────                       │
│  • "0"           (non-empty string)                   │
│  • "false"       (non-empty string)                   │
│  • []            (empty array)                        │
│  • {}            (empty object)                       │
│  • function() {}                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

BOOLEAN CONTEXTS WHERE THIS MATTERS:

1. if (value) { }
2. value ? true : false
3. !value, !!value
4. || and && operators
5. while (value) { }

TEST YOUR UNDERSTANDING:

!!"hello"         → true
!!""              → false
!!"0"             → true   (non-empty string!)
!!0               → false
!![]              → true   (array is truthy!)
!!{}              → true   (object is truthy!)

"hello" && 5      → 5      (both truthy, return last)
0 || "default"    → "default"  (0 is falsy)
```

---

## 6. The ToPrimitive Operation

### How Objects Convert to Primitives

```
┌─────────────────────────────────────────────────────────┐
│          ToPrimitive(input, PreferredType)             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  When an object needs to become a primitive:           │
│                                                         │
│  1. If input is primitive: return it                   │
│                                                         │
│  2. If input is object:                                │
│     a) Check forvalueOf/toString methods              │
│     b) Call in order based on PreferredType           │
│     c) Return primitive result                        │
│     d) Throw TypeError if no primitive result         │
│                                                         │
└─────────────────────────────────────────────────────────┘

PREFERRED TYPE HINT:

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Context           PreferredType                        │
│  ─────────         ───────────────                     │
│  String + Object   "string"                             │
│  [==] Object       "default" (acts like "number")      │
│  Math operations   "number"                             │
│                                                         │
│  "default" hint means: try number first, then string   │
│  "number" hint means: try number first, then string    │
│  "string" hint means: try string first, then number    │
│                                                         │
└─────────────────────────────────────────────────────────┘

valueOf/toString ORDER:

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Preferred: "number" or "default"                       │
│  ────────────────────────────────────                   │
│  1. Call valueOf()                                     │
│  2. If primitive, return it                            │
│  3. Otherwise, call toString()                         │
│  4. If primitive, return it                            │
│  5. Otherwise, throw TypeError                         │
│                                                         │
│  Preferred: "string"                                   │
│  ─────────────────────                                 │
│  1. Call toString()                                   │
│  2. If primitive, return it                            │
│  3. Otherwise, call valueOf()                          │
│  4. If primitive, return it                            │
│  5. Otherwise, throw TypeError                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

EXAMPLES:

var obj = {
    valueOf: function() { return 42; },
    toString: function() { return "hello"; }
};

String(obj)         → "hello"   (uses toString)
Number(obj)         → 42        (uses valueOf)
obj + ""            → "42"      (uses valueOf first!)
"" + obj            → "42"      (uses valueOf first!)

Array behavior:
var arr = [1, 2, 3];
arr.valueOf()       → arr itself (not primitive)
arr.toString()      → "1,2,3"

Number([1, 2, 3])    → NaN       ("1,2,3" → NaN)
String([1, 2, 3])    → "1,2,3"
```

---

## Quick Reference: Coercion Cheatsheet

```
┌─────────────────────────────────────────────────────────┐
│              COMMON COERCION EXAMPLES                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Expression        → Result       Why                  │
│  ──────────────────────────────────────────────────    │
│  1 + "2"           → "12"        concatenation          │
│  1 - "2"           → -1          both to Number         │
│  "1" * "2"         → 2           both to Number         │
│  1 + true          → 2           true → 1               │
│  1 + null          → 1           null → 0               │
│  1 + undefined     → NaN         undefined → NaN        │
│                                                         │
│  "0" == false       → true       both → 0               │
│  "" == false        → true       both → 0               │
│  [] == false        → true       both → 0               │
│  [] == []           → false      different refs        │
│                                                         │
│  Boolean([])        → true       array is truthy        │
│  Boolean("")        → false      empty string falsy     │
│  Boolean("0")       → true       non-empty string       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

*Created: 2026-02-03*
*Purpose: Visual learning aid for Types & Grammar (YDKJS Book 4)*
