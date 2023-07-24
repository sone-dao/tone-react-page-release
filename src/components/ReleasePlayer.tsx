'use client'

import Link from 'next/link'
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
  return (
    <div className={styles.player}>
      <i
        style={{ paddingLeft: '1.66rem' }}
        className="fa-sharp fa-solid fa-play"
      />
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
                <Link href={`https://`}>{artist.display}</Link>
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
