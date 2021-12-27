const core = require('@actions/core');
const parser = require('xml-js');

try {
    const profile = core.getInput('publishProfile');
    const jsonData = JSON.parse(parser.xml2json(profile, { compact: true, spaces: 2 }));
    const zipProfile = jsonData.publishData.publishProfile.find(p => p._attributes.publishMethod == 'ZipDeploy');
    const usr = zipProfile._attributes.userName;
    const pwd = zipProfile._attributes.userPWD;
    const url = `https://${zipProfile._attributes.publishUrl}/api/zipdeploy`;
    core.setSecret(usr);
    core.setSecret(pwd);
    core.setSecret(url);
    core.setOutput('usr', usr);
    core.setOutput('pwd', pwd);
    core.setOutput('url', url);
    core.exportVariable('ZIP_DEPLOY_USR', usr);
    core.exportVariable('ZIP_DEPLOY_PWD', pwd);
    core.exportVariable('ZIP_DEPLOY_URL', url);
} catch (error) {
    core.setFailed(error.message);
}