# New Folder Structure - Everything in One Place!

## Old Structure ( scattered across folders )
```
study-tracker/books/get-started/
├── chapters/
│   └── ch1/
│       ├── section1.md
│       └── section2.md
├── exercises/
│   └── ch1.md
└── notes/
    └── ...
```

## New Structure (Everything in ONE folder!)

```
study-tracker/books/get-started/ch1/
├── sections/          ← All note templates for this chapter
│   ├── about-this-book.md
│   ├── whats-with-that-name.md
│   ├── language-specification.md
│   └── ...
├── exercises.md       ← Chapter exercises
├── tracker.md         ← Progress tracking for this chapter
└── journal.md         ← Your journal for this chapter
```

---

## How to Study a Chapter

### Step 1: Navigate to the chapter folder
```bash
cd study-tracker/books/get-started/ch1/
```

### Step 2: Open the folder (you'll see everything)
```
ch1/
├── sections/     ← Note templates
├── exercises.md  ← Exercises
├── tracker.md    ← Progress
└── journal.md    ← Journal
```

### Step 3: Follow the cycle
```
READ → UNDERSTAND → PRACTICE → EXERCISE → TRACK → JOURNAL
```

---

## All Book Structures

### Book 1: Get Started
```
study-tracker/books/get-started/
├── ch1/        (sections/, exercises.md, tracker.md, journal.md)
├── ch2/        (sections/, exercises.md, tracker.md, journal.md)
├── ch3/        (sections/, exercises.md, tracker.md, journal.md)
├── ch4/        (sections/, exercises.md, tracker.md, journal.md)
└── appendices/ (sections/, exercises.md, tracker.md, journal.md)
```

### Book 2: Scope & Closures
```
study-tracker/books/scope-closures/
├── ch1/ to ch8/   (each with sections/, exercises.md, tracker.md, journal.md)
└── appendices/
```

### Book 3: Objects & Classes
```
study-tracker/books/objects-classes/
└── ch1/ to ch5/   (each with sections/, exercises.md, tracker.md, journal.md)
```

### Book 4: Types & Grammar
```
study-tracker/books/types-grammar/
└── ch1/ to ch4/   (each with sections/, exercises.md, tracker.md, journal.md)
```

---

## Quick Commands

```bash
# Go to your current chapter
cd study-tracker/books/get-started/ch1/

# Open everything in that folder
open .

# Read the book
open ydkjs-books/get-started/ch1.md

# Practice coding
cd playground/
```

---

## Benefits

1. **No confusion** - Everything for one chapter in ONE folder
2. **Easy navigation** - Just cd into ch1, ch2, etc.
3. **Self-contained** - Each chapter has its own tracker, journal, exercises
4. **Simple** - No more hunting across multiple folders

---

**Remember: Each chapter folder = Everything you need for that chapter!**
