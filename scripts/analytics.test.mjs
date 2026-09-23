import assert from 'node:assert/strict'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import { googleAnalyticsScript } from '../src/utils/analytics.ts'

function browser(hostname) {
  const scripts = []
  const window = { location: { hostname } }
  const document = {
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
  }
  return { window, document, scripts }
}

for (const hostname of ['valleydesignbuild.com', 'www.valleydesignbuild.com']) {
  test(`loads GA once on ${hostname} and leaves pageviews to GA`, () => {
    const context = browser(hostname)
    runInNewContext(googleAnalyticsScript, context)
    runInNewContext(googleAnalyticsScript, context)
    assert.equal(context.scripts.length, 1)
    assert.equal(context.scripts[0].async, true)
    assert.equal(context.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-1W3LS9RFCB')
    const commands = context.window.dataLayer.map((args) => Array.from(args))
    assert.equal(commands.length, 2)
    assert.equal(commands[0][0], 'js')
    assert.deepEqual(commands[1], ['config', 'G-1W3LS9RFCB'])
  })
}

for (const hostname of ['localhost', '127.0.0.1', 'deploy-preview-1--valleydesignbuild.netlify.app', 'valleydesignbuild.netlify.app', 'valleydesignbuild.com.example.com']) {
  test(`does not collect analytics on ${hostname}`, () => {
    const context = browser(hostname)
    runInNewContext(googleAnalyticsScript, context)
    assert.equal(context.scripts.length, 0)
    assert.equal(context.window.dataLayer, undefined)
  })
}
