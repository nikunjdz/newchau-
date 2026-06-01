const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'newchau');
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const oldCSS = `<style>
  html, body, p, li, td, th, dd, blockquote, font, a {
    font-size: 115% !important;
  }
  td, p, font, blockquote {
    text-align: justify !important;
  }
</style>`;

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
  }
</style>`;

let updatedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  // Skip already updated files
  if (['911meds.html', 'mcjihad.html', 'afgan.html', 'index.html'].includes(file)) {
    skippedCount++;
    return;
  }

  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(oldCSS)) {
    content = content.replace(oldCSS, newCSS);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✓ Updated: ${file}`);
  } else {
    console.log(`- Skipped (CSS not found): ${file}`);
  }
});

console.log(`\nDone! Updated ${updatedCount} files, skipped ${skippedCount} files.`);
