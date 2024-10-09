// runTests.js
const { execSync } = require('child_process');
const componentTestMap = require('./componentTestMapping.js');

// Get the list of changed files in the current PR
const changedFiles = execSync('git diff --name-only origin/master...HEAD').toString().split('\n').filter(Boolean);

// Find tests for changed components
const testsToRun = changedFiles
  .filter(file => componentTestMap[file])
  .map(file => componentTestMap[file]);

if (testsToRun.length > 0) {
  console.log('Running tests for changed components:');
  console.log(testsToRun);

  // Run Playwright tests
  execSync(`npx playwright test ${testsToRun.join(' ')}`, { stdio: 'inherit' });
} else {
  console.log('No tests to run for changed components.');
}
