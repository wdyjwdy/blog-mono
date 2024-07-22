function Preview({ lines }) {
  return (
    <pre style={{ paddingLeft: '0px', overflow: 'scroll', height: '100%' }}>
      {lines}
    </pre>
  )
}

export default Preview