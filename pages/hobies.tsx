import Image from 'next/image';
import styles from './hobies.module.scss';

export default function Hobies() {
  return (
    <main className={styles.hobiesContainer}>
      <div className={styles.hobieSection}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/mountain.png"
            alt="mountain"
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h1>Hiking</h1>
          <p>I enjoy spending time outdoors especially in the mountains.</p>
        </div>
      </div>

      <div className={styles.hobieSection}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/books.jpg"
            alt="books"
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h1>Reading</h1>
          <p>I enjoy reading books about personal development and autobiographies.</p>
        </div>
      </div>

      <div className={styles.hobieSection}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/yoga.png"
            alt="yoga"
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h1>Yoga</h1>
          <p>Practicing yoga helps me stay balanced, flexible, and mentally focused.</p>
        </div>
      </div>
    </main>
  );
}
