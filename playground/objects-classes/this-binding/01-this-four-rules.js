/**
 * EXERCISE: The Four Rules of `this` Binding
 * CONCEPT: `this` Binding
 * SOURCE: YDKJS Objects & Classes - Chapter 4
 *
 * The `this` keyword in JavaScript is determined by HOW a function is called,
 * not WHERE it is defined. There are four rules:
 *
 * 1. DEFAULT: Global object (undefined in strict mode)
 * 2. IMPLICIT: Object before the dot (obj.method())
 * 3. EXPLICIT: call(), apply(), bind()
 * 4. NEW: Newly constructed object (new keyword)
 */

// [PREDICT] What will each function output?

// Rule 1: Default Binding
function defaultBinding() {
    console.log(this.name); // PREDICT: ?
}

var name = "Global Name";
defaultBinding();

// Rule 2: Implicit Binding
var obj = {
    name: "Object Name",
    method: function() {
        console.log(this.name); // PREDICT: ?
    }
};
obj.method();

// Rule 2b: Implicit Binding Lost
var implicitLost = obj.method;
implicitLost(); // PREDICT: ? (tricky!)

// Rule 3: Explicit Binding
function explicitBinding() {
    console.log(this.name);
}
var context = { name: "Explicit Context" };
explicitBinding.call(context); // PREDICT: ?
explicitBinding.apply(context); // PREDICT: ?

// Rule 3b: Hard Binding
var hardBound = explicitBinding.bind(context);
hardBound(); // PREDICT: ?

// Rule 4: new Binding
function Constructor(name) {
    this.name = name;
}
var instance = new Constructor("New Instance");
console.log(instance.name); // PREDICT: ?

/**
 * QUESTIONS:
 *
 * 1. Why does implicitLost() not output "Object Name"?
 * 2. What's the difference between call() and apply()?
 * 3. How does bind() differ from call/apply?
 * 4. What happens if you use `new` on a bind()ed function?
 */

// [BUG] Find and fix the bug in this code:

var person = {
    name: "Kyle",
    friends: ["Joe", "Suzy", "Gunnar"],

    printFriends: function() {
        this.friends.forEach(function(friend) {
            console.log(this.name + " knows " + friend); // BUG: this.name is undefined
        });
    }
};

person.printFriends();

// Hint: What does `this` refer to inside the forEach callback?

// [TODO] Fix the bug using THREE different methods:
// Method 1: Use an arrow function
// Method 2: Use bind()
// Method 3: Store `this` in a variable (var self = this;)

// [COMPARE] Which `this` binding approach is best for each scenario?

// Scenario A: Simple method call
// Scenario B: Event handler
// Scenario C: Constructor function
// Scenario D: Callback in array method

// [DEBUG] What's wrong here?

var calculator = {
    total: 0,

    add: function(a, b) {
        this.total = a + b;
        return this;
    },

    multiply: function(n) {
        this.total = this.total * n;
        return this;
    }
};

// Developer wants to chain: calculator.add(2, 3).multiply(4)
// But something goes wrong when chaining...

// [PLAY] Create your own `this` examples

// --- YOUR EXPERIMENTS BELOW ---

