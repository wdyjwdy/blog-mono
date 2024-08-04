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
      let pos = ref.current.selectionStart
      let newCode = code.slice(0, pos) + '    ' + code.slice(pos)
      setCode(newCode)
      setTimeout(() => {
        ref.current.setSelectionRange(pos + 4, pos + 4)
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