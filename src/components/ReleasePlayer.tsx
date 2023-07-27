'use client'

import { pub, sub } from '@sone-dao/sone-react-utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../ReleasePage.module.scss'

interface IReleasePlayerProps {
  releaseDisplay: string
  artists: {
    uniqueUrl: string
    display: string
  }[]
}

export default function ReleasePlayer({
  releaseDisplay = '',
  artists = [],
}: IReleasePlayerProps) {
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    sub('__TONE_PLAYER__', 'update.isPlaying', (isPlaying: boolean) =>
      setPlaying(isPlaying)
    )
  }, [])

  useEffect(() => {
    console.log({ isPlaying })
  }, [isPlaying])

  return (
    <div className={styles.player}>
      {isPlaying ? (
        <i
          className="fa-fw fa-sharp fa-solid fa-pause"
          onClick={() => pub('__TONE_PLAYER__', 'audio.pause')}
        />
      ) : (
        <i
          style={{ paddingLeft: '1.25rem' }}
          className="fa-fw fa-sharp fa-solid fa-play"
          onClick={() => pub('__TONE_PLAYER__', 'audio.play')}
        />
      )}
      <div className={styles.playerInfo}>
        {releaseDisplay ? (
          <span style={{ fontWeight: 'bold' }}>{releaseDisplay}</span>
        ) : (
          <span />
        )}
        {artists.length ? (
          <span>
            by{' '}
            {artists.map((artist: any, i: number) => (
              <span key={i}>
                {i > 0 && ', '}
                <Link href="#">{artist.display}</Link>
              </span>
            ))}
          </span>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}
