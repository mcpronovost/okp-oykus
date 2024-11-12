import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frTranslations = JSON.parse(fs.readFileSync(path.join(__dirname, "./locales/fr.json"), "utf8"));
const enTranslations = JSON.parse(fs.readFileSync(path.join(__dirname, "./locales/en.json"), "utf8"));

function extractTranslationKeys(content) {
  const regex = /t\([""](.*?)[""]\)/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(match => match[1]);
}

function walkDir(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith(".astro") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(filePath, "utf8");
      const keys = extractTranslationKeys(content);
      if (keys.length > 0) {
        results.push({ file: filePath, keys });
      }
    }
  }

  return results;
}

function checkMissingTranslations() {
  const files = walkDir(path.join(__dirname, "../.."));
  let hasMissing = false;

  files.forEach(({ file, keys }) => {
    const missingFr = keys.filter(key => !frTranslations[key]);
    const missingEn = keys.filter(key => !enTranslations[key]);

    if (missingFr.length > 0 || missingEn.length > 0) {
      hasMissing = true;
      console.log(`\nFile: ${file}`);

      if (missingFr.length > 0) {
        console.log("Missing French translations:", missingFr);
      }
      if (missingEn.length > 0) {
        console.log("Missing English translations:", missingEn);
      }
    }
  });

  if (hasMissing) {
    process.exit(1);
  } else {
    console.log("All translations are present! ✨");
  }
}

checkMissingTranslations();