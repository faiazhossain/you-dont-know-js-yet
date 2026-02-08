const fs = require('fs');
const path = require('path');

// Configuration
const STUDY_TRACKER_DIR = path.join(__dirname, 'study-tracker', 'books');

/**
 * Map section file names to their section titles and order
 */
const getSectionOrder = (bookName, chapterNum) => {
  const sectionOrders = {
    'get-started': {
      1: [
        { file: 'about-this-book.md', title: 'About This Book' },
        { file: 'whats-with-that-name.md', title: "What's With That Name?" },
        { file: 'language-specification.md', title: 'Language Specification' },
        { file: 'many-faces.md', title: 'Many Faces' },
        { file: 'backwards-forwards.md', title: 'Backwards & Forwards' },
        { file: 'whats-in-an-interpretation.md', title: "What's in an Interpretation?" },
        { file: 'strictly-speaking.md', title: 'Strictly Speaking' },
        { file: 'defined.md', title: 'Defined' }
      ],
      2: [
        { file: 'each-file-is-a-program.md', title: 'Each File is a Program' },
        { file: 'values.md', title: 'Values' },
        { file: 'declaring-and-using-variables.md', title: 'Declaring and Using Variables' },
        { file: 'functions.md', title: 'Functions' },
        { file: 'comparisons.md', title: 'Comparisons' },
        { file: 'how-we-organize-in-js.md', title: 'How We Organize in JS' },
        { file: 'the-rabbit-hole-deepens.md', title: 'The Rabbit Hole Deepens' }
      ],
      3: [
        { file: 'iteration.md', title: 'Iteration' },
        { file: 'closure.md', title: 'Closure' },
        { file: 'this-keyword.md', title: 'this Keyword' },
        { file: 'prototypes.md', title: 'Prototypes' },
        { file: 'asking-why.md', title: 'Asking Why' }
      ],
      4: [
        { file: 'pillar-1-scope-closure.md', title: 'Pillar 1: Scope & Closures' },
        { file: 'pillar-2-prototypes.md', title: 'Pillar 2: Prototypes' },
        { file: 'pillar-3-types-coercion.md', title: 'Pillar 3: Types & Coercion' },
        { file: 'with-the-grain.md', title: 'With the Grain' },
        { file: 'in-order.md', title: 'In Order' }
      ]
    },
    'scope-closures': {
      1: [
        { file: 'about-this-book.md', title: 'About This Book' },
        { file: 'compiled-vs-interpreted.md', title: 'Compiled vs Interpreted' },
        { file: 'compiling-code.md', title: 'Compiling Code' },
        { file: 'compiler-speak.md', title: 'Compiler Speak' },
        { file: 'cheating.md', title: 'Cheating' },
        { file: 'lexical-scope.md', title: 'Lexical Scope' }
      ],
      2: [
        { file: 'marbles-buckets-bubbles.md', title: "Marbles, Buckets, Bubbles" },
        { file: 'conversation-among-friends.md', title: "A Conversation Among Friends" },
        { file: 'nested-scope.md', title: "Nested Scope" },
        { file: 'continue-conversation.md', title: "Continue the Conversation" }
      ],
      3: [
        { file: 'lookup-conceptual.md', title: "The Lookup" },
        { file: 'shadowing.md', title: "Shadowing" },
        { file: 'function-name-scope.md', title: "Function Name Scope" },
        { file: 'arrow-functions.md', title: "Arrow Functions" },
        { file: 'backing-out.md', title: "Backing Out" }
      ],
      4: [
        { file: 'why-global-scope.md', title: "Why Global Scope?" },
        { file: 'where-global-scope.md', title: "Where's Global Scope?" },
        { file: 'global-this.md', title: "Global this" },
        { file: 'globally-aware.md', title: "Globally Aware" }
      ]
    },
    'objects-classes': {
      1: [
        { file: 'about-this-book.md', title: 'About This Book' },
        { file: 'objects-as-containers.md', title: 'Objects as Containers' },
        { file: 'defining-properties.md', title: 'Defining Properties' },
        { file: 'accessing-properties.md', title: 'Accessing Properties' },
        { file: 'assigning-properties.md', title: 'Assigning Properties' },
        { file: 'deleting-properties.md', title: 'Deleting Properties' },
        { file: 'determining-contents.md', title: 'Determining Contents' },
        { file: 'temporary-containers.md', title: 'Temporary Containers' },
        { file: 'collections-of-properties.md', title: 'Collections of Properties' }
      ],
      2: [
        { file: 'property-descriptors.md', title: 'Property Descriptors' },
        { file: 'object-sub-types.md', title: 'Object Sub-Types' },
        { file: 'object-characteristics.md', title: 'Object Characteristics' },
        { file: 'extending-mop.md', title: 'Extending MOP' },
        { file: 'prototype-chain.md', title: 'Prototype Chain' },
        { file: 'objects-behavior.md', title: "Objects' Behavior" }
      ],
      3: [
        { file: 'when-class-oriented.md', title: 'When Class-Oriented' },
        { file: 'keep-it-classy.md', title: 'Keep It Classy' },
        { file: 'class-instance-this.md', title: 'Class Instance this' },
        { file: 'class-extension.md', title: 'Class Extension' },
        { file: 'static-class.md', title: 'Static Class' },
        { file: 'private-class.md', title: 'Private Class' },
        { file: 'class-example.md', title: 'Class Example' }
      ],
      4: [
        { file: 'this-aware.md', title: 'this-Aware Functions' },
        { file: 'this-is-it.md', title: 'this Is It' },
        { file: 'arrow-points.md', title: 'Arrow Points' },
        { file: 'variations.md', title: 'Variations' },
        { file: 'stay-aware.md', title: 'Stay Aware' }
      ],
      5: [
        { file: 'preamble.md', title: 'Preamble' },
        { file: 'whats-constructor.md', title: "What's a Constructor?" },
        { file: 'ditching-class.md', title: 'Ditching Class' },
        { file: 'delegation-illustrated.md', title: 'Delegation Illustrated' },
        { file: 'composing-peer-objects.md', title: 'Composing Peer Objects' },
        { file: 'why-this.md', title: 'Why this?' },
        { file: 'summary.md', title: 'Summary' }
      ]
    },
    'types-grammar': {
      1: [
        { file: 'about-this-book.md', title: 'About This Book' },
        { file: 'value-types.md', title: 'Value Types' },
        { file: 'empty-values.md', title: 'Empty Values' },
        { file: 'boolean-values.md', title: 'Boolean Values' },
        { file: 'string-values.md', title: 'String Values' },
        { file: 'number-values.md', title: 'Number Values' },
        { file: 'bigint-values.md', title: 'BigInt Values' },
        { file: 'symbol-values.md', title: 'Symbol Values' },
        { file: 'built-in-types.md', title: 'Built-In Types' }
      ],
      2: [
        { file: 'immutability.md', title: 'Immutability' },
        { file: 'assignments.md', title: 'Assignments' },
        { file: 'string-behaviors.md', title: 'String Behaviors' },
        { file: 'number-behaviors.md', title: 'Number Behaviors' },
        { file: 'foundational.md', title: 'Foundational Value Types' }
      ],
      3: [
        { file: 'types-of-objects.md', title: 'Types of Objects' },
        { file: 'plain-objects.md', title: 'Plain Objects' },
        { file: 'fundamental-objects.md', title: 'Fundamental Objects' },
        { file: 'built-in-objects.md', title: 'Built-In Objects' },
        { file: 'arrays.md', title: 'Arrays' },
        { file: 'regex.md', title: 'Regex' },
        { file: 'functions.md', title: 'Functions' },
        { file: 'records-tuples.md', title: 'Records & Tuples' }
      ],
      4: [
        { file: 'coercion-explicit-implicit.md', title: 'Coercion (Explicit vs Implicit)' },
        { file: 'abstracts.md', title: 'Abstracts' },
        { file: 'concrete-coercions.md', title: 'Concrete Coercions' },
        { file: 'corner-cases.md', title: 'Corner Cases' }
      ]
    },
    'sync-async': {
      1: [
        { file: 'about-this-book.md', title: 'About This Book' },
        { file: 'sync-vs-async.md', title: 'Sync vs Async' },
        { file: 'async-loop-patterns.md', title: 'Async Loop Patterns' },
        { file: 'jobs-event-loops.md', title: 'Jobs & Event Loops' },
        { file: 'parallel-sequential.md', title: 'Parallel & Sequential' },
        { file: 'promise-all.md', title: 'Promise.all(..)' },
        { file: 'promise-race.md', title: 'Promise.race(..)' },
        { file: 'promise-concurrency-coordination.md', title: 'Promise Concurrency Coordination' },
        { file: 'chained-promises.md', title: 'Chained Promises' },
        { file: 'promise-generators.md', title: 'Promise Generators' },
        { file: 'summary.md', title: 'Summary' }
      ]
    }
  };

  if (!sectionOrders[bookName] || !sectionOrders[bookName][chapterNum]) {
    return [];
  }

  return sectionOrders[bookName][chapterNum];
};

