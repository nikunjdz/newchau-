const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'newchau');
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const oldCSS = /<style>\s*html, body, p, li, td, th, dd, blockquote, font, a \{\s*font-size: 115% !important;\s*\}\s*body \{\s*text-align: center !important;\s*\}\s*table \{\s*margin-left: auto !important;\s*margin-right: auto !important;\s*\}\s*td, p, font, blockquote \{\s*text-align: left !important;\s*\}\s*h1, h2, h3, h4, h5, h6 \{\s*text-align: center !important;\s*\}\s*div\[align="center"\] \{\s*text-align: center !important;\s*\}\s*\/\* Mobile responsive \*\/\s*@media screen and \(max-width: 768px\) \{[\s\S]*?\}\s*<\/style>/;

const newCSS = `<style>
  html, body, p, li, td, th, dd, blockquote, font, a {
    font-size: 115% !important;
  }
  body {
    text-align: center !important;
  }
  table {
    margin-left: auto !important;
    margin-right: auto !important;
  }
  td, p, font, blockquote {
    text-align: left !important;
  }
  p {
    margin-bottom: 1em !important;
    line-height: 1.6 !important;
  }
  blockquote {
    margin: 1.5em 2em !important;
    padding: 1em !important;
    line-height: 1.6 !important;
  }
  h1, h2, h3, h4, h5, h6 {
    text-align: center !important;
  }
  div[align="center"] {
    text-align: center !important;
  }
  /* Mobile responsive */
  @media screen and (max-width: 768px) {
    html, body, p, li, td, th, dd, blockquote, font, a {
      font-size: 100% !important;
    }
    table[width="70%"] {
      width: 95% !important;
    }
    table {
      width: 95% !important;
    }
    body {
      padding: 10px !important;
    }
    blockquote {
      margin: 1em 0.5em !important;
      padding: 0.75em !important;
    }
  }
</style>`;

let updatedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  // Skip granD911.html as it's already updated
  if (file === 'granD911.html') {
    skippedCount++;
    return;
  }

  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (oldCSS.test(content)) {
    content = content.replace(oldCSS, newCSS);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✓ Updated: ${file}`);
  } else {
    console.log(`- Skipped (pattern not found): ${file}`);
  }
});

console.log(`\nDone! Updated ${updatedCount} files, skipped ${skippedCount} files.`);
