const core = require('@actions/core');
const github = require('@actions/github');
const parser = require('xml-js');

try {
    const profile = core.getInput('profile');
    const jsonData = JSON.parse(parser.xml2json(profile, { compact: true, spaces: 2 }));
    const zipProfile = jsonData.publishData.publishProfile.find(p => p._attributes.publishMethod == 'ZipDeploy');
    core.exportVariable('ZIP_DEPLOY_USR', zipProfile._attributes.userName);
    core.exportVariable('ZIP_DEPLOY_PWD', zipProfile._attributes.userPWD)
    core.exportVariable('ZIP_DEPLOY_URL', `https://${zipProfile._attributes.publishUrl}/api/zipdeploy`)
    // core.setOutput('usr', `\\${zipProfile._attributes.userName}`);
    // core.setOutput('pwd', zipProfile._attributes.userPWD);
    // core.setOutput('url', `https://${zipProfile._attributes.publishUrl}/api/zipdeploy`);
} catch (error) {
  core.setFailed(error.message);
}