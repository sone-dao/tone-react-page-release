import { Page } from '@sone-dao/tone-react-core-ui'
import styles from './ReleasePage.module.scss'
import ReleaseDescription from './components/ReleaseDescription'
import ReleasePlayer from './components/ReleasePlayer'
import SongListPod from './components/SongListPod'

export default function ReleasePage({
  release,
  songs,
}: {
  release: any
  songs: any
}) {
  return (
    <Page className={styles.component}>
      {/*<Image
        alt=""
        height="1000"
        width="1000"
        src={release.artwork.cover + '/large'}
        style={{ maxWidth: '100%', height: 'auto' }}
        priority
  />*/}
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
