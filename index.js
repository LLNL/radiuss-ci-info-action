const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoToken = core.getInput("repoToken");
  const eventName = core.getInput("eventName");

  if (eventName === "issue_comment") {}

  console.log(`Event: ${eventName}`);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`Action started for issue #${payload.issue.number}`);

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
