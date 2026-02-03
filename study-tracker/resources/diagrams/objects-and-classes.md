# Objects & Classes Visual Diagrams

**Purpose**: Visual explanations for objects, prototypes, classes, and `this`

---

## Table of Contents

1. [Property Descriptors](#1-property-descriptors)
2. [Prototype vs Class](#2-prototype-vs-class-approaches)
3. [OLOO (Objects Linked to Other Objects)](#3-ololo-objects-linked-to-other-objects)
4. [This Binding Decision Tree](#4-this-binding-decision-tree)
5. [Arrow Function Lexical This](#5-arrow-function-lexical-this)
6. [Class vs Delegation Comparison](#6-class-vs-delegation-comparison)

---

## 1. Property Descriptors

### Concept: Objects Have Metadata About Their Properties

Every property has hidden attributes called "descriptors".

```javascript
var myObject = {
    name: "Kyle"
};

Object.getOwnPropertyDescriptor(myObject, "name");
// Returns:
// {
//   value: "Kyle",
//   writable: true,      // Can value be changed?
//   enumerable: true,    // Does it show in for..in?
//   configurable: true   // Can descriptor be modified?
// }
```

### Descriptor Attributes Visual

```
┌─────────────────────────────────────────────────────────┐
│              PROPERTY DESCRIPTOR STRUCTURE              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  myObject.name = "Kyle";                                │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │         PROPERTY DESCRIPTOR             │           │
│  │  ┌─────────────────────────────────┐    │           │
│  │  │  value: "Kyle"                   │    │           │
│  │  │  writable: true   ──→ can change │    │           │
│  │  │  enumerable: true ──→ visible   │    │           │
│  │  │  configurable: true             │    │           │
│  │  └─────────────────────────────────┘    │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  Writable: false → Read-only property                  │
│  Enumerable: false → Hidden from loops                  │
│  Configurable: false → Cannot delete or modify          │
│                                                         │
└─────────────────────────────────────────────────────────┘

EXAMPLE: Creating a read-only property:

Object.defineProperty(myObject, "READ_ONLY", {
    value: "Cannot change me",
    writable: false,
    enumerable: true,
    configurable: true
});

myObject.READ_ONLY = "Trying...";
console.log(myObject.READ_ONLY); // Still "Cannot change me"
```

---

## 2. Prototype vs Class Approaches

### Two Mental Models for Object Linkage

```
┌─────────────────────────────────────────────────────────┐
│         CLASS-ORIENTED (OOP) MENTAL MODEL               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     Parent Class (Definition)                           │
│         ↓                                               │
│     Child Class (Inherits)                              │
│         ↓                                               │
│     Instance (Created)                                  │
│                                                         │
│     THINKING: "Classes create objects"                 │
│                                                         │
│     class Parent {                                     │
│         constructor() {                                │
│             this.name = "Parent";                      │
│         }                                              │
│     }                                                  │
│                                                         │
│     class Child extends Parent {                       │
│         constructor() {                                │
│             super();                                   │
│             this.age = 10;                             │
│         }                                              │
│     }                                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│      DELEGATION-ORIENTED (OLOO) MENTAL MODEL            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     Parent Object ←──┐                                 │
│         (delegate)    │                                 │
│                      │                                  │
│     Child Object ────┘                                 │
│         (delegates to parent)                          │
│                                                         │
│     THINKING: "Objects link to objects"                │
│                                                         │
│     var parent = {                                     │
│         name: "Parent"                                 │
│     };                                                 │
│                                                         │
│     var child = Object.create(parent);                │
│     child.age = 10;                                    │
│                                                         │
│     child.name → Delegates to parent                   │
│     child.age → Found on child itself                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Code Comparison: Same Behavior, Different Approaches

```javascript
// CLASS APPROACH:
class Task {
    constructor(id) {
        this.id = id;
        this.done = false;
    }
    markDone() {
        this.done = true;
    }
}

class UrgentTask extends Task {
    constructor(id, priority) {
        super(id);
        this.priority = priority;
    }
}

// OLOO APPROACH:
var Task = {
    init(id) {
        this.id = id;
        this.done = false;
    },
    markDone() {
        this.done = true;
    }
};

var UrgentTask = Object.create(Task);
UrgentTask.init = function(id, priority) {
    Task.init.call(this, id);
    this.priority = priority;
};

// Usage:
var task1 = new Task(1);
task1.markDone();

var task2 = Object.create(UrgentTask);
task2.init(2, "high");
task2.markDone();
```

---

## 3. OLOO (Objects Linked to Other Objects)

### Visual: Delegation in Action

```
┌─────────────────────────────────────────────────────────┐
│                   OLOO DELEGATION FLOW                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Code:                                                 │
│  ─────                                                 │
│  var Task = {                                          │
│      init: function(id) { this.id = id; },            │
│      markDone: function() { this.done = true; }       │
│  };                                                    │
│                                                         │
│  var myTask = Object.create(Task);                     │
│  myTask.init(1);                                       │
│  myTask.markDone();                                    │
│                                                         │
│  Memory Layout:                                        │
│  ──────────────                                        │
│                                                         │
│    ┌─────────────┐                                     │
│    │   myTask    │                                     │
│    │  ┌────────┐ │                                     │
│    │  │id: 1   │ │                                     │
│    │  │done: T │ │                                     │
│    │  └────────┘ │                                     │
│    │             │                                     │
│    │  [[Proto]]  │ ───────┐                           │
│    └─────────────┘        │                           │
│                           ↓                            │
│                    ┌─────────────┐                     │
│                    │    Task     │                     │
│                    │  ┌────────┐ │                     │
│                    │  │init: fn│ │                     │
│                    │  │markDone│ │                     │
│                    │  └────────┘ │                     │
│                    │             │                     │
│                    │  [[Proto]]  │ ───→ Object.prototype│
│                    └─────────────┘                     │
│                                                         │
│  When myTask.markDone() is called:                     │
│  1. Look for markDone on myTask                        │
│  2. Not found → delegate to [[Prototype]] (Task)      │
│  3. Found markDone on Task → EXECUTE IT               │
│  4. Inside markDone, `this` refers to myTask           │
│  5. this.done = true → modifies myTask.done!          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4. This Binding Decision Tree

### Complete Decision Tree for Determining `this`

```
┌─────────────────────────────────────────────────────────┐
│            FUNCTION CALL → DETERMINE THIS              │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ What's on the LEFT of the ( ?
                     │
    ┌────────────────┴────────────────┐
    │                                 │
    │ "new" keyword?                  │ Something else
    │                                 │
    ↓                                 ↓
┌─────────────────┐          ┌──────────────────┐
│ YES → NEW       │          │ Look at call site│
│ BINDING         │          │                  │
│                 │          │ "obj.method()" ? │
│ this = new      │          └────┬────────┬─────┘
│ object          │               │NO      │YES
└─────────────────┘               │       │
                                 ↓       ↓
                          ┌──────────┐ ┌─────────────┐
                          │  DEFAULT │ │  IMPLICIT   │
                          │  BINDING │ │  BINDING    │
                          │          │ │             │
                          │ this =   │ │ this = obj  │
                          │ global   │ │ (before dot)│
                          │ (undef   │ └─────────────┘
                          │  strict) │
                          └─────┬────┘
                                │
                     What about call/apply/bind?
                                │
                                ↓
                          ┌──────────┐
                          │ EXPLICIT │
                          │ BINDING  │
                          │          │
                          │ this =   │
                          │ specified│
                          │ object   │
                          └──────────┘


EXAMPLES OF EACH RULE:

1. NEW BINDING:
   function Person(name) {
       this.name = name;
   }
   var p = new Person("Kyle");
   // this → the newly created object p

2. IMPLICIT BINDING:
   var person = {
       greet: function() { console.log(this.name); }
   };
   person.greet();
   // this → person (object before the dot)

3. EXPLICIT BINDING:
   function greet() { console.log(this.name); }
   var person = { name: "Kyle" };
   greet.call(person);   // this → person
   greet.bind(person)(); // this → person

4. DEFAULT BINDING:
   function greet() { console.log(this.name); }
   greet();
   // this → global object (undefined in strict mode)
```

---

## 5. Arrow Function Lexical This

### How Arrow Functions Change the Game

```
┌─────────────────────────────────────────────────────────┐
│         REGULAR FUNCTION vs ARROW FUNCTION             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  REGULAR FUNCTION:                                      │
│  ─────────────────                                      │
│  var obj = {                                           │
│      name: "Kyle",                                     │
│      regular: function() {                             │
│          console.log(this.name); // this = obj         │
│          setTimeout(function() {                       │
│              console.log(this.name); // this = global! │
│          }, 100);                                      │
│      }                                                 │
│  };                                                    │
│                                                         │
│  ARROW FUNCTION:                                       │
│  ───────────────                                       │
│  var obj = {                                           │
│      name: "Kyle",                                     │
│      arrow: function() {                               │
│          console.log(this.name); // this = obj         │
│          setTimeout(() => {                            │
│              console.log(this.name); // this = obj!    │
│          }, 100);                                      │
│      }                                                 │
│  };                                                    │
│                                                         │
│  KEY DIFFERENCE:                                       │
│  ───────────────                                       │
│  Regular function: this is determined by CALL          │
│  Arrow function: this is inherited from SCOPE          │
│                                                         │
└─────────────────────────────────────────────────────────┘

VISUAL THIS LOOKUP:

┌─────────────────────────────────────────────┐
│  obj.arrow() CALL                           │
│       ↓                                     │
│  ┌──────────────────────┐                   │
│  │  arrow() function    │                   │
│  │  this = obj ────────┐ │                   │
│  │                    │ │                   │
│  │  setTimeout(       │ │                   │
│  │    () => { ────────┼─┼─┐                 │
│  │      this         │ │ │ │                 │
│  │    }              │ │ │ │                 │
│  │  )                │ │ │ │                 │
│  │                   │ │ │ │                 │
│  └───────────────────┼─┼─┼─┘                 │
│                      │ │ │                   │
│    Arrow INHERITS    └─┘ ↓                   │
│    this from outer      ↓                     │
│    scope (lexical)    Arrow                   │
│                        this = obj             │
└─────────────────────────────────────────────┘
```

---

## 6. Class vs Delegation Comparison

### Side-by-Side Comparison

```
┌─────────────────────────────────────────────────────────┐
│           CLASS-ORIENTED vs DELEGATION-ORIENTED         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  TASK: Create a task list where tasks can be marked    │
│        done and urgent tasks have a priority            │
│                                                         │
│  ───────────────────────────────────────────────────   │
│  CLASS APPROACH (ES6 class):                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│  class Task {                                          │
│      constructor(id) {                                │
│          this.id = id;                                │
│          this.done = false;                           │
│      }                                                │
│      markDone() { this.done = true; }                 │
│  }                                                    │
│                                                        │
│  class UrgentTask extends Task {                       │
│      constructor(id, priority) {                       │
│          super(id);                                   │
│          this.priority = priority;                    │
│      }                                                │
│  }                                                    │
│                                                        │
│  var task = new UrgentTask(1, "high");                │
│  task.markDone();                                     │
│                                                        │
│  Mental Model: "Tasks are instances of the Task class"│
│                                                        │
│  ───────────────────────────────────────────────────   │
│  DELEGATION APPROACH (OLOO):                           │
│  ───────────────────────────────────────────────────   │
│                                                         │
│  var Task = {                                          │
│      init(id) {                                       │
│          this.id = id;                                │
│          this.done = false;                           │
│      },                                               │
│      markDone() {                                     │
│          this.done = true;                            │
│      }                                                │
│  };                                                   │
│                                                        │
│  var UrgentTask = Object.create(Task);                │
│  UrgentTask.init = function(id, priority) {           │
│      Task.init.call(this, id);                        │
│      this.priority = priority;                        │
│  };                                                   │
│                                                        │
│  var task = Object.create(UrgentTask);                │
│  task.init(1, "high");                                │
│  task.markDone();                                     │
│                                                        │
│  Mental Model: "Tasks delegate to Task object"        │
│                                                        │
│  ───────────────────────────────────────────────────   │
│  KEY DIFFERENCES:                                     │
│  ───────────────────────────────────────────────────   │
│                                                         │
│  Class:                                                │
│  • Uses constructor functions                         │
│  • Uses `new` keyword                                 │
│  • Uses `extends` for inheritance                     │
│  • Uses `super()` to call parent                      │
│  • `this` binding in constructor                      │
│                                                         │
│  Delegation:                                          │
│  • Uses simple objects                               │
│  • Uses Object.create() for linkage                  │
│  • Uses [[Prototype]] chain directly                 │
│  • Uses .call() for constructor linking              │
│  • More explicit about what's happening              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Reference: When to Use Which

```
┌─────────────────────────────────────────────────────────┐
│              CLASS vs DELEGATION: WHEN TO USE          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  USE CLASS WHEN:                                       │
│  ───────────────                                       │
│  • Coming from class-based languages                  │
│  • Working with frameworks that expect classes         │
│  • Need constructor validation                        │
│  • Private class fields are needed (#field)            │
│                                                         │
│  USE DELEGATION WHEN:                                  │
│  ────────────────────                                  │
│  • Want simpler, more explicit code                   │
│  • Don't need `new` complexity                        │
│  • Prefer composition over inheritance                │
│  • Want to leverage prototype directly                │
│                                                         │
│  REMEMBER: Both use [[Prototype]] under the hood!      │
│           class is mostly syntax sugar.               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

*Created: 2026-02-03*
*Purpose: Visual learning aid for Objects & Classes (YDKJS Book 3)*
