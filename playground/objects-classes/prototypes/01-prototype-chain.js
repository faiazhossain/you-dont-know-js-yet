/**
 * EXERCISE: Prototype Chain & Delegation
 * CONCEPT: Prototypes, [[Prototype]] Chain, Delegation
 * SOURCE: YDKJS Objects & Classes - Chapter 2 & 5
 *
 * KEY CONCEPT:
 * Objects in JavaScript have a hidden [[Prototype]] link to another object.
 * When accessing a property, JavaScript will "walk up" the prototype chain
 * until it finds the property or reaches null.
 */

// [PREDICT] What will be output?

var parent = {
    parentProp: "parent property",
    parentMethod: function() {
        console.log("parent method called");
    }
};

var child = Object.create(parent);
child.childProp = "child property";

console.log(child.childProp); // PREDICT: ?
console.log(child.parentProp); // PREDICT: ?
child.parentMethod(); // PREDICT: ?

console.log(child.hasOwnProperty("childProp")); // PREDICT: ?
console.log(child.hasOwnProperty("parentProp")); // PREDICT: ?

/**
 * EXPLANATION:
 *
 * - child doesn't have parentProp directly
 * - JavaScript looks it up in the prototype chain
 * - Finds it in `parent`
 * - This is DELEGATION: child delegates to parent
 */

// [TODO] Create a three-level prototype chain
// grandparent -> parent -> child
// Each level should have its own property and method

// [COMPARE] Two approaches for object linking

// Approach 1: Object.create (Delegation-Oriented)
var task1 = {
    id: 1,
    title: "Task 1",
    done: false,

    markDone: function() {
        this.done = true;
    }
};

var urgentTask1 = Object.create(task1);
urgentTask1.priority = "high";

// Approach 2: Constructor + prototype (Class-Oriented)
function Task(id, title) {
    this.id = id;
    this.title = title;
    this.done = false;
}

Task.prototype.markDone = function() {
    this.done = true;
};

function UrgentTask(id, title, priority) {
    Task.call(this, id, title);
    this.priority = priority;
}
UrgentTask.prototype = Object.create(Task.prototype);

var task2 = new Task(2, "Task 2");
var urgentTask2 = new UrgentTask(3, "Task 3", "high");

/**
 * QUESTIONS:
 *
 * 1. What are the key differences between these approaches?
 * 2. When would you prefer Object.create()?
 * 3. When would you prefer constructors?
 * 4. How does `this` binding work differently in each?
 */

// [BUG] What's wrong with this prototype setup?

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(this.name + " makes a sound");
};

function Dog(name, breed) {
    this.name = name;
    this.breed = breed;
}

// BUG: This line causes an issue
Dog.prototype = Animal.prototype;

Dog.prototype.bark = function() {
    console.log(this.name + " barks!");
};

var cat = new Animal("Whiskers");
console.log(cat.bark); // PREDICT: ? (should be undefined but isn't!)

// Fix the bug above (hint: don't assign the prototype directly)

// [DEBUG] Prototype lookup challenge

var base = {
    baseMethod: function() {
        return "base";
    }
};

var middle = Object.create(base);
middle.middleMethod = function() {
    return "middle";
};

var top = Object.create(middle);
// No methods defined on top

console.log(top.baseMethod()); // PREDICT: ?
console.log(top.middleMethod()); // PREDICT: ?

// Now, let's shadow baseMethod:
top.baseMethod = function() {
    return "top";
};

console.log(top.baseMethod()); // PREDICT: ?
console.log(middle.baseMethod()); // PREDICT: ?

/**
 * QUESTIONS:
 *
 * 1. Why does middle.baseMethod() still return "base"?
 * 2. How does JavaScript decide which method to call?
 * 3. What if we delete top.baseMethod? What would happen?
 */

// [PLAY] Experiment with your own prototype chains
// Try: creating mixins, combining multiple prototypes, etc.

// --- YOUR EXPERIMENTS BELOW ---

