import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Group translations by language (en/fr)
const localesDir = path.join(__dirname, "./locales");

// Initialize translations object
const translations = {
  en: {},
  fr: {}
};

// Function to recursively read all JSON files from a directory and its subdirectories
function readJsonFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read subdirectories
      readJsonFiles(filePath);
    } else if (file.endsWith(".json")) {
      const locale = path.basename(file, ".json");
      const lang = locale.split("-")[0]; // This will convert "en-US" to "en"
      if (lang === "en" || lang === "fr") {
        const fileTranslations = JSON.parse(
          fs.readFileSync(filePath, "utf8")
        );
        // Merge translations, allowing keys from multiple files
        Object.assign(translations[lang], fileTranslations);
      }
    }
  });
}

// Read all JSON files from locales directory and its subdirectories
readJsonFiles(localesDir);

function extractTranslationKeys(content) {
  // Match t() only if it's not part of a word (e.g. t("test") is matched, but import("test") is not)
  const regex = /(?<![\w])t\([""](.*?)[""]\)/g;
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
    keys.forEach(key => {
      const missingLangs = [];
      if (!translations.en[key]) missingLangs.push("en");
      if (!translations.fr[key]) missingLangs.push("fr");
      
      if (missingLangs.length > 0) {
        hasMissing = true;
        console.log(`\nFile: ${file}`);
        console.log(`Missing translations for key "${key}" in: ${missingLangs.join(", ")}`);
      }
    });
  });

  if (hasMissing) {
    process.exit(1);
  } else {
    console.log("All translations are present! ✨");
  }
}

checkMissingTranslations();