/**
 * Rename section file with numeric prefix
 */
const renameSectionFile = (sectionsDir, fileInfo, index) => {
  const oldPath = path.join(sectionsDir, fileInfo.file);

  if (!fs.existsSync(oldPath)) {
    return { success: false, message: `File not found: ${fileInfo.file}` };
  }

  const num = String(index + 1).padStart(2, '0');
  const newFileName = `${num}.${fileInfo.file}`;
  const newPath = path.join(sectionsDir, newFileName);

  // Skip if already renamed
  if (oldPath === newPath) {
    return { success: true, message: `Already numbered: ${newFileName}` };
  }

  // Check if new file already exists
  if (fs.existsSync(newPath)) {
    return { success: false, message: `Target file exists: ${newFileName}` };
  }

  fs.renameSync(oldPath, newPath);
  return { success: true, message: `${fileInfo.file} -> ${newFileName}` };
};

/**
 * Update source references in renamed files
 */
const updateSourceReferences = (sectionsDir, fileInfo, index) => {
  const num = String(index + 1).padStart(2, '0');
  const sectionNum = index + 1; // Use non-padded number for section title
  const newFileName = `${num}.${fileInfo.file}`;
  const filePath = path.join(sectionsDir, newFileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /(\*\*Section\*\*:\s*)(\d+\.\s+)?(.+)/,
    `$1${sectionNum}. $3`
  );
  fs.writeFileSync(filePath, newContent, 'utf8');
};

