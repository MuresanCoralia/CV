import Image from 'next/image';
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/avatar.png"
            alt="Coralia Avatar"
            width={0}
            height={0}
            sizes="50vw"
            style={{ width: '65vw', height: '65vh', objectFit: 'contain' }}
            priority
          />
        </div>
      </main>
    </>
  );
}
