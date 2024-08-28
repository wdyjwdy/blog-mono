import styles from './Editor.module.css'
import { useRef, useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

function Editor({ code, lang, setCode }) {
  const ref = useRef()
  const [codeStack, setCodeStack] = useState([code])

  function handleCodeChange(e) {
    let newCode = e.target.value
    let start = ref.current.selectionStart
    let charInput = newCode.slice(start - 1, start)
    if (newCode.length > code.length && '{[("\''.includes(charInput)) {
      let map = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['\'', '\''], ['"', '"']])
      let charAppend = map.get(charInput)
      newCode = newCode.slice(0, start) + charAppend + newCode.slice(start)
      setTimeout(() => {
        ref.current.setSelectionRange(start, start)
      }, 0)
    }
    setCode(newCode)
    setCodeStack(p => [...p, newCode])
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      let start = ref.current.selectionStart
      let end = ref.current.selectionEnd
      let prevEnd = end
      while (start !== 0 && code[start - 1] !== '\n') start--
      while (end !== code.length && code[end] !== '\n') end++
      let lineCount = code.slice(start, end).match(/^/gm).length
      console.log(lineCount)
      let newCode =
        code.slice(0, start) +
        code.slice(start, end).replace(/^/gm, '    ') +
        code.slice(end)
      setCode(newCode)
      setCodeStack(p => [...p, newCode])
      setTimeout(() => {
        if (lineCount === 1) {
          ref.current.setSelectionRange(prevEnd + 4, prevEnd + 4)
        } else {
          ref.current.setSelectionRange(start, end + 4 * lineCount)
        }
      }, 0)
    } else if (e.metaKey && e.key === 'z') {
      e.preventDefault()
      if (codeStack.length === 1) return;
      setCode(codeStack.at(-2))
      setCodeStack(codeStack.slice(0, -1))
    }
  }

  return (
    <div className={styles.editor}>
      <textarea ref={ref} value={code} onChange={handleCodeChange} onKeyDown={handleKeyDown} />
      <Highlight code={code} lang={lang} />
    </div>
  )
}

function Highlight({ code, lang }) {
  const ref = useRef()

  useEffect(() => {
    async function setHtml(code) {
      ref.current.innerHTML = await codeToHtml(code, {
        lang: lang,
        themes: {
          light: 'one-light',
          dark: 'github-dark',
        }
      })
    }

    setHtml(code)
  }, [code])

  return <div ref={ref} />
}

export default Editor