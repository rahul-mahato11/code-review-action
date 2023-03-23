const core = require('@actions/core');
const github = require('@actions/github');

try {
  const openaiApiKey = PROCESS.ENV.OPENAI_API_KEY
  const githubToken = core.getInput('github_token')
  const githubPrId = core.getInput('github_pr_id')
  const openaiEngine = core.getInput('openai_engine')
  const openaiTemperature = core.getInput('openai_temperature')
  const openaiMaxTokens = core.getInput('openai_max_tokens')
  const mode = core.getInput('mode')

  const octokit = github.getOctokit(githubToken)

  const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: 'octokit',
      repo: 'rest.js',
      pull_number: 123,
      mediaType: {
        format: 'diff'
      }
  });

  
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  console.log(pullRequest);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}