#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), {
  alias: {
    e: 'emoji',
    s: 'speed'
  },
  default: {
    e: '🐣',
    s: 150
  }
})

const run = (emoji, interval) => {
  const chars = {}

  setInterval(() => {
    const [column, line] = process.stdout.getWindowSize()
    const startingLine = 3
    const vanishingLine = line - 1
    const printingColumn = Math.floor(Math.random() * column)
    console.clear()

    chars[printingColumn] = startingLine
    Object.keys(chars).forEach((key) => {
      if ((chars[key] >= vanishingLine) || (Object.keys(chars).length > column)) {
        delete chars[key]
      } else {
        ++chars[key]
        process.stdout.write(`\x1b[${chars[key]};${key}H \x1b[${chars[key]};${key}H${emoji} \x1b[0;0H`)
      }
    })
  }, interval)
}

run(argv.e, argv.s)
