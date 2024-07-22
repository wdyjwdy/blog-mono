import styles from './Editor.module.css'
import { useState, useRef, useEffect, Fragment } from 'react'
import { codeToHtml } from 'shiki'

function Editor({ code, lang, handleCodeChange }) {
  return (
    <div className={styles.editor}>
      <textarea value={code} onChange={handleCodeChange} />
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