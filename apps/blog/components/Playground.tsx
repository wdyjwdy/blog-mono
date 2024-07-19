import { Flex, TextArea, Text, Strong, Button, Avatar } from '@radix-ui/themes';
import { PlayIcon, EraserIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import Link from 'next/link'

export default function Playground() {
  let [input, setInput ]= useState('console.log("hello")')
  let [output, setOutput ]= useState('')

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleOutput(text) {
    setOutput(p => p + '> ' + JSON.stringify(text) + '\n')
  }

  function handleRun() {
    try {
      let res = eval(input.replaceAll('console.log', 'handleOutput'))
      if(res !== undefined) handleOutput(res)
    } catch(e) {
      setOutput(p => p + '> ' + e + '\n')
    }
  }

  function handleClear() {
    setOutput('')
  }

  return (
    <Flex direction="column" p='5' gap="2" align='center'>
      <Flex gap='5' justify='between' width='90vw'>
        <Flex gap='2' align='center'>
        <Link href="/"><Avatar src='/site/logo.png' fallback="A" /></Link>
          <Text size='5'><Strong>JS Playground</Strong></Text>
        </Flex>
        <Flex gap='2' align='center'>
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
        <TextArea value={output} disabled size="3" style={{ width: '30vw', height: '84vh' }} />
      </Flex>
    </Flex>
  )
}