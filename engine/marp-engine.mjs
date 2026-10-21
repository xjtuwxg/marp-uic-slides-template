// Marp engine with a <pause> tag for click-to-reveal steps (like Beamer's \pause).
//
// Put <pause> on its own line (column 0). Everything after it on the slide is
// hidden until you press a key, then fades in. Another <pause> starts the next
// step. <enter> is accepted as an older alias. Inside a <div> (e.g. a column
// of <div class="cols">) the step stops at that </div>, so the other column is
// not swallowed.
//
// Steps reuse Marp's own fragment mechanism (the same one behind "*" lists),
// so they share one click order with fragmented lists. The PDF shows everything.
//
// Used by build.sh via: marp --engine ./engine/marp-engine.mjs

const PAUSE = /^<(?:pause|enter)\s*\/?>\s*$/i

function pauseStep(md) {
  // Block rule: a line that is just <pause>. It may interrupt a paragraph or
  // list, so no blank line is needed around it.
  md.block.ruler.before(
    'html_block',
    'pause_step',
    (state, startLine, endLine, silent) => {
      if (state.sCount[startLine] - state.blkIndent >= 4) return false
      const pos = state.bMarks[startLine] + state.tShift[startLine]
      if (!PAUSE.test(state.src.slice(pos, state.eMarks[startLine]))) return false
      if (silent) return true

      const token = state.push('pause_step', '', 0)
      token.block = true
      token.map = [startLine, startLine + 1]
      state.line = startLine + 1
      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )

  md.renderer.rules.pause_step = () => ''

  // Core rule: wrap the content following each <pause> in a <div> that Marp
  // treats as one fragment. Runs before Marp numbers the fragments.
  md.core.ruler.after('marpit_fragment', 'pause_step_wrap', (state) => {
    if (state.inlineMode) return
    const { tokens } = state
    const count = (s, re) => (s.match(re) || []).length

    for (let i = 0; i < tokens.length; i += 1) {
      const start = tokens[i]
      if (start.type !== 'pause_step') continue

      let end = i + 1
      let depth = 0
      for (; end < tokens.length; end += 1) {
        const t = tokens[end]
        if (t.meta && t.meta.marpitSlideElement === -1) break
        if (t.nesting === -1 && t.level < start.level) break
        if (t.type === 'pause_step' && t.level === start.level && depth === 0) break
        if (t.type === 'html_block') {
          const next = depth + count(t.content, /<div\b/gi) - count(t.content, /<\/div\s*>/gi)
          if (next < 0) break
          depth = next
        }
      }

      const open = new state.Token('pause_step_open', 'div', 1)
      open.block = true
      open.level = start.level
      open.meta = { marpitFragment: true }
      const close = new state.Token('pause_step_close', 'div', -1)
      close.block = true
      close.level = start.level

      tokens.splice(end, 0, close)
      tokens[i] = open
    }
  })
}

export default ({ marp }) => marp.use(pauseStep)
