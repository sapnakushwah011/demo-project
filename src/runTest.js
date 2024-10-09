const { execSync } = require('child_process');
const componentTestMap = require('./componentTestMapping');

try {
    // Get the list of changed files in the current branch
    const changedFiles = execSync('git diff --name-only origin/master...HEAD').toString().split('\n').filter(Boolean);

    console.log('Changed files:', changedFiles); // Log changed files for debugging

    // Find tests for changed components
    const testsToRun = changedFiles
        .map(file => componentTestMap[file]) // Map files to their tests
        .filter(test => test); // Filter out undefined mappings

    if (testsToRun.length > 0) {
        console.log('Running tests for changed components:');
        console.log(testsToRun);

        // Run Playwright tests
        execSync(`npx playwright test ${testsToRun.join(' ')}`, { stdio: 'inherit' });
    } else {
        console.log('No tests to run for changed components.');
    }
} catch (error) {
    console.error('Error executing command:', error);
    process.exit(1); // Exit with failure status
}
