# Visual Concept Diagrams

**Purpose**: Visual explanations for abstract JavaScript concepts

---

## Table of Contents

1. [Scope Chain](#1-scope-chain)
2. [Closure](#2-closure)
3. [Prototype Chain](#3-prototype-chain)
4. [This Binding Rules](#4-this-binding-rules)
5. [Hoisting](#5-hoisting)
6. [Type Coercion](#6-type-coercion)
7. [TDZ (Temporal Dead Zone)](#7-tdz-temporal-dead-zone)

---

## 1. Scope Chain

### Concept: Nested Scope Lookup

When JavaScript looks for a variable, it starts in the current scope and works outward until it finds it or reaches the global scope.

```javascript
var teacher = "Kyle";           // Global Scope

function otherClass() {
    var teacher = "Suzy";       // otherClass Scope

    function learn() {
        var teacher = "Gunnar"; // learn Scope
        console.log(teacher);   // Which one?
    }
}
```

### Visual Scope Chain

```
┌─────────────────────────────────────────────────────────┐
│                    GLOBAL SCOPE                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  teacher = "Kyle"                               │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │     otherClass() SCOPE                     │ │  │
│  │  │  ┌──────────────────────────────────────┐  │ │  │
│  │  │  │  teacher = "Suzy"                    │  │ │  │
│  │  │  │                                       │  │ │  │
│  │  │  │  ┌────────────────────────────────┐  │  │ │  │
│  │  │  │  │    learn() SCOPE               │  │  │ │  │
│  │  │  │  │  ┌──────────────────────────┐  │  │  │ │  │
│  │  │  │  │  │  teacher = "Gunnar"      │  │  │  │ │  │
│  │  │  │  │  │  console.log(teacher)    │  │  │  │ │  │
│  │  │  │  │  │  ↑ Finds "Gunnar" HERE!  │  │  │  │ │  │
│  │  │  │  │  └──────────────────────────┘  │  │  │ │  │
│  │  │  │  └────────────────────────────────┘  │  │ │  │
│  │  │  └──────────────────────────────────────┘  │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

SCOPE LOOKUP:
learn() looks for "teacher" → Found! (stops here)
If not found, would check otherClass() → then Global
```

### Shadowing Visual

```
┌──────────────────────────────────────────┐
│           GLOBAL SCOPE                   │
│  ┌────────────────────────────────────┐  │
│  │  x = "Global"                      │  │
│  │                                    │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │    OUTER SCOPE               │  │  │
│  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │  x = "Outer"           │  │  │  │
│  │  │  │                        │  │  │  │
│  │  │  │  ┌──────────────────┐  │  │  │  │
│  │  │  │  │  INNER SCOPE     │  │  │  │  │
│  │  │  │  │  ┌────────────┐  │  │  │  │  │
│  │  │  │  │  │ x = "Inner"│  │  │  │  │  │
│  │  │  │  │  │ ↑ USES THIS│  │  │  │  │  │
│  │  │  │  │  └────────────┘  │  │  │  │  │
│  │  │  │  └──────────────────┘  │  │  │  │
│  │  │  │  Global x is SHADOWED!  │  │  │  │
│  │  │  └────────────────────────┘  │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## 2. Closure

### Concept: Function Remembering Scope

A closure allows a function to access variables from its outer scope even after the outer function has finished executing.

```javascript
function makeCounter() {
    var count = 0;           // This variable "dies" when makeCounter() returns

    return function() {      // But this inner function REMEMBERS it
        count = count + 1;
        return count;
    };
}

var counter = makeCounter(); // makeCounter() is DONE
counter();                   // Yet "count" still exists! (CLOSURE)
```

### Closure Lifecycle Visual

```
STEP 1: Before makeCounter() is called

┌──────────────────────┐
│   GLOBAL SCOPE       │
│                      │
│  [no variables]      │
└──────────────────────┘

STEP 2: makeCounter() executes

┌─────────────────────────────────────────┐
│   GLOBAL SCOPE                          │
│  ┌─────────────────────────────────────┐│
│  │   makeCounter() SCOPE               ││
│  │  ┌───────────────────────────────┐  ││
│  │  │  count = 0                    │  ││
│  │  │                               │  ││
│  │  │  ┌─────────────────────────┐  │  ││
│  │  │  │  inner function () {    │  │  ││
│  │  │  │    count = count + 1    │  │  ││
│  │  │  │    return count         │  │  ││
│  │  │  │  }                      │  │  ││
│  │  │  └─────────────────────────┘  │  ││
│  │  │         ↑                     │  ││
│  │  │    Closes over 'count'        │  ││
│  │  └───────────────────────────────┘  ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘

STEP 3: makeCounter() RETURNS

┌─────────────────────────────────────────┐
│   GLOBAL SCOPE                          │
│  ┌─────────────────────────────────────┐│
│  │  counter = reference to inner func ││
│  │         ↓                           ││
│  │    [CLOSURE]                        ││
│  │     ┌─────────────────────────┐    ││
│  │     │  count = 0  ← PRESERVED!│    ││
│  │     └─────────────────────────┘    ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
       makeCounter() scope is GONE
       BUT count is kept alive by closure!

STEP 4: counter() is called

┌─────────────────────────────────────────┐
│   GLOBAL SCOPE                          │
│  ┌─────────────────────────────────────┐│
│  │  counter() → accesses closure       ││
│  │     ↓                               ││
│  │    [CLOSURE]                        ││
│  │     ┌─────────────────────────┐    ││
│  │     │  count = 1  ← UPDATED!  │    ││
│  │     └─────────────────────────┘    ││
│  │                                      ││
│  │  returns 1                          ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Closure in Loops (The Classic Problem)

```javascript
// PROBLEM CODE:
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i); // Logs: 4, 4, 4 (not 1, 2, 3!)
    }, 1000);
}
```

```
┌─────────────────────────────────────────────┐
│  Why does this log "4" three times?        │
├─────────────────────────────────────────────┤
│                                             │
│  Loop execution:                            │
│  i = 1 → setTimeout(function() {...})      │
│  i = 2 → setTimeout(function() {...})      │
│  i = 3 → setTimeout(function() {...})      │
│  i = 4 → loop ends                         │
│                                             │
│  All three functions close over the SAME   │
│  variable `i` (not copies of it!)          │
│                                             │
│  When callbacks run (1 second later):      │
│  They all read the current value of `i`    │
│  Which is... 4!                             │
│                                             │
└─────────────────────────────────────────────┘

SOLUTION 1: IIFE (create new scope)
SOLUTION 2: let (block-scoped per iteration)
SOLUTION 3: Function factory with parameter
```

---

## 3. Prototype Chain

### Concept: Delegation Lookup

Objects can delegate property access to other objects via the `[[Prototype]]` chain.

```javascript
var parent = { name: "Parent" };
var child = Object.create(parent);
child.age = 10;

console.log(child.name); // Found in parent!
console.log(child.age);  // Found in child
```

### Prototype Chain Visual

```
┌─────────────────────────────────────────────────────────┐
│                    PROTOTYPE CHAIN                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐                                       │
│  │    child     │                                       │
│  │  ┌────────┐  │       [[Prototype]]                  │
│  │  │ age:10 │  │ ──────────────────────────┐           │
│  │  └────────┘  │                            │           │
│  │  (no name)   │                            ↓           │
│  └──────────────┘                   ┌──────────────┐    │
│                                    │   parent     │    │
│                                    │  ┌────────┐  │    │
│         LOOKUP: "name"             │  │name:"P"│  │    │
│            ↓                       │  └────────┘  │    │
│      1. Check child               │  (no age)   │    │
│         Not found!                │             │    │
│            ↓                       │  [[Prototype]]│    │
│      2. Check parent ────────────  │ ──────────┐  │    │
│         Found it! "Parent"                   │  │    │
│            ↑                              ↓  │    │    │
│         Use this value               ┌─────────┴──┴─┐  │
│                                     │ Object.prototype││
│                                     │  (has toString)││
│                                     │  └─────────────┘│
│                                     │  [[Prototype]]  ││
│                                     │        ↓        ││
│                                     └─────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Property Lookup Algorithm

```
When accessing obj.property:

1. Check if property exists on obj directly
   └─ YES → Return it (DONE)
   └─ NO  → Continue to step 2

2. Check if obj has a [[Prototype]]
   └─ NO  → Return undefined (DONE)
   └─ YES → Continue to step 3

3. Look for property on [[Prototype]] object
   └─ Found → Return it (DONE)
   └─ Not found → Repeat from step 2 with [[Prototype]]

This continues until:
- Property is found, OR
- [[Prototype]] is null (end of chain)
```

---

## 4. This Binding Rules

### Decision Tree for `this`

```
┌─────────────────────────────────────────────────────────┐
│           HOW WAS THE FUNCTION CALLED?                 │
└────────────────────┬────────────────────────────────────┘
                     │
      ┌──────────────┼──────────────┬──────────────┐
      │              │              │              │
      ↓              ↓              ↓              ↓
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  new Fn()│   │obj.method│   │call/apply│   │  fn()    │
│          │   │          │   │  /bind   │   │          │
└─────┬────┘   └─────┬────┘   └─────┬────┘   └─────┬────┘
      │              │              │              │
      │              │              │              │
      ↓              ↓              ↓              ↓
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│NEW BINDING│  │IMPLICIT  │  │EXPLICIT  │  │DEFAULT   │
│           │  │BINDING   │  │BINDING   │  │BINDING   │
│this = new │  │this = obj│  │this =    │  │this =    │
│object     │  │before dot│  │specified │  │global    │
│           │  │          │  │object    │  │(undefined │
└──────────┘   └──────────┘   │          │  │in strict)│
                              └──────────┘   └──────────┘

EXAMPLES:

1. NEW BINDING:
   var person = new Person("Kyle");
   // this → the newly created person object

2. IMPLICIT BINDING:
   person.greet();
   // this → person (object before the dot)

3. EXPLICIT BINDING:
   greet.call(person);
   greet.apply(person);
   var fn = greet.bind(person);
   // this → person (explicitly specified)

4. DEFAULT BINDING:
   greet();
   // this → global (or undefined in strict mode)
```

---

## 5. Hoisting

### Concept: Variable Declarations Move to Top

During compilation, variable and function declarations are "hoisted" to the top of their scope.

```javascript
console.log(name); // undefined (not ReferenceError!)
var name = "Kyle";

// What JS actually sees:
var name;           // Declaration hoisted
console.log(name);  // undefined
name = "Kyle";      // Assignment stays in place
```

### Hoisting Visual: `var` vs `let` vs `function`

```
┌─────────────────────────────────────────────────────────┐
│                   HOISTING COMPARISON                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CODE AS WRITTEN:                                       │
│  ─────────────────                                      │
│  console.log(a);                                        │
│  console.log(b);                                        │
│  console.log(c);                                        │
│  console.log(d);                                        │
│                                                         │
│  var a = 1;                                             │
│  let b = 2;                                             │
│  const c = 3;                                           │
│  function d() { return 4; }                             │
│                                                         │
│  WHAT JS SEES (after hoisting):                         │
│  ──────────────────────────────                         │
│  function d() { return 4; }  // function: fully hoisted │
│                                                         │
│  var a;                     // var: declaration hoisted │
│  // TDZ for b               // let/const: in TDZ        │
│  // TDZ for c                                          │
│                                                         │
│  console.log(a);  → undefined (var declared, not set)  │
│  console.log(b);  → ReferenceError (in TDZ!)           │
│  console.log(c);  → ReferenceError (in TDZ!)           │
│  console.log(d);  → [Function: d] (fully available)    │
│                                                         │
│  a = 1;                    // assignments execute here  │
│  // b exits TDZ                                         │
│  b = 2;                                                 │
│  // c exits TDZ                                         │
│  c = 3;                                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Type Coercion

### Abstract Equality (==) Algorithm

```
┌─────────────────────────────────────────────────────────┐
│           == (LOOSE EQUALITY) DECISION TREE            │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │  Types are the same?  │
         └───┬───────────────┬───┘
             │YES            │NO
             ↓               ↓
      ┌──────────┐    ┌───────────────────┐
      │  Return  │    │  One is null,      │
      │  a === b │    │  other undefined?  │
      └──────────┘    └───┬────────────┬───┘
                          │YES       │NO
                          ↓          ↓
                   ┌──────────┐ ┌──────────────────┐
                   │Return    │ │  One is string,   │
                   │true      │ │  other is number? │
                   └──────────┘ └───┬───────────┬───┘
                                    │YES       │NO
                                    ↓          ↓
                             ┌──────────┐ ┌─────────────────┐
                             │Convert   │ │  One is boolean?│
                             │string to │ │  Convert to     │
                             │number,   │ │  number         │
                             │compare   │ └─────────────────┘
                             └──────────┘
```

### Common Coercion Examples

```
String + Number:
  "1" + 2    → "12"   (concatenation)
  1 + "2"    → "12"   (concatenation)

Number - String:
  "5" - 2    → 3      (toNumber then subtract)
  5 - "2"    → 3      (toNumber then subtract)

Equality:
  "5" == 5   → true   (string to number)
  "" == 0    → true   ("" to 0)
  [] == 0    → true   ([] to "" to 0)
  [] == ![]  → true   (both coerce to 0!)

Boolean Coercion:
  !![]       → true   (array is truthy)
  !!""       → false  (empty string is falsy)
  !!0        → false  (0 is falsy)
  !!"0"      → true   (non-empty string is truthy!)
```

---

## 7. TDZ (Temporal Dead Zone)

### Concept: Variables Exist But Can't Be Accessed

With `let` and `const`, there's a period between the start of the scope and the declaration where the variable exists but can't be accessed.

```
┌─────────────────────────────────────────────────────────┐
│                 TEMPORAL DEAD ZONE (TDZ)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  {                                                      │
│    // ←─────── START OF SCOPE                           │
│    //                                                    │
│    // TDZ for 'name' BEGINS HERE                       │
│    //  ┌─────────────────────────────────────┐          │
│    //  │   name is UNINITIALIZED             │          │
│    //  │   Access = ReferenceError!          │          │
│    //  │                                     │          │
│    //  │   console.log(name); → ❌ ERROR    │          │
│    //  │                                     │          │
│    //  │   typeof name → ❌ ReferenceError   │          │
│    //  │   (not undefined like var!)        │          │
│    └──┼─────────────────────────────────────┼──────────┘
│       │                                      │
│       │    let name = "Kyle";                │
│       │    ↑                                │
│       │    └───── TDZ ENDS HERE             │
│       │         Variable initialized        │
│       │                                      │
│       ↓    console.log(name); → ✅ "Kyle"   │
│  }                                              │
│                                                 │
│  WHY TDZ?                                       │
│  ─────────                                      │
│  Prevents accessing variables before           │
│  declaration, catching bugs early.             │
│                                                 │
│  var vs let/const:                              │
│  ─────────────────                              │
│  console.log(x); // undefined (var hoisted)    │
│  var x = 1;                                     │
│                                                 │
│  console.log(y); // ReferenceError (TDZ!)      │
│  let y = 2;                                     │
└─────────────────────────────────────────────────┘
```

---

## Quick Reference Card

### Scope vs Closure vs Context

```
┌─────────────────────────────────────────────────────────┐
│              SCOPE    vs    CLOSURE    vs    THIS       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SCOPE:                                                 │
│  ─────                                                  │
│  • WHERE a function is defined                         │
│  • Static (lexical) - doesn't change                   │
│  • Determines variable access                          │
│                                                         │
│  CLOSURE:                                               │
│  ────────                                               │
│  • Function "remembering" variables from outer scope   │
│  • Preserves scope after outer function returns        │
│  • Enables data privacy and factories                  │
│                                                         │
│  THIS:                                                 │
│  ────                                                   │
│  • Determined by HOW function is CALLED                │
│  • Dynamic - changes based on call site                │
│  • Context for function execution                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

*Created: 2026-02-03*
*Purpose: Visual learning aid for YDKJS series*
