/**
 * EXERCISE: Type Coercion & Equality
 * CONCEPT: Type Coercion, == vs ===, Abstract Operations
 * SOURCE: YDKJS Types & Grammar - Chapter 4
 *
 * COERCION: Converting a value from one type to another.
 *
 * JavaScript can coerce implicitly (automatically) or explicitly (intentionally).
 * Understanding coercion is crucial for writing bug-free JS.
 */

// [PREDICT] Predict the output BEFORE running!

// 1. String + Number
console.log("1" + 2); // PREDICT: ?
console.log(1 + "2"); // PREDICT: ?

// 2. Number - String
console.log("5" - 2); // PREDICT: ?
console.log(5 - "2"); // PREDICT: ?

// 3. Equality comparisons
console.log("5" == 5); // PREDICT: ?
console.log("5" === 5); // PREDICT: ?
console.log(null == undefined); // PREDICT: ?
console.log(null === undefined); // PREDICT: ?

// 4. Falsy values
console.log(false == 0); // PREDICT: ?
console.log("" == 0); // PREDICT: ?
console.log("   " == 0); // PREDICT: ? (tricky!)
console.log("\t\n" == 0); // PREDICT: ?

// 5. The weird ones
console.log([] == 0); // PREDICT: ?
console.log([] == ""); // PREDICT: ?
console.log([] == ![]); // PREDICT: ? (very tricky!)
console.log([] == []); // PREDICT: ?

/**
 * KEY INSIGHTS:
 *
 * - + operator prefers string concatenation
 * - - operator converts to numbers
 * - == allows coercion, === does not
 * - Empty array [] is truthy, but [] == 0 is true!
 */

// [TODO] Fill in the blanks to make each comparison true

console.log( _____ == "5" ); // Fill in: should be true
console.log( _____ === false ); // Fill in: should be true
console.log( _____ == null ); // Fill in: should be true

// [BUG] Find the bug in this password validation:

function validatePassword(input) {
    if (input == 0) { // BUG: This is problematic
        return "Password cannot be empty";
    }
    if (input.length < 8) {
        return "Password too short";
    }
    return "Password valid";
}

console.log(validatePassword("")); // Works
console.log(validatePassword(0)); // BUG: This passes incorrectly!

// Fix the bug above (hint: use ===)

// [COMPARE] Which approach is better and why?

// Approach 1: Loose equality
function checkAge1(age) {
    if (age == 18) {
        return "You can vote!";
    }
    return "Too young";
}

// Approach 2: Strict equality
function checkAge2(age) {
    if (age === 18) {
        return "You can vote!";
    }
    return "Too young";
}

// Approach 3: Explicit coercion + comparison
function checkAge3(age) {
    if (Number(age) === 18) {
        return "You can vote!";
    }
    return "Too young";
}

console.log(checkAge1("18")); // ?
console.log(checkAge2("18")); // ?
console.log(checkAge3("18")); // ?

console.log(checkAge1(18)); // ?
console.log(checkAge2(18)); // ?
console.log(checkAge3(18)); // ?

/**
 * QUESTIONS:
 *
 * 1. What are the trade-offs between these approaches?
 * 2. When might Approach 1 be useful?
 * 3. Which is most explicit about its intent?
 * 4. How would you handle null/undefined in each case?
 */

// [DEBUG] What's happening in these comparisons?

console.log("0" == false); // true - why?
console.log("1" == true); // true - why?
console.log("2" == true); // ? - what do you expect?

// Step through the coercion:
// 1. What does true coerce to in a numeric comparison?
// 2. What does "2" coerce to?
// 3. Why is this result surprising?

// [PREDICT] The ToBoolean abstract operation

// Which of these are truthy? Mark T/F before running:
console.log(Boolean("")); // T/F
console.log(Boolean("0")); // T/F
console.log(Boolean("false")); // T/F
console.log(Boolean(null)); // T/F
console.log(Boolean(undefined)); // T/F
console.log(Boolean(NaN)); // T/F
console.log(Boolean(Infinity)); // T/F
console.log(Boolean(-0)); // T/F
console.log(Boolean([])); // T/F
console.log(Boolean({})); // T/F
console.log(Boolean(function(){})); // T/F

/**
 * MEMORIZE THESE FALSY VALUES:
 * - false
 * - 0, -0
 * - 0n (BigInt zero)
 * - "", '', `` (empty string)
 * - null
 * - undefined
 * - NaN
 *
 * EVERYTHING ELSE IS TRUTHY (including [], {}, "0", "false")
 */

// [PLAY] Create your own coercion tests
// Try to find surprising behaviors

// --- YOUR EXPERIMENTS BELOW ---

