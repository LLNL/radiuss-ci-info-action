const core = require("@actions/core");
const github = require("@actions/github");

async function fetchCommitID(owner, repoName, pullNumber) {
  const { commitID } = await gql(
    `{
        repository(owner: ${owner}, name: ${repoName}) {
          pullRequest(number: ${pullNumber}) {
            commits(last: 1) {
              nodes {
                commit {
                  id
               }
             }
           }
         }
      }
    }`
  );

  return commitID;
}

try {
  const repoToken = core.getInput("repoToken");
  const eventName = core.getInput("eventName");

  const octokit = new github.GitHub(repoToken);
  const gql = octokit.graphql;

  const payload = github.context.payload;

  console.log(`Event: ${eventName}`);

  const owner = payload.repository.owner.login;
  const repoName = payload.repository.name;

  if (eventName === "issue_comment") {
    if (payload.comment.body === "LGTM") {
      console.log(`comment id ${payload.comment.id}`);
      const pullNumber = payload.issue.number;
      // Find most recent commit id
      const commitID = fetchCommitID(owner, repoName, pullNumber);
      console.log(commitID);
    }
  }

  if (eventName === "status") {
    console.log(`commit id ${payload.comment.id}`);
  }

  console.log(`The event payload: ${JSON.stringify(payload)}`);
} catch (error) {
  core.setFailed(error.message);
}
