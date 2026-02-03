# Scope & Closures - Chapter 1 Exercises
**What's the Scope?**

**Source**: `../../../ydkjs-books/scope-closures/ch1.md`

---

## Difficulty Levels

| Level | Description |
|-------|-------------|
| 🟢 Beginner | Basic concepts, straightforward |
| 🟡 Intermediate | Requires understanding of multiple concepts |
| 🔴 Advanced | Complex scenarios, edge cases |

---

## Part 1: Predict the Output 🟢

**Instructions**: Read each code snippet. PREDICT the output BEFORE running. Then verify with `node`.

### Exercise 1.1: Compiler Phases

```javascript
// PREDICT: What will be logged?
// Don't run until you've made a prediction!

var teacher = "Kyle";

function otherClass() {
    teacher = "Suzy";
    console.log(teacher);
}

otherClass();
console.log(teacher);
```

**Your Prediction**:
- Line 8 output: _____________
- Line 10 output: _____________

**Actual Output**: Run it and see

**Was your prediction correct?** [ ] Yes [ ] No

**Explain WHY**:
_____________________________________________________________________
_____________________________________________________________________

---

### Exercise 1.2: Scope Lookup

```javascript
var special = "JavaScript";

function learn() {
    var special = "More JavaScript";

    function deepLearn() {
        var special = "Deep JavaScript";
        console.log(special);
    }

    deepLearn();
    console.log(special);
}

learn();
console.log(special);
```

**Your Prediction**:
1. First console.log: _____________
2. Second console.log: _____________
3. Third console.log: _____________

**Verify**: Run the code

**Draw the scope chain**:
```
Global Scope: ___________
  └─ learn() Scope: ___________
       └─ deepLearn() Scope: ___________
```

---

## Part 2: Debug the Code 🟡

### Exercise 2.1: Find the Bug

```javascript
// This code is supposed to keep track of a count
// But it's not working. Find and fix the bug.

var count = 0;

function increment() {
    count = count + 1;
    console.log(count);
}

// Bug: These two calls should have independent counts
var counter1 = increment;
var counter2 = increment;

counter1(); // Expected: 1, Actual: ?
counter2(); // Expected: 1, Actual: ?
counter1(); // Expected: 2, Actual: ?
```

**Problem Identified**:
_____________________________________________________________________

**Fix**: Rewrite the code to work correctly:
```javascript

```

---

### Exercise 2.2: Unexpected Behavior

```javascript
// Why does this log 'undefined'?

var name = "Global";

function greet() {
    console.log("Hello, " + name);
    var name = "Local";
}

greet();
```

**What's happening?** Explain the hoisting behavior:
_____________________________________________________________________
_____________________________________________________________________

**Fix it**: Make it log "Hello, Local":
```javascript

```

---

## Part 3: Complete the Code 🟡

### Exercise 3.1: Create a Lexical Scope

```javascript
// TODO: Create a function that:
// 1. Declares a variable in its scope
// 2. Returns a new function that accesses that variable
// 3. The inner function should modify and return the outer variable

function createCounter() {
    // YOUR CODE HERE

}

// Test:
var myCounter = createCounter();
console.log(myCounter()); // Should output: 1
console.log(myCounter()); // Should output: 2
console.log(myCounter()); // Should output: 3
```

---

### Exercise 3.2: Nested Functions

```javascript
// TODO: Complete this function to demonstrate nested scope

function outer() {
    var outerVar = "I'm from outer!";

    function middle() {
        var middleVar = "I'm from middle!";

        // TODO: Create an inner() function here that:
        // - Logs outerVar
        // - Logs middleVar
        // - Declares its own innerVar
        // - Logs innerVar

    }

    middle();
    // console.log(innerVar); // This should error - why?
}

outer();
```

---

## Part 4: Conceptual Questions 🟢

1. **What is lexical scope?**
   _____________________________________________________________________

2. **What are the two phases of compilation?**
   _____________________________________________________________________

3. **How does JS know which `teacher` variable to use?**
   _____________________________________________________________________

---

## Part 5: Challenge Problems 🔴

### Exercise 5.1: Shadowing Puzzle

```javascript
var x = 10;

function puzzle() {
    console.log(x); // Output 1: ?

    var x = 20;
    console.log(x); // Output 2: ?

    if (true) {
        var x = 30;
        console.log(x); // Output 3: ?
    }

    console.log(x); // Output 4: ?
}

puzzle();
console.log(x); // Output 5: ?
```

**Predict all 5 outputs**:
1. _________ 2. _________ 3. _________ 4. _________ 5. _________

**Explain the pattern**:
_____________________________________________________________________

---

### Exercise 5.2: Create Your Own

Create a code example that demonstrates:
1. Scope shadowing
2. Nested scope lookup (at least 3 levels)
3. A variable that's accessible from multiple scopes

```javascript

```

---

## Part 6: Mini-Project 🟡

### Build: Simple Logger

Create a logging system with different log levels:

```javascript
// Requirements:
// - ERROR logs should always show
// - WARN logs should show if debug mode is on
// - INFO logs should show only in verbose mode

function createLogger(debugMode, verboseMode) {
    // YOUR CODE HERE

}

// Test:
var logger = createLogger(true, false);
logger.error("Critical failure!");  // Should show
logger.warn("Something's odd");     // Should show
logger.info("Just so you know");   // Should NOT show
```

---

## Completed

- [ ] All predict exercises completed
- [ ] All debug exercises solved
- [ ] All code completion exercises finished
- [ ] Mini-project working
- [ ] Concepts explained in own words

---

## Confidence Level After Exercises

_____ / 5

**What still confuses you?**
_____________________________________________________________________
_____________________________________________________________________

---

**Next Steps**: Try the playground exercises in `/playground/scope-closures/`
