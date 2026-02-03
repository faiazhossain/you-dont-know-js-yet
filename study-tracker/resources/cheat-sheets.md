# YDKJS Cheat Sheets

Quick reference guides for core JavaScript concepts from YDKJS series.

---

## Visual Diagrams

**NEW!** Comprehensive visual diagrams have been created for all major concepts:

- [Scope & Closures Diagrams](./diagrams/scope-and-closures.md) - Scope chains, closures, hoisting, TDZ
- [Objects & Classes Diagrams](./diagrams/objects-and-classes.md) - Prototypes, this binding, OLOO, classes
- [Types & Grammar Diagrams](./diagrams/types-and-grammar.md) - Coercion, types, abstract operations

---

## Scope & Closures Cheat Sheet

### Key Concepts

**Lexical Scope**: Scope is determined by where functions are written, not where they're called.

**Closure**: When a function remembers variables from its outer scope even after the outer function has returned.

**Hoisting**: Variable and function declarations are moved to the top of their scope during compilation.

**TDZ (Temporal Dead Zone)**: The period between scope start and variable declaration where `let`/`const` cannot be accessed.

### Quick Reference

```javascript
// Closure example
function makeCounter() {
    var count = 0;
    return function() {
        count++;
        return count;
    };
}

// Hoisting example
console.log(name); // undefined (not ReferenceError)
var name = "Kyle";

// TDZ example
// console.log(age); // ReferenceError!
let age = 25;
```

### Scope Chain Lookup
```
Current Scope → Parent Scope → ... → Global Scope
```

---

## Objects & Classes Cheat Sheet

### The Four Rules of `this`

| Rule | How Called | `this` refers to |
|------|-----------|------------------|
| Default | `fn()` | Global (undefined in strict) |
| Implicit | `obj.fn()` | `obj` (before the dot) |
| Explicit | `fn.call(obj)` | Specified object |
| New | `new Fn()` | Newly created object |

### Prototype Chain

```javascript
// Object.create() for delegation
var parent = { name: "Parent" };
var child = Object.create(parent);
child.age = 10;
console.log(child.name); // "Parent" (from prototype)
```

### Class vs Delegation

**Class**:
```javascript
class Task {
    constructor(id) { this.id = id; }
}
class UrgentTask extends Task {
    constructor(id, priority) {
        super(id);
        this.priority = priority;
    }
}
```

**Delegation (OLOO)**:
```javascript
var Task = {
    init(id) { this.id = id; }
};
var UrgentTask = Object.create(Task);
UrgentTask.init = function(id, priority) {
    Task.init.call(this, id);
    this.priority = priority;
};
```

---

## Types & Coercion Cheat Sheet

### The Seven Types

**Primitives**: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`

**Objects**: `object` (includes arrays, functions, dates, etc.)

### Falsy Values (Memorize!)

1. `undefined`
2. `null`
3. `false`
4. `0`, `-0`, `0n`
5. `NaN`
6. `""`

**Everything else is truthy** (including `"0"`, `[]`, `{}`)

### Coercion Examples

```javascript
// String + Number = Concatenation
"1" + 2    // "12"

// Number - String = Subtraction
"5" - 2    // 3

// Equality
"5" == 5   // true (coercion)
"5" === 5  // false (no coercion)

// Boolean Coercion
!![]       // true
!!""       // false
```

### typeof Results

| value | typeof |
|-------|--------|
| `"hello"` | `"string"` |
| `42` | `"number"` |
| `true` | `"boolean"` |
| `undefined` | `"undefined"` |
| `null` | `"object"` (bug!) |
| `{}` | `"object"` |
| `[]` | `"object"` |
| `function(){}` | `"function"` |

---

## Common Gotchas

### The `[].toString()` Gotcha
```javascript
[] + []        // "" (both to "")
[] + {}        // "[object Object]"
{} + []        // 0 ({} treated as block, [] to 0)
({}) + []      // "[object Object]0"
```

### The `==` with Arrays Gotcha
```javascript
[] == 0        // true (Array → "" → 0)
[] == ![]      // true (both → 0)
[] == ""       // true
```

### `this` in Callbacks Gotcha
```javascript
var obj = {
    name: "Kyle",
    show: function() {
        setTimeout(function() {
            console.log(this.name); // undefined!
        }, 100);
    }
};

// Fix 1: Arrow function
setTimeout(() => console.log(this.name), 100);

// Fix 2: .bind()
setTimeout(function() {
    console.log(this.name);
}.bind(obj), 100);

// Fix 3: var self = this;
var self = this;
setTimeout(function() {
    console.log(self.name);
}, 100);
```

---

## Memory Aids

**PoLE**: Principle of Least Exposure
- Limit scope exposure
- Use smallest scope possible

**OLOO**: Objects Linked to Other Objects
- Delegation over inheritance
- `Object.create()` for linkage

**TDZ**: Temporal Dead Zone
- Time between scope entry and variable declaration
- Only for `let` and `const`

**Falsy List**: "UNNF0NS"
- **U**ndefined
- **N**ull
- **N**aN
- **F**alse
- **0** (zero)
- **N**o string (empty "")
- **S**ymbol (only when explicitly created)

---

*See the `/diagrams` folder for visual explanations of these concepts*
