#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), {
  alias: {
    e: 'emoji',
    i: 'interval'
  },
  default: {
    e: '🐣',
    i: 150
  }
})

const run = (emoji, interval) => {
  let positions = []
  const startingLine = 3

  setInterval(() => {
    const [column, line] = process.stdout.getWindowSize()
    const vanishingLine = line - 1
    const printingColumn = Math.floor(Math.random() * column)
    console.clear()

    positions.push([printingColumn, startingLine])
    positions = positions.filter(position => position[1] < vanishingLine)
    positions.forEach((position) => {
      ++position[1]
      process.stdout.write(`\x1b[${position[1]};${position[0]}H${emoji} \x1b[0;0H`)
    })
  }, interval)
}

run(argv.e, argv.i)
