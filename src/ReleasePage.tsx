import { Page } from '@sone-dao/tone-react-core-ui'
import Image from 'next/image'
import styles from './ReleasePage.module.scss'
import ReleaseDescription from './components/ReleaseDescription'
import ReleasePlayer from './components/ReleasePlayer'
import SongList from './components/SongList'

export default function ReleasePage({
  release,
  songs,
}: {
  release: any
  songs: any
}) {
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
      {
        <ReleasePlayer
          releaseDisplay={release.display}
          artists={release.artists}
        />
      }
      <SongList songs={songs} />
      <ReleaseDescription description={release.description} />
    </Page>
  )
}
