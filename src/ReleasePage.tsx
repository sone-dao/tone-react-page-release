'use client'

import { Page } from '@sone-dao/tone-react-core-ui'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './ReleasePage.module.scss'
import ReleaseDescription from './components/ReleaseDescription'
import ReleasePlayer from './components/ReleasePlayer'
import SongListPod from './components/SongListPod'

interface IReleaseData {
  artwork: {
    cover: string
  }
  display: string
  artists: any
  description: string
}

const releaseDataDefault: IReleaseData = {
  artwork: {
    cover: '',
  },
  display: '',
  artists: [],
  description: '',
}

interface IReleasePageProps {}

export default function ReleasePage({}: IReleasePageProps) {
  const [release, setRelease] = useState<IReleaseData>(releaseDataDefault)
  const [songs, setSongs] = useState<any[]>([])
  const params = useParams()

  const previewImageUrl = (release.artwork.cover || '') + '/large'

  useEffect(() => {
    loadRelease()
  }, [])

  return (
    <Page className={styles.component}>
      {release.artwork.cover && (
        <Image
          alt=""
          height="1000"
          width="1000"
          src={previewImageUrl}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <ReleasePlayer
        releaseDisplay={release.display || ''}
        artists={release.artists || ''}
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

  async function loadRelease() {
    getRelease(params.releaseId).then((release) => setRelease(release))
    getReleaseSongs(params.releaseId).then((songs) => setSongs(songs))
  }

  async function getRelease(releaseId: string) {
    const response = await fetch(
      'https://api.tone.audio/v1/catalog/releases?releaseId=' + releaseId,
      { cache: 'no-store' }
    )

    !response.ok && console.log(response)

    const data = await response.json()

    return data.release
  }

  async function getReleaseSongs(releaseId: string) {
    const response = await fetch(
      'https://api.tone.audio/v1/catalog/releases/' + releaseId + '/songs',
      { cache: 'no-store' }
    )

    !response.ok && console.log(response)

    const data = await response.json()

    return data.songs
  }
}
