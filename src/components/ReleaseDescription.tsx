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
    <>
      <div
        style={{
          height: isOpen ? 'auto' : '33vh',
        }}
        className={styles.releaseDescription}
      >
        {description}
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
