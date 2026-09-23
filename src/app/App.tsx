import { ImageFeed } from '@/features/image-feed/components/ImageFeed/ImageFeed'

import styles from '@/app/App.module.scss'

export const App = () => {
  return (
    <main className={styles.page}>
      <ImageFeed />
    </main>
  )
}
