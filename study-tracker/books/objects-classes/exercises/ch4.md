# Objects & Classes - Chapter 4 Exercises
**This Works (`this` Binding)**

**Source**: `../../../ydkjs-books/objects-classes/ch4.md`

---

## Difficulty Levels

| Level | Description |
|-------|-------------|
| 🟢 Beginner | Basic this concepts |
| 🟡 Intermediate | Multiple binding rules, edge cases |
| 🔴 Advanced | Complex scenarios, hard problems |

---

## Part 1: Predict the Output 🟢

**Instructions**: For each snippet, predict what `this` refers to and what will be logged.

### Exercise 1.1: Default Binding

```javascript
function identify() {
    console.log(this.name);
}

var name = "Global";
identify(); // PREDICT: ?

// In strict mode:
"use strict";
identify(); // PREDICT: ?
```

**Prediction 1**: __________________
**Prediction 2**: __________________

**Run to verify**

---

### Exercise 1.2: Implicit Binding

```javascript
var person = {
    name: "Kyle",
    speak: function() {
        console.log("I am " + this.name);
    },
    friend: {
        name: "Joe",
        speak: function() {
            console.log("I am " + this.name);
        }
    }
};

person.speak();       // PREDICT: ?
person.friend.speak(); // PREDICT: ?
```

**Prediction 1**: __________________
**Prediction 2**: __________________

**What determines `this`?**
_____________________________________________________________________

---

### Exercise 1.3: Implicit Binding Lost

```javascript
var person = {
    name: "Kyle",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

var greet = person.greet;
person.greet(); // PREDICT: ?
greet();        // PREDICT: ?
```

**Prediction 1**: __________________
**Prediction 2**: __________________

**Why are they different?**
_____________________________________________________________________

---

## Part 2: Debug the Code 🟡

### Exercise 2.1: Event Handler Problem

```javascript
// BUG: This code is supposed to enable/disable a button
// But it's not working correctly

var button = {
    enabled: true,
    clicks: 0,

    disable: function() {
        setTimeout(function() {
            this.enabled = false; // BUG: this is wrong
            console.log("Button disabled");
        }, 1000);
    },

    enable: function() {
        setTimeout(function() {
            this.enabled = true; // BUG: this is wrong
            console.log("Button enabled");
        }, 1000);
    }
};

button.disable();
// After 1 second, button.enabled is still true!
```

**Problem**: `this` doesn't refer to `button` inside setTimeout

**Fix it using THREE different methods**:

**Method 1: Arrow Function**
```javascript

```

**Method 2: `var self = this;`**
```javascript

```

**Method 3: `.bind(this)`**
```javascript

```

---

### Exercise 2.2: Array Method Callback

```javascript
// BUG: The developer wants to calculate total with discount

var cart = {
    items: [10, 20, 30],
    discount: 0.1,

    calculateTotal: function() {
        this.items.forEach(function(item) {
            var discounted = item - (item * this.discount); // BUG
            console.log(discounted);
        });
    }
};

cart.calculateTotal(); // ERROR: this.discount is undefined
```

**Problem**: _________________________

**Fix the bug**:
```javascript

```

---

## Part 3: Complete the Code 🟡

### Exercise 3.1: Implement All Four Rules

```javascript
// TODO: Create examples demonstrating all four `this` binding rules

// 1. DEFAULT BINDING
// Create a function that shows default binding
function example1() {
    // YOUR CODE

}

// 2. IMPLICIT BINDING
// Create an object with a method that shows implicit binding
var example2 = {
    // YOUR CODE

};

// 3. EXPLICIT BINDING
// Use call() or apply() to explicitly set `this`
function example3() {
    console.log(this.name);
}
// YOUR CODE: Call example3 with a custom context

// 4. NEW BINDING
// Create a constructor function
function Example4(name) {
    // YOUR CODE

}
// YOUR CODE: Create an instance with `new`
```

---

### Exercise 3.2: Build a Chainable API

```javascript
// TODO: Complete this calculator so methods can be chained

function Calculator(initialValue) {
    // YOUR CODE

}

Calculator.prototype.add = function(n) {
    // YOUR CODE: Add n, return this for chaining

};

Calculator.prototype.subtract = function(n) {
    // YOUR CODE: Subtract n, return this

};

Calculator.prototype.multiply = function(n) {
    // YOUR CODE: Multiply by n, return this

};

Calculator.prototype.valueOf = function() {
    // YOUR CODE: Return the current value

};

// Test:
var calc = new Calculator(10);
var result = calc.add(5).subtract(3).multiply(2);
console.log(result.valueOf()); // Should be: (10 + 5 - 3) * 2 = 24
```

