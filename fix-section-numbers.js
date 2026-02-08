const fs = require('fs');
const path = require('path');

// Configuration
const STUDY_TRACKER_DIR = path.join(__dirname, 'study-tracker', 'books');

/**
 * Fix section numbers in renamed files
 */
const fixSectionNumbers = (sectionsDir) => {
  if (!fs.existsSync(sectionsDir)) {
    return;
  }

  const files = fs.readdirSync(sectionsDir);
  const numberedFiles = files.filter(f => f.match(/^\d+\./));

  numberedFiles.forEach(file => {
    const filePath = path.join(sectionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract the section number from filename (e.g., "04.many-faces.md" -> 4)
    const match = file.match(/^(\d+)\./);
    if (!match) return;

    const sectionNum = parseInt(match[1], 10); // Convert "04" to 4

    // Update the section line to use non-padded number
    const newContent = content.replace(
      /(\*\*Section\*\*:\s*)\d+\.\s+(.+)/,
      `$1${sectionNum}. $2`
    );

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`    Updated: ${file}`);
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

      const sectionsDir = path.join(bookPath, chapter.name, 'sections');

      if (!fs.existsSync(sectionsDir)) {
        continue;
      }

      console.log(`  ${chapter.name}/sections:`);
      fixSectionNumbers(sectionsDir);
    }
  }
};

// Main execution
console.log('Starting to fix section numbers in renamed files...\n');
processAllBooks();
console.log('\nDone!');
