// scripts/patch-docs.js
const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "../public/docs/styles");

const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');\n`;
const fontOverride = `\n* { font-family: 'Orbitron', sans-serif !important; }\n`;

if (fs.existsSync(stylesDir)) {
  const cssFiles = fs
    .readdirSync(stylesDir)
    .filter((file) => file.endsWith(".css"));

  cssFiles.forEach((file) => {
    const filePath = path.join(stylesDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    // 1. Prepend @import at the very top (required by CSS specification)
    if (!content.includes("fonts.googleapis.com")) {
      content = fontImport + content;
    }

    // 2. Append universal selector at the end to override all JSDoc classes
    content = content + fontOverride;

    fs.writeFileSync(filePath, content);
    console.log(`[patch-docs] Applied Orbitron to ${file}`);
  });
} else {
  console.error(`[patch-docs] Error: Directory not found at ${stylesDir}`);
}
