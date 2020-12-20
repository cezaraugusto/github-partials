#!/usr/bin/env node
const path = require('path')

const shell = require('shelljs')

function gitSome (gitURL, outputDirectory) {
  const repoData = new URL(gitURL).pathname
  const [owner, project] = repoData.split('/').slice(1, 3)
  const [branch] = repoData.split('/').slice(4)
  const assetPath = repoData.split('/').slice(5).join('/')

  if (assetPath === '') {
    throw new Error(`
      git-some is meant to download only sub-directories in a GitHub project
      and the URL ${gitURL}
      does seem to be valid. Ensure the branch name is included in the URL.
    `)
  }

  console.log(`
    Downloading ${path.basename(assetPath)} from @${owner}/${project}
  `)

  const outputPath = outputDirectory || process.cwd()

  shell.mkdir('-p', path.join(outputPath, 'GIT-SOME-TEMP-FOLDER'))
  shell.cd(path.join(outputPath, 'GIT-SOME-TEMP-FOLDER'))
  shell.exec('git init --quiet')
  shell.exec(`git remote add origin https://github.com/${owner}/${project}`)
  shell.exec('git config core.sparsecheckout true')
  shell.exec(`echo "${assetPath}" >> .git/info/sparse-checkout`)
  shell.exec(`git pull origin --quiet ${branch} --depth 1`)
  shell.cp('-r', assetPath, outputPath)
  shell.cd('../')
  shell.rm('-rf', path.join(outputPath, 'GIT-SOME-TEMP-FOLDER'))
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('You need to provide a valid GitHub URL to start a download.')
    process.exit()
  }

  gitSome(process.argv[process.argv.length - 1])
}

module.exports = gitSome
