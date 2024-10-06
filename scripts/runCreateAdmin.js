const { execSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'createAdminUser.ts');

try {
  execSync(`npx ts-node -O '{"module":"commonjs"}' ${scriptPath}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to run the script:', error);
  process.exit(1);
}