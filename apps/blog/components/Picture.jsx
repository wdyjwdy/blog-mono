import Image from 'next/image'

export default function Picture({ src, size = 500 }) {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={src.split('/').at(-1)}
      style={{ margin: '0 auto' }}
    />
  )
}