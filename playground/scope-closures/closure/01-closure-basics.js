/**
 * EXERCISE: Closure Fundamentals
 * CONCEPT: Closure, Scope Exposure
 * SOURCE: YDKJS Scope & Closures - Chapter 7
 *
 * CLOSURE DEFINITION:
 * When a function remembers the variables from its scope even
 * after that scope has finished executing.
 */

// [PREDICT] What will be output?

function makeCounter() {
    var count = 0;

    return function increment() {
        count = count + 1;
        console.log(count);
    };
}

var counter1 = makeCounter();
var counter2 = makeCounter();

console.log("--- counter1 ---");
counter1(); // PREDICT: ?
counter1(); // PREDICT: ?
counter1(); // PREDICT: ?

console.log("--- counter2 ---");
counter2(); // PREDICT: ?
counter2(); // PREDICT: ?

console.log("--- counter1 again ---");
counter1(); // PREDICT: ?

/**
 * KEY INSIGHT:
 *
 * - makeCounter() finishes executing immediately
 * - But the `count` variable is NOT garbage collected
 * - Why? Because increment() still references it
 * - This is CLOSURE - increment "closes over" `count`
 *
 * - counter1 and counter2 have INDEPENDENT closures
 * - Each has its own `count` variable
 */

// [TODO] Complete the function to create a counter with a custom start value

function makeCustomCounter(startValue) {
    // TODO: Implement this function
    // It should start counting from startValue instead of 0
}

var counter3 = makeCustomCounter(100);
counter3(); // Should output 101
counter3(); // Should output 102

// [DEBUG] What's wrong with this code?
// The developer wants to store multiple counters in an object

var counters = {};

function createCounter(name) {
    var count = 0;
    counters[name] = function() {
        count = count + 1;
        return count;
    };
}

createCounter("a");
createCounter("b");

console.log(counters.a()); // Expected: 1, Actual: ?
console.log(counters.b()); // Expected: 1, Actual: ?

// Hint: There's a subtle closure bug. Can you find it?

// [COMPARE] Three ways to make a counter. Which is best?

// Approach 1: Function Declaration
function counter1() {
    var count = 0;
    return function() { return ++count; };
}

// Approach 2: Function Expression
var counter2 = function() {
    var count = 0;
    return function() { return ++count; };
};

// Approach 3: Arrow Function
var counter3 = () => {
    let count = 0;
    return () => ++count;
};

// Test all three
var c1 = counter1();
var c2 = counter2();
var c3 = counter3();

console.log(c1(), c1(), c1());
console.log(c2(), c2(), c2());
console.log(c3(), c3(), c3());

/**
 * QUESTIONS:
 *
 * 1. What are the practical differences between these approaches?
 * 2. When would you choose one over the others?
 * 3. How does `this` binding differ (if at all)?
 */

// [PLAY] Experiment with your own closure examples
// Try: closures with multiple variables, closures in loops, etc.

// --- YOUR EXPERIMENTS ---

