'use client'

import { useState } from 'react'
import styles from '../ReleasePage.module.scss'

interface ISongListPodProps {
  index: number
  song: any
}

export default function SongListPod({ index, song }: ISongListPodProps) {
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false)

  const lyrics = song.lyrics.unsynched || ''
  const hasLyrics = lyrics ? true : false

  return (
    <div className={styles.songListPod}>
      <div className={styles.songListPodSong}>
        <span className={styles.songListPodNumber}>{index + 1}.</span>
        <span style={{ marginRight: '1rem' }}>{song.display}</span>
        <span style={{ fontSize: '0.75rem', marginRight: '1rem' }}>
          {formatMSS(Math.trunc(song.duration))}
        </span>
        {hasLyrics && (
          <span onClick={() => setLyricsOpen(!lyricsOpen)}>
            <i
              className={`fa-sharp ${
                lyricsOpen ? 'fa-solid' : 'fa-light'
              } fa-pen-circle`}
            />
          </span>
        )}
        <span style={{ flexGrow: 1, textAlign: 'right' }}>
          <i className="fa-sharp fa-light fa-chevron-right" />
        </span>
      </div>
      <div
        className={styles.songListPodLyrics}
        style={{
          display: lyricsOpen ? 'block' : 'none',
        }}
      >
        {lyrics}
        <span onClick={() => setLyricsOpen(false)}>
          <i className="fa-sharp fa-solid fa-circle-xmark" />
        </span>
      </div>
    </div>
  )

  function formatMSS(s: any) {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
  }
}
