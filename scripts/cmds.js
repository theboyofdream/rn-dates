const fs = require('fs');
const { execSync } = require('child_process');
const { Command } = require('commander');

const program = new Command();
const appname = 'rn dates';
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const actions = {
  save: () => {
    execSync('git add .');
    execSync(`git commit -m "bot: saving progress. date- ${date}, time-${time}"`);
    console.log('Changes saved.');
  },
  push: () => {
    execSync('git add .');
    execSync(`git commit -m "bot: saving progress. date- ${date}, time-${time}"`);
    execSync('git push --all https://github.com/theboyofdream/rn-dates.git');
    console.log('Changes pushed to remote repository.');
  },
  pull: () => {
    execSync('git pull');
    execSync('yarn install');
    console.log('Latest changes pulled and dependencies installed.');
  },
  clean: () => {
    process.chdir('android');
    execSync('gradlew clean');
    process.chdir('..');
    console.log('Android build cleaned.');
  },
  build: (clean, install) => {
    process.chdir('android');

    if (clean) {
      execSync('gradlew clean');
    }

    execSync('gradlew assembleRelease');
    process.chdir('..');

    fs.copyFileSync('android/app/build/outputs/apk/release/app-release.apk', 'app-release.apk');
    fs.unlinkSync(`${appname}.apk`);
    fs.renameSync('app-release.apk', `${appname}.apk`);

    if (install) {
      execSync(`adb install ${appname}.apk`);
      console.log('APK built and installed on device.');
    } else {
      console.log('APK built.');
    }
  }
};

program
  .name('rn-cli')
  .description('CLI for React Native project management')
  .version('1.0.0');

program
  .command('save')
  .description('Save changes')
  .action(actions.save);

program
  .command('push')
  .description('Push changes')
  .action(actions.push);

program
  .command('pull')
  .description('Pull latest changes')
  .action(actions.pull);

program
  .command('clean')
  .description('Clean Android build')
  .action(actions.clean);

program
  .command('build')
  .description('Build APK')
  .option('-c, --clean', 'Clean the build before building')
  .option('-i, --install', 'Install the APK after building')
  .action((options) => {
    actions.build(options.clean, options.install);
  });

program.parse(process.argv);
