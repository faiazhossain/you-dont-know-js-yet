/**
 * EXERCISE: Variable Shadowing
 * CONCEPT: Scope Chain, Shadowing
 * SOURCE: YDKJS Scope & Closures - Chapter 3
 *
 * SHADOWING: When a variable in an inner scope has the same name
 * as a variable in an outer scope, the inner one "shadows" the outer.
 */

// [PREDICT] What will be logged?

var special = "hello";

function lookingFor() {
    var special = "world";

    console.log(special); // PREDICT: ?
    console.log(window.special); // PREDICT: ? (only in browser)
}

console.log(special); // PREDICT: ?
lookingFor();

/**
 * EXPLANATION:
 *
 * The `special` inside lookingFor() SHADOWS the outer `special`.
 * The outer `special` still exists, but is inaccessible from within
 * lookingFor() because the inner one takes precedence.
 */

// [BUG] The code below has an issue. Find and fix it.
// The function should return the sum of both variables

var x = 10;

function addX() {
    var x = 5;
    var y = 15; // BUG: This variable is misplaced

    return x + y;
}

console.log(addX()); // Should output 20, but...

// [TODO] After fixing the bug, add a third variable z in the outer scope
// and access all three (x, y, z) from inside a function

// [COMPARE] Which approach is better? Why?

// Approach A:
var name = "Faiaz";

function greet() {
    var name = "Hello " + name;
    return name;
}

// Approach B:
var userName = "Faiaz";

function greetUser() {
    var greeting = "Hello " + userName;
    return greeting;
}

console.log(greet());
console.log(greetUser());

/**
 * QUESTIONS:
 *
 * 1. Why is Approach B generally better than Approach A?
 * 2. When might shadowing be useful?
 * 3. When does shadowing become confusing or problematic?
 */

// [PLAY] Create your own shadowing examples
