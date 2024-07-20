import { Flex, TextArea, Text, Strong, Button, Avatar, DropdownMenu, Select, ScrollArea, Card } from '@radix-ui/themes';
import { PlayIcon, EraserIcon } from '@radix-ui/react-icons'
import { useState, useRef } from 'react'
import Link from 'next/link'

const placeholders = {
  'js': 'console.log("hello")',
  'math': 'a + b = 1',
}

const snippets = {
  "js": {
    "For Loop": "\nfor (let i = 0; i < 10; i++) {\n    console.log(i)\n}",
    "Class": "\nclass name {\n    constructor() {}\n}",
    "Function": "\nfunction name() {\n    \n}"
  },
  "math": {
    "Matrix 2x2": "\n\\begin{cases}\n    a & c \\\\\n    b & d\n\\end{cases}"
  }
}

export default function Playground() {
  const [lang, setLang] = useState('js')
  const [input, setInput ]= useState(placeholders['js'])
  const [output, setOutput ]= useState([])
  const outputRef = useRef(null)

  function handleInput(e) {
    setInput(e.target.value)
  }

  function addLog(text, color='gray') {
    let log = (
      <Text as='p' color={color}>
        {`> ${JSON.stringify(text)}`}
      </Text>
    )
    setOutput(p => [...p, log])
  }

  function handleRun() {
    try {
      let res = eval(input.replaceAll('console.log', 'addLog'))
      if(res !== undefined) addLog(res)
    } catch(e) {
      addLog(`${e}`, 'crimson')
    }
  }

  function handleClear() {
    setOutput([])
  }

  function handleSnippets(e) {
    setInput(p => p + snippets[lang][e.target.innerText])
  }

  return (
    <Flex direction="column" p='5' gap="2" align='center'>
      <Flex gap='5' justify='between' width='90vw'>
        <Flex gap='4' align='center'>
          <Link href="/"><Avatar src='/site/logo.png' fallback="A" /></Link>
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
              {Object.keys(snippets[lang]).map(x => <DropdownMenu.Item onClick={handleSnippets}>{x}</DropdownMenu.Item>)}
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