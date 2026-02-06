import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createDodgeFrameLock,
  getInitialNoButtonPosition,
  getRandomNoButtonPosition,
} from '../src/components/noButtonLogic.js'

test('createDodgeFrameLock only allows one dodge per frame', () => {
  let queuedFrame = null
  const runDodge = createDodgeFrameLock((callback) => {
    queuedFrame = callback
    return 1
  })

  let beforeCount = 0
  let afterCount = 0

  assert.equal(
    runDodge(
      () => {
        beforeCount += 1
      },
      () => {
        afterCount += 1
      }
    ),
    true
  )
  assert.equal(beforeCount, 1)
  assert.equal(afterCount, 0)

  assert.equal(
    runDodge(
      () => {
        beforeCount += 1
      },
      () => {
        afterCount += 1
      }
    ),
    false
  )
  assert.equal(beforeCount, 1)
  assert.equal(afterCount, 0)

  queuedFrame()
  assert.equal(afterCount, 1)

  assert.equal(
    runDodge(
      () => {
        beforeCount += 1
      },
      () => {
        afterCount += 1
      }
    ),
    true
  )
  assert.equal(beforeCount, 2)
})

test('initial position stays inside bounds even when button is larger than field', () => {
  const fieldRect = { width: 120, height: 50 }
  const buttonRect = { width: 150, height: 60 }
  const position = getInitialNoButtonPosition(fieldRect, buttonRect)

  assert.equal(position.x, 10)
  assert.equal(position.y, 10)
})

test('random position respects bounds after label width and field size changes', () => {
  const randomAtEnd = () => 1
  const tallField = { width: 280, height: 120 }
  const shortLabelButton = { width: 60, height: 30 }
  const longLabelButton = { width: 180, height: 30 }

  const shortLabelPos = getRandomNoButtonPosition(tallField, shortLabelButton, randomAtEnd)
  const longLabelPos = getRandomNoButtonPosition(tallField, longLabelButton, randomAtEnd)

  assert.equal(shortLabelPos.x, 210)
  assert.equal(longLabelPos.x, 90)
  assert.ok(longLabelPos.x <= shortLabelPos.x)
  assert.equal(shortLabelPos.y, 80)
  assert.equal(longLabelPos.y, 80)

  const resizedField = { width: 150, height: 90 }
  const resizedPos = getRandomNoButtonPosition(resizedField, longLabelButton, randomAtEnd)

  assert.equal(resizedPos.x, 10)
  assert.equal(resizedPos.y, 50)
})
