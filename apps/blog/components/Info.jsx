import { Table, Text } from '@radix-ui/themes';
import Link from 'next/link'
import { Link2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import katex from 'katex'
import { useRef, useEffect } from 'react'

export default function Info({ time, ecma, v8, test }) {
  return (
    <Table.Root variant="surface" mt='2'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Time Complexity</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">ECMA</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">V8</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">Test</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <MathLine code={time} />
          </Table.Cell>
          <Table.Cell justify="center">
            <Link href={ecma}><Link2Icon width="50px" /></Link>
          </Table.Cell>
          <Table.Cell justify="center">
            <Link href={v8}><Link2Icon width="50px" /></Link>
          </Table.Cell>
          <Table.Cell justify="center">
            <Link href={test ?? ''}><Pencil2Icon width="50px" /></Link>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

function MathLine({ code }) {
  const ref = useRef();

  useEffect(() => {
    try { katex.render(code, ref.current) }
    catch { }
  }, []);

  return <Text ref={ref} />
}