const fs = require("fs");

const input = fs.readFileSync("folder-structure.txt", "utf-8");
const lines = input.split("\n");

let output = "```mermaid\ngraph TD\n";

const stack = [];
const idMap = {};

lines.forEach((line, i) => {
  if (!line.trim()) return;

  // Calculate depth: each indent level is typically 4 spaces or one ├/│/└
  const depth = (line.match(/^[\s│]+/) || [""])[0].length / 4;

  // Extract label name and generate unique ID
  const label = line.replace(/^[\s│├└─]+/, "").trim();
  const id = `node_${i}_${label.replace(/\W+/g, "_")}`;
  idMap[i] = { id, label, depth };

  // Register the node
  output += `  ${id}["${label}"]\n`;

  // Link to parent if not root
  if (depth > 0) {
    // Find closest previous node with depth - 1
    for (let j = i - 1; j >= 0; j--) {
      if (idMap[j] && idMap[j].depth === depth - 1) {
        output += `  ${idMap[j].id} --> ${id}\n`;
        break;
      }
    }
  }
});

output += "```";

fs.writeFileSync("folder-structure.mmd", output);
console.log("✅ Mermaid diagram saved to folder-structure.mmd");
