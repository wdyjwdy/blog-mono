import styles from './Map.module.css'
import { useState } from 'react'
import { chinaProvinces, legendItems } from './constants.js'

export default function Map({ selected = [] }) {
   const [pos, setPos] = useState({ x: -100, y: -100 })
   const [province, setProvince] = useState('')

   function handleMove(e) {
      setProvince(e.target.id)
      setPos({
         x: e.pageX + 10,
         y: e.pageY + 20,
      })
   }

   return (
      <div className={styles.map}>
         <ToolTip pos={pos} text={province} />
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 800 600" onMouseMove={handleMove}>
            <Legend items={legendItems} x={10} y={450} />
            {chinaProvinces.map(([id, d]) => (
               <path
                  d={d} id={id} key={id}
                  className={selected.includes(id) ? 'selected' : ''}
               />
            ))}
            <text x={610} y={390} fontSize={40} onMouseMove={handleMove} id='xxc'>{'🚹'}</text>
            <text x={410} y={410} fontSize={40} onMouseMove={handleMove} id='wj'>{'🚺'}</text>
         </svg>
      </div>
   )
}

function ToolTip({ pos, text }) {
   return (
      <span className={styles.tooltip} style={{ top: pos.y, left: pos.x }}>
         {text}
      </span>
   )
}

function Legend({ items, x = 10, y = 10 }) {
   const height = 40 * items.length

   function Item({ text, color, x, y, index }) {
      return (
         <g className={`item-${index}`}>
            <circle cx={x + 20} cy={y + 20} r={10} fill={color} />
            <text x={x + 40} y={y + 30}>{text}</text>
         </g>
      )
   }

   return (
      <g className={styles.legend}>
         <rect x={x} y={y} width={150} height={height} rx={15} />
         {items.map((item, index) => (
            <Item
               key={item.id} index={index} text={item.text}
               color={item.color} x={x} y={y + index * 40}
            />
         ))}
      </g>
   )
}