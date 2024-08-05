import { Table, Badge, Flex, Checkbox, Button, Separator, Select } from '@radix-ui/themes';
import { Link2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

function CreateTable({ data, path, singlePage }) {
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Questions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(({ key, values }) => {
            return (
              <>
                <Table.Row>
                  <Table.RowHeaderCell width="80px">{key}</Table.RowHeaderCell>
                  <Table.Cell>
                    <Flex gap="1" align="center" wrap="wrap">
                      {
                        values.flatMap((value, index) => {
                          let arr = value.map(x => {
                            let [alias, name] = Array.isArray(x) ? x : [x, x]
                            let href = singlePage
                              ? `/${path}#${name.toLowerCase().replaceAll(' ', '-')}`
                              : `/${path}/${key.toLowerCase()}#${name.toLowerCase().replaceAll(' ', '-')}`
                            return (
                              <Link href={href}>
                                <Button variant="soft" size="1">
                                  {alias}
                                </Button>
                              </Link>
                            )
                          })
                          arr.push(<Separator orientation="vertical" size="1" style={{ margin: "0 6px" }} />)
                          if (index === values.length - 1) arr.pop()
                          return arr
                        })
                      }
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              </>
            )
          })}
        </Table.Body>
      </Table.Root>
    </>
  )
}

function CreateTableFilter({ data }) {
  let [tag, setTag] = useState(data[0].key)
  let values = data.find(x => x.key === tag).values

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="40px"></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="200px">题目</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">难度</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            <Select.Root value={tag} onValueChange={setTag}>
              <Select.Trigger variant="ghost" style={{ color: 'black', fontWeight: 'bold' }} />
              <Select.Content>
                <Select.Group>
                  {data.map(x => x.key).map(tag => {
                    return <Select.Item key={tag} value={tag}>{tag}</Select.Item>
                  })}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">力扣</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center" width="52px">答案</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {values.map(({ name, level, link, answer, tags }) => {
          return (
            <Table.Row>
              <Table.Cell><Checkbox color="green" size="3" /></Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell justify="center"><Badge color={level === "简单" ? "green" : "orange"}>{level}</Badge></Table.Cell>
              <Table.Cell justify="center">{tags.map(tag => {
                return (
                  <>
                    <Badge variant="soft" color="gray">{tag}</Badge>
                    <span> </span>
                  </>
                )
              })}</Table.Cell>
              <Table.Cell justify="center"><Link href={link} target="_blank"><Link2Icon width="28px" /></Link></Table.Cell>
              <Table.Cell justify="center"><Link href={answer}><Link2Icon width="28px" /></Link></Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

export { CreateTable, CreateTableFilter }