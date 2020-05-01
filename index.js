const core = require("@actions/core");
const github = require("@actions/github");

try {
  const repoToken = core.getInput("repoToken");
  const eventName = core.getInput("eventName");

  const payload = github.context.payload;

  console.log(`### Event: ${eventName}`);
  console.log(`### The event payload: `):
  console.log(`${JSON.stringify(payload)}`);

  const owner = payload.repository.owner.login;
  const repoName = payload.repository.name;

  if (eventName === "issue_comment") {
    if (payload.comment.body === "LGTM") {
      console.log(`--> New comment (ID): ${payload.comment.id}`);
      const pullNumber = payload.issue.number;
    }
  }

  if (eventName === "status") {
    console.log(`--> New status for commit (ID): ${payload.commit.id}`);
  }

  if (eventName === "commit") {
    console.log(`--> New commit (ID): ${payload.commit.id}`);
  }

} catch (error) {
  core.setFailed(error.message);
}
