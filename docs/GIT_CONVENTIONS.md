# Git Conventions

## Commits

Commit every change that can reasonably be considered independent. <br>
Never commit code that does not work. <br>
Only add files to a commit that are relevant to that commit.

### Commit Messages

Commit messages should:

...start with a verb in the present tense (e.g., add, change, remove). <br>
...be as short and concise as possible. <br>
...clearly describe what the commit contains. <br>
...never contain more than one sentence. If more detail is needed, use description. <br>
...be in lower case, with the exception if the message contains a reference to an identifier or name with another case. <br>
...avoid the use of punctuation.

## Pull Requests

No code should ever be committed directly to the main branch, but should instead be merged through a pull request. <br>
All pull requests should be reviewed by at least one person, not including the author of the pull request. <br>
Pull requests should clearly describe what it contains. <br>
Pull requests should be limited to one feature, unless it contains two or more features dependent on each other.
