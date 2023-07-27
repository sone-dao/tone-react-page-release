'use client'

import { pub, sub } from '@sone-dao/sone-react-utils'
import { useEffect, useState } from 'react'
import styles from '../ReleasePage.module.scss'

interface ISongListPodProps {
  index: number
  song: any
  currentSongId: string
}

export default function SongListPod({
  index,
  song,
  currentSongId,
}: ISongListPodProps) {
  const [lyricsOpen, setLyricsOpen] = useState<boolean>(false)
  const [lyricsHover, setLyricsHover] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const lyrics = song.lyrics.unsynched || ''
  const hasLyrics = lyrics ? true : false

  const isCurrentSong = song.songId == currentSongId

  useEffect(() => {
    sub('__TONE_PLAYER__', 'update.time', (time: number) => setSongTime(time))
  }, [])

  return (
    <div
      className={styles.songListPod}
      onClick={() => setPlayerSong(song.songId)}
    >
      <div className={styles.songListPodSong}>
        <span className={styles.songListPodNumber}>{index + 1}.</span>
        <span style={{ marginRight: '1rem' }}>{song.display}</span>
        <span style={{ fontSize: '0.75rem', marginRight: '1rem' }}>
          {isCurrentSong && `${formatMSS(Math.trunc(currentTime))} / `}
          {formatMSS(Math.trunc(song.duration))}
        </span>
        {hasLyrics && (
          <span
            onMouseEnter={() => setLyricsHover(true)}
            onMouseLeave={() => setLyricsHover(false)}
            onClick={() => setLyricsOpen(!lyricsOpen)}
          >
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

  function setSongTime(time: number) {
    setCurrentTime(time)
  }

  function setPlayerSong(songId: string) {
    console.log('setting song...')
    !lyricsHover && pub('__TONE_PLAYER__', 'set.SongId', songId)
  }
}
