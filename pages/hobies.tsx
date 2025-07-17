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
        <div className={styles.overlayContent}>
          <h1>Hiking</h1>
          <p>
            I love escaping to the mountains whenever I can. There's something incredibly grounding
            about being surrounded by nature — the fresh air, scenic views, and peaceful trails help
            me recharge and gain perspective.
          </p>
        </div>
      </div>

      <div className={styles.hobieSection}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/books.png"
            alt="books"
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
        <div className={styles.overlayContent}>
          <h1>Reading</h1>
          <p>
            Reading is one of my favorite ways to unwind and learn at the same time. I’m especially
            drawn to books on personal development, psychology, and autobiographies.
          </p>
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
        <div className={styles.overlayContent}>
          <h1>Yoga</h1>
          <p>
            Yoga is more than just a form of exercise for me — it’s a way to center myself.
            Practicing regularly helps me stay balanced both mentally and physically. It improves my
            flexibility, focus, relieves stress, and encourages mindfulness in my daily routine.
          </p>
        </div>
      </div>
    </main>
  );
}
