import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Load test list
const filePath = path.resolve(__dirname, "TestData/testsList.json");
const { tests } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Example usage: npx ts-node runTestCLI.ts login,orders @smoke
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("⚠️ Usage: npx ts-node runTestCLI.ts <testNames> [@tag]");
    console.log("Example: npx ts-node runTestCLI.ts login,orders @smoke");
    process.exit(1);
}

// Extract arguments
const testNames = args[0].split(",");
const tagFilter = args[1]; // optional tag, e.g. @smoke

// Collect valid paths
const testPaths: string[] = [];
for (const name of testNames) {
    const pathStr = tests[name];
    if (!pathStr) {
        console.error(`❌ Test not found in JSON: ${name}`);
        continue;
    }
    testPaths.push(pathStr);
}

// Build Playwright command
let command = `npx playwright test ${testPaths.join(" ")}`;
if (tagFilter) command += ` --grep "${tagFilter}"`;

console.log(`\n🚀 Running command:\n${command}\n`);

try {
    execSync(command, { stdio: "inherit" });
} catch {
    console.error(`❌ Some tests failed.`);
}
