const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const args = process.argv.slice(2);
const appname = 'rn dates'
const date = new Date().toLocaleString()
const time = new Date().toLocaleTimeString()


if (args[0] === 'save') {
  childProcess.execSync('git add .');
  childProcess.execSync(`git commit -m "bot: saving progress. date- ${date}, time-${time}"`);
}

if (args[0] === 'push') {
  childProcess.execSync('git add .');
  childProcess.execSync(`git commit -m "bot: saving progress. date- ${date}, time-${time}"`);
  childProcess.execSync('git push --all https://github.com/theboyofdream/rn-dates.git');
}

if (args[0] === 'pull') {
  childProcess.execSync('git pull');
  childProcess.execSync('yarn install');
}

if (args[0] === 'clean') {
  process.chdir('android');
  childProcess.execSync('gradlew clean');
  process.chdir('..');
}

if (args[0] === 'build') {
  process.chdir('android');

  const clean = args.includes('-c');
  if (clean) {
    childProcess.execSync('gradlew clean');
  }

  childProcess.execSync('gradlew assembleRelease');
  process.chdir('..');

  fs.copyFileSync('android/app/build/outputs/apk/release/app-release.apk', 'app-release.apk');
  fs.unlinkSync(`${appname}.apk`);
  fs.renameSync('app-release.apk', `${appname}.apk`);

  const install = args.includes('-i');
  if (install) {
    childProcess.execSync(`adb install ${appname}.apk`);
  }
}
