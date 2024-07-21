import { Flex, TextArea, Text, Strong, Button, Avatar, DropdownMenu, Select, ScrollArea, Card } from '@radix-ui/themes';
import { PlayIcon, EraserIcon } from '@radix-ui/react-icons'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import katex from 'katex'

const placeholders = {
  'js': 'console.log("hello")',
  'math': 'e^{i \\pi} + 1 = 0',
}

const snippets = {
  "js": {
    "For Loop": "\nfor (let i = 0; i < 3; i++) {\n    console.log(i)\n}",
    "Class": "\nclass name {\n    constructor() {}\n}",
    "Function": "\nfunction name() {\n    \n}"
  },
  "math": {
    "Matrix 2x2": "\n\\begin{cases}\n    a & c \\\\\n    b & d\n\\end{cases}"
  }
}

const msgColors = {
  'info': 'gray',
  'error': 'crimson',
}

let keyIndex = 0

export default function Playground() {
  const [lang, setLang] = useState('js')
  const [input, setInput ]= useState(placeholders['js'])
  const [output, setOutput ]= useState([])
  const outputRef = useRef()

  function addLog(msg, type='info') {
    let log = (
      <Text as='p' color={msgColors[type]} key={keyIndex++}>
        {
          type === 'info'
            ? `> ${JSON.stringify(msg)}`
            : `> ${msg}`
        }
      </Text>
    )
    setOutput(p => [...p, log])
  }

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleRun() {
    if (lang === 'js') {
      try {
        let res = eval(input.replaceAll('console.log', 'addLog'))
        if(res !== undefined) addLog(res)
      } catch(e) {
        addLog(e, 'error')
      }
    } else if (lang === 'math') {
      setOutput(p => [...p, <MathTex key={keyIndex++} exp={input} addLog={addLog} />])
    }
  }

  function handleClear() {
    setOutput([])
  }

  function handleSnippets(e) {
    let snippet = snippets[lang][e.target.innerText]
    if (input === '') snippet = snippet.slice(1)
    setInput(p => p + snippet)
  }

  return (
    <Flex direction="column" p='5' gap="2" align='center'>
      <Flex gap='5' justify='between' width='90vw'>
        <Flex gap='4' align='center'>
          <Link href="/"><Avatar size='2' src='/site/logo.png' fallback="A" /></Link>
          <Text size='5'><Strong>Playground</Strong></Text>
          <Select.Root value={lang} onValueChange={v => {setLang(v); setInput(placeholders[v])}}>
            <Select.Trigger variant="soft" color='gray' />
            <Select.Content>
              <Select.Group>
                <Select.Item value="js">JavaScript</Select.Item>
                <Select.Item value="math">Tex Math</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex gap='2' align='center'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft" color='gray'>Snippets<DropdownMenu.TriggerIcon /></Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {Object.keys(snippets[lang]).map(x => <DropdownMenu.Item key={x} onClick={handleSnippets}>{x}</DropdownMenu.Item>)}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button color="gray" variant="outline" onClick={handleRun}>
            <PlayIcon /> Run
          </Button>
          <Button color="gray" variant="outline" onClick={handleClear}>
            <EraserIcon /> Clear
          </Button>
        </Flex>
      </Flex>
      <Flex gap="2">
        <TextArea value={input} onChange={handleInput} size="3" style={{ width: '60vw', height: '84vh' }} />
        <Card style={{ width: '30vw', height: '84vh' }}>
          <ScrollArea ref={outputRef} scrollbars="both">{output}</ScrollArea>
        </Card>
      </Flex>
    </Flex>
  )
}

function MathTex({ exp, addLog }) {
  const ref = useRef();

  useEffect(() => {
    try { katex.render(exp, ref.current) }
    catch(e) { addLog(e.message, 'error') }
  }, [exp]);

  return <div ref={ref} />
}