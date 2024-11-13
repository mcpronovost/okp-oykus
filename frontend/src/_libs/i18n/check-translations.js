// This script checks for missing translations in the project.
// It reads all translation files from the locales directory,
// then scans all .astro and .tsx files for t() function calls.
// It verifies that each translation key found in the code exists
// in both English (en) and French (fr) translation files.

// Step 1: Import required Node.js modules
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Step 2: Set up file path variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Step 3: Define path to locales directory
const localesDir = path.join(__dirname, "./locales");

// Step 4: Initialize translations object to store all translations by language
const translations = {
  en: {},
  fr: {}
};

// Step 5: Define function to recursively read JSON translation files
function readJsonFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Step 5.1: Recursively read subdirectories
      readJsonFiles(filePath);
    } else if (file.endsWith(".json")) {
      // Step 5.2: Extract language code from filename
      const locale = path.basename(file, ".json");
      const lang = locale.split("-")[0]; // This will convert "en-US" to "en"
      if (lang === "en" || lang === "fr") {
        // Step 5.3: Read and parse JSON file
        const fileTranslations = JSON.parse(
          fs.readFileSync(filePath, "utf8")
        );
        // Step 5.4: Merge translations into main object
        Object.assign(translations[lang], fileTranslations);
      }
    }
  });
}

// Step 6: Load all translations from JSON files
readJsonFiles(localesDir);

// Step 7: Define function to extract translation keys from source files
function extractTranslationKeys(content) {
  // Match t() only if it's not part of a word (e.g. t("test") is matched, but import("test") is not)
  const regex = /(?<![\w])t\([""](.*?)[""]\)/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(match => match[1]);
}

// Step 8: Define function to recursively walk through directories
function walkDir(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Step 8.1: Recursively process subdirectories
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith(".astro") || file.endsWith(".tsx")) {
      // Step 8.2: Read and process .astro and .tsx files
      const content = fs.readFileSync(filePath, "utf8");
      const keys = extractTranslationKeys(content);
      if (keys.length > 0) {
        results.push({ file: filePath, keys });
      }
    }
  }

  return results;
}

// Step 9: Define main function to check for missing translations
function checkMissingTranslations() {
  // Step 9.1: Get all files with translation keys
  const files = walkDir(path.join(__dirname, "../.."));
  let hasMissing = false;

  // Step 9.2: Check each translation key in every file
  files.forEach(({ file, keys }) => {
    keys.forEach(key => {
      const missingLangs = [];
      if (!translations.en[key]) missingLangs.push("en");
      if (!translations.fr[key]) missingLangs.push("fr");
      
      // Step 9.3: Report missing translations
      if (missingLangs.length > 0) {
        hasMissing = true;
        console.log(`\nFile: ${file}`);
        console.log(`Missing translations for key "${key}" in: ${missingLangs.join(", ")}`);
      }
    });
  });

  // Step 9.4: Exit with error if translations are missing, otherwise confirm success
  if (hasMissing) {
    process.exit(1);
  } else {
    console.log("All translations are present! ✨");
  }
}

// Step 10: Execute the translation check
checkMissingTranslations();