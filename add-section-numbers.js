const fs = require('fs');
const path = require('path');

// Configuration
const BOOKS_DIR = path.join(__dirname, 'ydkjs-books');
const EXCLUDED_DIRS = ['.github', 'node_modules'];
const EXCLUDED_FILES = ['README.md', 'CONTRIBUTING.md', 'PULL_REQUEST_TEMPLATE.md', 'preface.md', 'toc.md', 'foreword.md', 'thanks.md', 'apA.md', 'apB.md'];

/**
 * Add numbering to markdown headings
 */
function addNumberingToContent(content) {
  const lines = content.split('\n');
  const result = [];
  let sectionNumber = 0;
  let subsectionNumber = 0;

  for (let line of lines) {
    // Check if this is a level 2 heading (##)
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      sectionNumber++;
      subsectionNumber = 0;
      const title = line.substring(3).trim();
      const numberedTitle = `${sectionNumber}. ${title}`;
      result.push(`## ${numberedTitle}`);
    }
    // Check if this is a level 3 heading (###)
    else if (line.startsWith('### ')) {
      subsectionNumber++;
      const title = line.substring(4).trim();
      const numberedTitle = `${sectionNumber}.${subsectionNumber} ${title}`;
      result.push(`### ${numberedTitle}`);
    }
    else {
      result.push(line);
    }
  }

  return result.join('\n');
}

/**
 * Check if a file should be processed
 */
function shouldProcessFile(filePath) {
  const basename = path.basename(filePath);

  // Check if it's a markdown file
  if (!basename.endsWith('.md')) {
    return false;
  }

  // Check if it's in the excluded list
  if (EXCLUDED_FILES.includes(basename)) {
    return false;
  }

  // Check if it's a chapter file (ch1.md, ch2.md, etc.)
  const chapterMatch = basename.match(/^ch\d+\.md$/);
  return chapterMatch !== null;
}

/**
 * Process all chapter files in a directory
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip excluded directories
      if (EXCLUDED_DIRS.includes(entry.name)) {
        continue;
      }
      processDirectory(fullPath);
    }
    else if (entry.isFile() && shouldProcessFile(fullPath)) {
      console.log(`Processing: ${fullPath}`);

      // Read the file
      const content = fs.readFileSync(fullPath, 'utf8');

      // Add numbering
      const newContent = addNumberingToContent(content);

      // Write back
      fs.writeFileSync(fullPath, newContent, 'utf8');

      console.log(`  -> Updated successfully`);
    }
  }
}

// Main execution
console.log('Starting to add section numbers...\n');
processDirectory(BOOKS_DIR);
console.log('\nDone!');
