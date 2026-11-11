import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const requiredFiles = [manifest.action.default_popup, "src/wikipedia-url.js", ...manifest.content_scripts.flatMap((entry) => entry.js)];
for (const file of requiredFiles) if (!fs.existsSync(file)) throw new Error(`Arquivo ausente no manifesto: ${file}`);
if (manifest.manifest_version !== 3) throw new Error("A extensão deve usar Manifest V3.");
if (manifest.content_scripts.some((entry) => entry.matches.some((match) => !match.includes("wikipedia.org")))) throw new Error("Content script autorizado fora da Wikipédia.");
if (!manifest.host_permissions?.includes("https://*.wikipedia.org/*")) throw new Error("Permissão para subdomínios da Wikipédia ausente.");
console.log("Manifesto e arquivos da extensão validados.");
