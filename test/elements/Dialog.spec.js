/* global HTMLElement */

import test from 'tape'
import Dialog from '../../src/modules/elements/Dialog'

test('Dialog > creates a dialog', (t) => {
  const dialog = Object.create(Dialog)
  .init('Dialog', 'dialog')

  t.true(dialog.element instanceof HTMLElement)
  t.equal(dialog.element.title, 'Dialog')
  t.end()
})
