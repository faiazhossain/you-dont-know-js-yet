const fs = require('fs');
const path = require('path');

// Configuration
const STUDY_TRACKER_DIR = path.join(__dirname, 'study-tracker', 'books');

/**
 * Map section file names to their section titles
 * This is derived from the ydkjs-books chapter structure
 */
const getSectionOrder = (bookName, chapterNum) => {
  const sectionOrders = {
    'get-started': {
      1: [
        'About This Book',
        "What's With That Name?",
        'Language Specification',
        'Many Faces',
        'Backwards & Forwards',
        "What's in an Interpretation?",
        'Strictly Speaking',
        'Defined'
      ],
      2: [
        'Each File is a Program',
        'Values',
        'Declaring and Using Variables',
        'Functions',
        'Comparisons',
        'How We Organize in JS',
        'The Rabbit Hole Deepens'
      ],
      3: [
        'Iteration',
        'Closure',
        'this Keyword',
        'Prototypes',
        'Asking Why'
      ],
      4: [
        'Pillar 1: Scope & Closures',
        'Pillar 2: Prototypes',
        'Pillar 3: Types & Coercion',
        'With the Grain',
        'In Order'
      ]
    },
    'scope-closures': {
      1: [
        'About This Book',
        'Compiled vs Interpreted',
        'Compiling Code',
        'Compiler Speak',
        'Cheating',
        'Lexical Scope'
      ],
      2: [
        "Marbles, Buckets, Bubbles",
        "A Conversation Among Friends",
        "Nested Scope",
        "Continue the Conversation"
      ],
      3: [
        "The Lookup",
        "Shadowing",
        "Function Name Scope",
        "Arrow Functions",
        "Backing Out"
      ],
      4: [
        "Why Global Scope?",
        "Where's Global Scope?",
        "Global this",
        "Globally Aware"
      ],
      5: [
        "The Rules of the Stack",
        "Getting Back Into Closure",
        "It's a Lightbulb Moment",
        "Tabulating Closure"
      ],
      6: [
        "Some Modest Modularity",
        "What's a Module?",
        "ES Modules",
        "Node Modules",
        "Module Patterns"
      ],
      7: [
        "Dynamic Scope",
        "The Mechanism of Scope",
        "Block Scope"
      ],
      8: [
        "Back to the Future",
        "Try...Catch",
        "let",
        "const",
        "The Case for var",
        "Gotchas"
      ]
    },
    'objects-classes': {
      1: [
        'About This Book',
        'Objects as Containers',
        'Defining Properties',
        'Accessing Properties',
        'Assigning Properties',
        'Deleting Properties',
        'Determining Contents',
        'Temporary Containers',
        'Collections of Properties'
      ],
      2: [
        'Property Descriptors',
        'Object Sub-Types',
        'Object Characteristics',
        'Extending MOP',
        'Prototype Chain',
        "Objects' Behavior"
      ],
      3: [
        'When Class-Oriented',
        'Keep It Classy',
        'Class Instance this',
        'Class Extension',
        'Static Class',
        'Private Class',
        'Class Example'
      ],
      4: [
        'this-Aware Functions',
        'this Is It',
        'Arrow Points',
        'Variations',
        'Stay Aware'
      ],
      5: [
        'Preamble',
        "What's a Constructor?",
        'Ditching Class',
        'Delegation Illustrated',
        'Composing Peer Objects',
        'Why this?',
        'Summary'
      ]
    },
    'types-grammar': {
      1: [
        'About This Book',
        'Value Types',
        'Empty Values',
        'Boolean Values',
        'String Values',
        'Number Values',
        'BigInt Values',
        'Symbol Values',
        'Built-In Types'
      ],
      2: [
        'Immutability',
        'Assignments',
        'String Behaviors',
        'Number Behaviors',
        'Foundational Value Types'
      ],
      3: [
        'Types of Objects',
        'Plain Objects',
        'Fundamental Objects',
        'Built-In Objects',
        'Arrays',
        'Regex',
        'Functions',
        'Records & Tuples'
      ],
      4: [
        'Coercion (Explicit vs Implicit)',
        'Abstracts',
        'Concrete Coercions',
        'Corner Cases'
      ]
    },
    'sync-async': {
      1: [
        'About This Book',
        'Sync vs Async',
        'Async Loop Patterns',
        'Jobs & Event Loops',
        'Parallel & Sequential',
        'Promise.all(..)',
        'Promise.race(..)',
        'Promise Concurrency Coordination',
        'Chained Promises',
        'Promise Generators',
        'Summary'
      ]
    },
    'es-next-beyond': {
      1: [
        'About This Book',
        'New Features Overview',
        // Add more sections as needed
      ]
    }
  };

  if (!sectionOrders[bookName] || !sectionOrders[bookName][chapterNum]) {
    return [];
  }

  return sectionOrders[bookName][chapterNum];
};

/**
 * Find section file by title
 */
const findSectionFile = (sectionsDir, title) => {
  if (!fs.existsSync(sectionsDir)) {
    return null;
  }

  const files = fs.readdirSync(sectionsDir);

  // Try exact match
  for (const file of files) {
    const filePath = path.join(sectionsDir, file);
    if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const sectionMatch = content.match(/\*\*Section\*\*:\s*(.+)$/m);
      if (sectionMatch && sectionMatch[1].trim() === title) {
        return file;
      }
    }
  }

  return null;
};

/**
 * Update section file with numbered title
 */
const updateSectionFile = (filePath, sectionNumber, title) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(
    /(\*\*Section\*\*:\s*)(.+)/,
    `$1${sectionNumber}. $2`
  );
  fs.writeFileSync(filePath, newContent, 'utf8');
};

/**
 * Update tracker file with numbered sections
 */
const updateTrackerFile = (trackerPath, sectionOrder) => {
  const content = fs.readFileSync(trackerPath, 'utf8');

  let newContent = content;
  sectionOrder.forEach((title, index) => {
    const sectionNum = index + 1;
    // Match the section title in the table
    const regex = new RegExp(`^\\|\\s*${escapeRegExp(title)}\\s*\\|`, 'm');
    newContent = newContent.replace(regex, `| ${sectionNum}. ${title} |`);
  });

  fs.writeFileSync(trackerPath, newContent, 'utf8');
};

/**
 * Escape special regex characters
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Process a chapter directory
 */
const processChapter = (bookName, chapterNum, chapterDir) => {
  const sectionsDir = path.join(chapterDir, 'sections');
  const trackerPath = path.join(chapterDir, 'tracker.md');

  if (!fs.existsSync(sectionsDir) || !fs.existsSync(trackerPath)) {
    return;
  }

  const sectionOrder = getSectionOrder(bookName, chapterNum);

  if (sectionOrder.length === 0) {
    console.log(`  No section order found for ${bookName} ch${chapterNum}`);
    return;
  }

  console.log(`  Processing chapter ${chapterNum} with ${sectionOrder.length} sections`);

  // Update section files
  sectionOrder.forEach((title, index) => {
    const sectionNum = index + 1;
    const sectionFile = findSectionFile(sectionsDir, title);

    if (sectionFile) {
      const filePath = path.join(sectionsDir, sectionFile);
      updateSectionFile(filePath, sectionNum, title);
      console.log(`    Updated: ${sectionFile} -> ${sectionNum}. ${title}`);
    } else {
      console.log(`    WARNING: Section file not found for: ${title}`);
    }
  });

  // Update tracker file
  updateTrackerFile(trackerPath, sectionOrder);
  console.log(`    Updated: tracker.md`);
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
console.log('Starting to add section numbers to study tracker...\n');
processAllBooks();
console.log('\nDone!');
