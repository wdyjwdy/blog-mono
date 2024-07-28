import { Table, Flex, Button, Separator } from '@radix-ui/themes';
import Link from 'next/link'

export default function CreateTable({ data, path, singlePage }) {
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
                                    let href = singlePage
                                      ? `/${path}#${x.toLowerCase()}`
                                      : `/${path}/${key.toLowerCase()}#${x.toLowerCase()}`
                                    return (
                                      <Link href={href}>
                                        <Button variant="soft" size="1">
                                          {x}
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