/**
 * EXERCISE: Nested Scope Lookup
 * CONCEPT: Scope Chain, Lexical Scope
 * SOURCE: YDKJS Scope & Closures - Chapter 2 & 3
 *
 * INSTRUCTIONS:
 * 1. Read the code below
 * 2. PREDICT the output BEFORE running
 * 3. Run with: node 01-nested-scope.js
 * 4. Explain WHY each line produces that output
 */

// [PREDICT] What will each console.log output?

const teacher = "Kyle";

function anotherTeacher() {
    const teacher = "Suzy";

    function logTeacher() {
        const teacher = "Gunnar";
        console.log(teacher); // PREDICT: ?
    }

    function anotherLog() {
        console.log(teacher); // PREDICT: ?
    }

    logTeacher();
    anotherLog();

    console.log(teacher); // PREDICT: ?
}

anotherTeacher();
console.log(teacher); // PREDICT: ?

/**
 * QUESTIONS:
 *
 * 1. How does JS determine which `teacher` variable to use?
 * 2. What happens when a variable is not found in the current scope?
 * 3. Draw the scope chain for this code
 * 4. What if we removed `const teacher = "Gunnar"`? What would logTeacher() output?
 */

// [TODO] Modify the code above:
// - Add a fourth level of nesting
// - At the deepest level, access the outermost `teacher`
// - Verify it works as you expect

// [PLAY] Experiment area:
// Try different combinations and see what happens

// --- YOUR EXPERIMENTS BELOW ---

