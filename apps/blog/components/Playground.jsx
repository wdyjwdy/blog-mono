import { Flex, Text, Strong, Button, Avatar, DropdownMenu, Select, Card } from '@radix-ui/themes';
import { PlayIcon, EraserIcon } from '@radix-ui/react-icons'
import { useState, useRef, useEffect } from 'react'
import { Editor, Preview } from '../components'
import Link from 'next/link'
import katex from 'katex'

let keyIndex = 0

export default function Playground() {
  const [lang, setLang] = useState('javascript')
  const [code, setCode ]= useState(getPlaceholder(lang))
  const [view, setView ]= useState([])

  useEffect(() => {
    let hash = window.location.hash
    if (hash) setCode(getCodeFromHash(hash))
  }, [])

  function addViewLine(line) {
    setView(p => [...p, line])
  }

  function addTextLine(text) {
    addViewLine(<TextLine key={keyIndex++} message={text} />)
  }

  function handleCodeChange(e) {
    setCode(e.target.value)
  }

  function handleSelectChange(v) {
    setLang(v)
    setCode(getPlaceholder(v))
  }

  function handleRun() {
    if (lang === 'javascript') {
      try {
        let result = eval(code.replaceAll('console.log', 'addTextLine'))
        if (result) addViewLine(<TextLine key={keyIndex++} message={result} />)
      } catch(e) {
        addViewLine(<TextLine key={keyIndex++} message={e} type='error' />)
      }
    } else if (lang === 'latex') {
      addViewLine(<MathLine key={keyIndex++} code={code} />)
    }
  }

  function handleClear() {
    setView([])
  }

  function handleSnippets(e) {
    let snippet = getSnippet(lang, e.target.innerText)
    if (code === '') snippet = snippet.slice(1)
    setCode(p => p + snippet)
  }

  function test(code, answer) {
    let ok = JSON.stringify(code) === JSON.stringify(answer)
    if (ok) addViewLine(<TextLine key={keyIndex++} message='ok' type='success' />)
    else addViewLine(<TextLine key={keyIndex++} message='error' type='error' />)
  }

  return (
    <Flex direction="column" p='5' gap="2" align='center'>
      <Flex gap='5' justify='between' width='90vw'>
        <Flex gap='4' align='center'>
          <Link href="/"><Avatar size='2' src='/site/logo.png' fallback="A" /></Link>
          <Text size='5'><Strong>Playground</Strong></Text>
          <Select.Root value={lang} onValueChange={handleSelectChange}>
            <Select.Trigger variant="surface" color='gray' />
            <Select.Content>
              <Select.Group>
                <Select.Item value="javascript">JavaScript</Select.Item>
                <Select.Item value="latex">LaTex</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex gap='2' align='center'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" color='gray'>Snippets<DropdownMenu.TriggerIcon /></Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {getSnippet(lang).map(x => <DropdownMenu.Item key={x} onClick={handleSnippets}>{x}</DropdownMenu.Item>)}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button color="green" variant="soft" onClick={handleRun}>
            <PlayIcon /> Run
          </Button>
          <Button color="gray" variant="soft" onClick={handleClear}>
            <EraserIcon /> Clear
          </Button>
        </Flex>
      </Flex>
      <Flex gap="2">
        <Card style={{ width: '60vw', height: '84vh' }}>
          <Editor code={code} lang={lang} handleCodeChange={handleCodeChange} />
        </Card>
        <Card style={{ width: '30vw', height: '84vh' }}>
          <Preview lines={view} />
        </Card>
      </Flex>
    </Flex>
  )
}

function MathLine({ code }) {
  const ref = useRef();
  
  useEffect(() => {
    try { katex.render(code, ref.current) }
    catch(e) { 
      ref.current.innerText = e.message
      ref.current.setAttribute('data-accent-color', 'crimson')
    }
  }, [code]);

  return <Text as='p' ref={ref} />
}

function TextLine({ message, type='info' }) {
  const colorMap = {
    'info': 'gray',
    'error': 'crimson',
    'success': 'green',
  }

  let text = message
  if (type === 'info') text = JSON.stringify(message)

  return (
    <Text as='p' color={colorMap[type]}>
      {`${text}\n`}
    </Text>
  )
}

function getSnippet(lang, name) {
  const snippets = {
    'javascript': {
      "For Loop": "\nfor (let i = 0; i < 3; i++) {\n    console.log(i)\n}",
      "Log": "\nconsole.log(i)\n",
      "Class": "\nclass name {\n    constructor() {}\n}",
      "Function": "\nfunction name() {\n    \n}"
    },
    'latex': {
      "Matrix 2x2": "\n\\begin{cases}\n    a & c \\\\\n    b & d\n\\end{cases}"
    }
  }
  return name
    ? snippets[lang][name]
    : Object.keys(snippets[lang])
}

function getPlaceholder(lang) {
  const placeholders = {
    'javascript': 'console.log("hello")',
    'latex': 'e^{i \\pi} + 1 = 0',
  }
  return placeholders[lang]
}

function getCodeFromHash(hash) {
  const codeMap = {
    'js-flat': 'function flat(depth) {\n    // write your code\n}\nArray.prototype.flat = flat'
  }
  return codeMap[hash.slice(1)]
}