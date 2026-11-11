import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const requiredFiles = [manifest.action.default_popup, ...manifest.content_scripts.flatMap((entry) => entry.js)];
for (const file of requiredFiles) if (!fs.existsSync(file)) throw new Error(`Arquivo ausente no manifesto: ${file}`);
if (manifest.manifest_version !== 3) throw new Error("A extensão deve usar Manifest V3.");
if (manifest.content_scripts.some((entry) => entry.matches.some((match) => !match.includes("wikipedia.org")))) throw new Error("Content script autorizado fora da Wikipédia.");
console.log("Manifesto e arquivos da extensão validados.");
