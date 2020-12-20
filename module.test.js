/* global describe, afterEach, test, expect */
const path = require('path')
const fs = require('fs')

const shell = require('shelljs')

const gitSome = require('./module')

const repoURL = 'https://github.com/cezaraugusto/extension-create'
const folderURL = `${repoURL}/tree/main/create`
const fileURL = `${folderURL}/cli.js`
const customPath = path.resolve(__dirname, 'some/extraordinary/folder')

describe('git-some', () => {
  afterEach(() => {
    shell.rm('-rf', path.basename(folderURL))
    shell.rm('-rf', path.basename(fileURL))
    shell.rm('-rf', path.resolve(__dirname, 'some'))
  })

  test('works with files', () => {
    gitSome(fileURL)

    expect(fs.existsSync(path.basename(fileURL))).toBe(true)
  })

  test('using a custom path works with files', () => {
    gitSome(fileURL, customPath)

    expect(fs.existsSync(customPath)).toBe(true)
  })

  test('works with folders', () => {
    gitSome(folderURL)

    expect(fs.existsSync(path.basename(folderURL))).toBe(true)
  })

  test('using a custom path works with folders', () => {
    gitSome(folderURL, customPath)

    expect(fs.existsSync(customPath)).toBe(true)
  })
})