---

## Part 4: Compare and Explain 🟡

### Exercise 4.1: Arrow vs Regular Function

```javascript
var obj = {
    name: "Kyle",
    regular: function() {
        console.log(this.name);
    },
    arrow: () => {
        console.log(this.name);
    }
};

obj.regular(); // PREDICT: ?
obj.arrow();   // PREDICT: ?
```

**Explain the difference**:
_____________________________________________________________________
_____________________________________________________________________

---

### Exercise 4.2: Multiple Bindings

```javascript
function greet(greeting, punctuation) {
    console.log(greeting + ", " + this.name + punctuation);
}

var person = { name: "Kyle" };

// Compare these four calls:
greet.call(person, "Hello", "!");      // Method 1
greet.apply(person, ["Hi", "."]);      // Method 2
var greet1 = greet.bind(person);       // Method 3
greet1("Hey", "?");                    // Method 3 continued
var greet2 = greet.bind(person, "Yo"); // Method 4
greet2("~");                           // Method 4 continued
```

**Explain each method**:
1. `call()`: ________________________________________________
2. `apply()`: ________________________________________________
3. `bind()` (partial): _______________________________________
4. `bind()` (full): __________________________________________

---

## Part 5: Challenge Problems 🔴

### Exercise 5.1: The `new` Keyword Edge Case

```javascript
function User(name) {
    this.name = name;
}

User("Joe"); // Called without `new`
console.log(name); // PREDICT: ?

var user = new User("Kyle");
console.log(user.name); // PREDICT: ?
```

**What happened in the first call?**
_____________________________________________________________________

**How to prevent this mistake?**
```javascript

```

---

### Exercise 5.2: Hard Binding Challenge

```javascript
function mul(a, b) {
    return this.value * a * b;
}

// TODO: Create a function that's always bound to { value: 2 }
// and has the first argument pre-bound to 3

// Your bound function should work like this:
var boundMul = // YOUR CODE HERE;
console.log(boundMul(4)); // Should output: 2 * 3 * 4 = 24
console.log(boundMul(5)); // Should output: 2 * 3 * 5 = 30
```

---

### Exercise 5.3: Prototype + `this` Puzzle

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    return this.name + " makes a sound";
};

function Dog(name, breed) {
    Animal.call(this, name); // Why call() here?
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.bark = function() {
    return this.name + " barks!";
};

// TODO: Explain why Animal.call(this, name) is necessary
// What happens without it?

var dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.name);    // ?
console.log(dog.bark());  // ?
console.log(dog.speak()); // ?
```

**Explain**: _____________________________________________________________________
_______________________________________________________________________

---

## Part 6: Mini-Project 🟡

### Build: Event Emitter

Create a simple event emitter that uses `this` correctly:

```javascript
function EventEmitter() {
    this.events = {};
}

// TODO: Implement these methods:

EventEmitter.prototype.on = function(event, callback) {
    // Register a callback for an event
    // YOUR CODE

};

EventEmitter.prototype.emit = function(event, data) {
    // Call all callbacks for this event with `data`
    // Make sure `this` works correctly in callbacks
    // YOUR CODE

};

EventEmitter.prototype.off = function(event, callback) {
    // Remove a specific callback
    // YOUR CODE

};

// Test:
var emitter = new EventEmitter();

emitter.on("click", function(data) {
    console.log("Clicked: " + data);
    console.log("This is emitter:", this instanceof EventEmitter); // Should be true
});

emitter.emit("click", "Button 1"); // Should log: "Clicked: Button 1"
emitter.emit("click", "Button 2"); // Should log: "Clicked: Button 2"
```

---

## Completed

- [ ] All predict exercises completed
- [ ] All debug exercises solved (3 methods for each)
- [ ] All code completion exercises finished
- [ ] Mini-project working
- [ ] Can explain all four `this` binding rules

---

## Confidence Level After Exercises

_____ / 5

**What still confuses you about `this`?**
_____________________________________________________________________
_____________________________________________________________________

---

**Next Steps**: Try the playground exercises in `/playground/objects-classes/this-binding/`
