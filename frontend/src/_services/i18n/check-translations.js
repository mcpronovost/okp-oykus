/**
 * This script checks for missing translations in the project.
 * It reads all translation files from the locales directory,
 * then scans all .astro, .jsx and .tsx files for t() function calls.
 * It verifies that each translation key found in the code exists
 * in both English (en) and French (fr) translation files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("\x1b[33m", "Checking for missing translations...\n", "\x1b[0m");

/**
 * Step 1: Set up file path variables
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Step 2: Define path to locales directory
 */
const localesDir = path.join(__dirname, "./locales");

/**
 * Step 3: Initialize translations object to store all translations by language
 */
const translations = {
    en: {},
    fr: {},
};

/**
 * Step 4: Define function to recursively read JSON translation files
 */
function readJsonFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Step 4.1: Recursively read subdirectories
            readJsonFiles(filePath);
        } else if (file.endsWith(".json")) {
            // Step 4.2: Extract language code from filename
            const locale = path.basename(file, ".json");
            const lang = locale.split("-")[0]; // This will convert "en-US" to "en"
            if (lang === "en" || lang === "fr") {
                // Step 4.3: Read and parse JSON file
                const fileTranslations = JSON.parse(fs.readFileSync(filePath, "utf8"));
                // Step 4.4: Merge translations into main object
                Object.assign(translations[lang], fileTranslations);
            }
        }
    });
}

/**
 * Step 5: Load all translations from JSON files
 */
readJsonFiles(localesDir);

/**
 * Step 6: Define function to extract translation keys from source files
 */
function extractTranslationKeys(content) {
    // Match t() only if it's not part of a word (e.g. t("test") is matched, but import("test") is not)
    const regex = /(?<![\w])t\([""](.*?)[""]\)/g;
    const matches = [...content.matchAll(regex)];
    return matches.map((match) => match[1]);
}

/**
 * Step 7: Define function to recursively walk through directories
 */
function walkDir(dir) {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Step 7.1: Recursively process subdirectories
            results = results.concat(walkDir(filePath));
        } else if (file.endsWith(".astro") || file.endsWith(".jsx") || file.endsWith(".tsx")) {
            // Step 7.2: Read and process .astro and .tsx files
            const content = fs.readFileSync(filePath, "utf8");
            const keys = extractTranslationKeys(content);
            if (keys.length > 0) {
                results.push({ file: filePath, keys });
            }
        }
    }

    return results;
}

/**
 * Step 8: Define main function to check for missing translations
 */
function checkMissingTranslations() {
    // Step 8.1: Get all files with translation keys
    const files = walkDir(path.join(__dirname, "../.."));
    let hasMissing = false;

    // Step 8.2: Check each translation key in every file
    files.forEach(({ file, keys }) => {
        keys.forEach((key) => {
            const missingLangs = [];
            if (!translations.en[key]) missingLangs.push("en");
            if (!translations.fr[key]) missingLangs.push("fr");

            // Step 8.3: Report missing translations
            if (missingLangs.length > 0) {
                hasMissing = true;
                console.log(`\x1b[31m❌ Missing translations for key "\x1b[34m${key}\x1b[31m" in: [${missingLangs.join(", ")}]\x1b[0m`);
                console.log(`    └── File: ${file}`);
            }
        });
    });

    // Step 8.4: Exit with error if translations are missing, otherwise confirm success
    if (hasMissing) {
        console.log("\x1b[31m", "\nMissing translations found! ⛔", "\x1b[0m");
        process.exit(1);
    } else {
        console.log("\x1b[32m", "All translations are present! ✨", "\x1b[0m");
    }
}

/**
 * Step 9: Execute the translation check
 */
checkMissingTranslations();