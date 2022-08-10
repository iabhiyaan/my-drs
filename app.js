function getRegexExp() {
  return new RegExp(
    "^(feat|chore|fix|update|docs|refactor|style|test|perf):",
    "ig"
  );
}

function checkCommitStartNotation(str) {
  const re = getRegexExp();
  return re.test(str);
}

function getGitCommits(date = "") {
  var today = new Date();

  const monthPad =
    (today.getMonth() + 1).toString().length >= 2
      ? `-${today.getMonth() + 1}`
      : `-0${today.getMonth() + 1}`;
  const todayPad =
    today.getDate().toString().length >= 2
      ? `-${today.getDate()}`
      : `-0${today.getDate()}`;

  var formattedDate = today.getFullYear() + monthPad + todayPad;

  let commits = [];

  document
    .querySelector(`li.commits-row[data-day="${date || formattedDate}"]`)
    .querySelectorAll("li")
    .forEach((node) => {
      const commitMessage = node
        .querySelector('.avatar-cell a[href="/iabhiyaan1')
        ?.parentNode.nextElementSibling.querySelector(
          ".commit-row-message"
        ).innerText;
      checkCommitStartNotation(commitMessage) && commits.push(commitMessage);
    });

  commits = Array.from(new Set(commits));

  let message = "";
  const lessThanTenChars = [];

  commits.forEach((commit, i) => {
    const trimmedStr = commit.trim?.();
    if (trimmedStr?.length < 15) {
      lessThanTenChars.push(i);
    } else if(trimmedStr.includes('working')) {
      lessThanTenChars.push(i);
    }
  });

  for (var i = lessThanTenChars.length - 1; i >= 0; i--) {
    commits.splice(lessThanTenChars[i], 1);
  }

  commits.forEach((commit, i) => {
    const cleanStr = commit.replaceAll(getRegexExp(), "");
    message += `- ${cleanStr} \n`;
  });
  copyToClipboard(message)
    .then((res) => {
      alert("Copied to clipboard")
      console.log("Copied to clipboard");
    })
    .catch((err) => {
      console.log("error", err);
    });

  console.log(message);
}

getGitCommits();

function copyToClipboard(str) {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject("The Clipboard API is not available.");
}
