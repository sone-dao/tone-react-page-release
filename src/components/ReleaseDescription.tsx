'use client'

import { useState } from 'react'
import styles from '../ReleasePage.module.scss'

interface IReleaseDescriptionProps {
  description: string
}

export default function ReleaseDescription({
  description,
}: IReleaseDescriptionProps) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const overLength = description.length > 1500 ? true : false

  return (
    <div className={styles.releaseDesc}>
      <p style={{ height: isOpen ? 'auto' : '33vh' }}>{description}</p>
      {overLength && (
        <div className={styles.readMore}>
          <span onClick={() => setOpen(!isOpen)}>
            {isOpen ? 'Close' : 'Read More'}
          </span>
        </div>
      )}
    </div>
  )
}
