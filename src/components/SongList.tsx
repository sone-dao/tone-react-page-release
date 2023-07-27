'use client'

import { sub } from '@sone-dao/sone-react-utils'
import { useEffect, useState } from 'react'
import styles from '../ReleasePage.module.scss'
import SongListPod from './SongListPod'

interface ISongListProps {
  songs: any
}

export default function SongList({ songs }: ISongListProps) {
  const [currentSongId, setCurrentSongId] = useState<string>('')

  useEffect(() => {
    sub('__TONE_PLAYER__', 'update.SongId', (songId: string) =>
      setCurrentSongId(songId)
    )
  }, [])

  return (
    <div className={styles.songList}>
      {songs.length &&
        songs.map((song: any, i: number) => (
          <SongListPod
            key={i}
            index={i}
            song={song}
            currentSongId={currentSongId}
          />
        ))}
    </div>
  )
}
