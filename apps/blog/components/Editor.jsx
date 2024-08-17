import styles from './Editor.module.css'
import { useRef, useEffect } from 'react'
import { codeToHtml } from 'shiki'

function Editor({ code, lang, setCode }) {
  const ref = useRef()

  function handleCodeChange(e) {
    setCode(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.keyCode === 9) { // tab
      e.preventDefault()
      let start = ref.current.selectionStart
      let end = ref.current.selectionEnd
      while (start !== 0 && code[start - 1] !== '\n') start--
      while (end !== code.length && code[end] !== '\n') end++
      let lineCount = code.slice(start, end).match(/^/gm).length
      let newCode =
        code.slice(0, start) +
        code.slice(start, end).replace(/^/gm, '    ') +
        code.slice(end)
      setCode(newCode)
      setTimeout(() => {
        if (lineCount === 1) {
          ref.current.setSelectionRange(end + 4, end + 4)
        } else {
          ref.current.setSelectionRange(start, end + 4 * lineCount)
        }
      }, 0)
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