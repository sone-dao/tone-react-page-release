'use client'

import { Page } from '@sone-dao/tone-react-core-ui'
import Image from 'next/image'
import styles from './ReleasePage.module.scss'
import ReleaseDescription from './components/ReleaseDescription'
import ReleasePlayer from './components/ReleasePlayer'
import SongListPod from './components/SongListPod'

interface IReleasePageProps {
  release: any
  songs: any
}

export default function ReleasePage({ release, songs }: IReleasePageProps) {
  return (
    <Page className={styles.component}>
      <Image
        alt=""
        height="1000"
        width="1000"
        src={release.artwork.cover + '/large'}
        style={{ maxWidth: '100%', height: 'auto' }}
        priority
      />
      <ReleasePlayer
        releaseDisplay={release.display}
        artists={release.artists}
      />
      <div className={styles.songList}>
        {songs.length &&
          songs.map((song: any, i: number) => (
            <SongListPod key={i} index={i} song={song} />
          ))}
      </div>
      <ReleaseDescription description={release.description} />
    </Page>
  )
}
