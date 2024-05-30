const fs = require('fs');
const { execSync } = require('child_process');
const { prompt } = require('enquirer');

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
    process.chdir('../android');
    execSync('gradlew clean');
    process.chdir('..');
    console.log('Android build cleaned.');
  },
  build: async (clean, install) => {
    process.chdir('../android');

    if (clean) {
      execSync('gradlew clean');
    }

    execSync('gradlew assembleRelease');
    process.chdir('..');

    fs.copyFileSync('android/app/build/outputs/apk/release/app-release.apk', 'app-release.apk');
    if (fs.existsSync(`${appname}.apk`)) {
      fs.unlinkSync(`${appname}.apk`);
    }
    fs.renameSync('app-release.apk', `${appname}.apk`);

    if (install) {
      execSync(`adb install ${appname}.apk`);
      console.log('APK built and installed on device.');
    } else {
      console.log('APK built.');
    }
  }
};

const runCLI = async () => {
  try {
    const { action } = await prompt({
      type: 'select',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        { name: 'save', message: 'Save changes locally' },
        { name: 'push', message: 'Push changes from github' },
        { name: 'pull', message: 'Pull latest changes from github' },
        { name: 'clean', message: 'Clean Android gradle' },
        { name: 'build', message: 'Build APK' }
      ]
    });

    if (action === 'build') {
      const { options } = await prompt({
        type: 'multiselect',
        name: 'options',
        message: 'Select build options',
        choices: [
          { name: 'clean', message: 'Clean the build before building', value: '-c' },
          { name: 'install', message: 'Install the APK after building', value: '-i' }
        ]
      });

      const clean = options.includes('-c');
      const install = options.includes('-i');
      await actions.build(clean, install);
    } else {
      actions[action]();
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

runCLI();
