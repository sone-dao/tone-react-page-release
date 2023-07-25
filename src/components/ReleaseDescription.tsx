'use client'

import { CSSProperties, useState } from 'react'
import styles from '../ReleasePage.module.scss'

interface IReleaseDescriptionProps {
  description: string
}

export default function ReleaseDescription({
  description,
}: IReleaseDescriptionProps) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const overLength = description.length > 1500 ? true : false

  const style: CSSProperties = isOpen
    ? {
        height: 'auto',
        overflow: 'auto',
      }
    : {
        height: '33%',
        overflow: 'hidden',
      }

  return (
    <>
      <div style={style} className={styles.releaseDescription}>
        <p>{description}</p>
      </div>
      {overLength && (
        <div className={styles.readMore}>
          <span onClick={() => setOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Read More'}
          </span>
        </div>
      )}
    </>
  )
}
