import { Page } from '@sone-dao/tone-react-core-ui'
import styles from './ReleasePage.module.scss'
import ReleaseDescription from './components/ReleaseDescription'
import ReleasePlayer from './components/ReleasePlayer'
import SongListPod from './components/SongListPod'

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

export default async function ReleasePage({
  params,
}: {
  params: { id: string }
}) {
  const release = await getRelease(params.id)
  const songs = await getReleaseSongs(params.id)

  return (
    <Page className={styles.component}>
      <img
        height="1000"
        width="1000"
        src={release.artwork.cover + '/large'}
        style={{ maxWidth: '100%', height: 'auto' }}
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