/**
 * Process a chapter directory
 */
const processChapter = (bookName, chapterNum, chapterDir) => {
  const sectionsDir = path.join(chapterDir, 'sections');

  if (!fs.existsSync(sectionsDir)) {
    return;
  }

  const sectionOrder = getSectionOrder(bookName, chapterNum);

  if (sectionOrder.length === 0) {
    console.log(`  No section order found for ${bookName} ch${chapterNum}`);
    return;
  }

  console.log(`  Processing chapter ${chapterNum} with ${sectionOrder.length} sections`);

  // Rename files
  sectionOrder.forEach((fileInfo, index) => {
    const result = renameSectionFile(sectionsDir, fileInfo, index);
    if (result.success) {
      console.log(`    ✓ ${result.message}`);
      // Update source references in the renamed file
      updateSourceReferences(sectionsDir, fileInfo, index);
    } else {
      console.log(`    ✗ ${result.message}`);
    }
  });
};

/**
 * Process all books
 */
const processAllBooks = () => {
  const booksDir = STUDY_TRACKER_DIR;

  if (!fs.existsSync(booksDir)) {
    console.log('Study tracker directory not found');
    return;
  }

  const books = fs.readdirSync(booksDir, { withFileTypes: true });

  for (const book of books) {
    if (!book.isDirectory()) {
      continue;
    }

    const bookPath = path.join(booksDir, book.name);
    const chapters = fs.readdirSync(bookPath, { withFileTypes: true });

    console.log(`\nProcessing book: ${book.name}`);

    for (const chapter of chapters) {
      if (!chapter.isDirectory()) {
        continue;
      }

      // Extract chapter number from directory name
      const chapterMatch = chapter.name.match(/^ch(\d+)$/);
      if (!chapterMatch) {
        continue;
      }

      const chapterNum = parseInt(chapterMatch[1], 10);
      const chapterPath = path.join(bookPath, chapter.name);

      console.log(`  Chapter ${chapterNum}:`);
      processChapter(book.name, chapterNum, chapterPath);
    }
  }
};

// Main execution
console.log('Starting to rename section files with numeric prefixes...\n');
processAllBooks();
console.log('\nDone!');
