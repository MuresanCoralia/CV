import Image from 'next/image';
import styles from './home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.imageContainer}>
        <Image
          src="/assets/avatar.png"
          alt="Coralia Avatar"
          width={0}
          height={0}
          sizes="40vw"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          priority
        />
      </div>

      <div className={styles.textContainer}>
        <p>
          &nbsp;&nbsp;&nbsp;I’m a Full Stack Developer who loves working with frontend frameworks
          like Angular and React/Next.js, alongside solid backend skills in Node.js (NestJS) and
          Progress OpenEdge. I enjoy crafting complex user interfaces, building full authentication
          systems, desktop apps, and admin dashboards. Clean code and intuitive user experiences are
          my passion, and I’m excited about blending AI and data visualization to create smart,
          engaging applications.
        </p>
      </div>

      <div className={styles.floatingLogos}>
        <div className={`${styles.logo} ${styles.logo1}`}>
          <Image src="/assets/nodejs.svg" alt="Node.js" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo2}`}>
          <Image src="/assets/react.svg" alt="React" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo3}`}>
          <Image src="/assets/angular.svg" alt="Angular" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo4}`}>
          <Image src="/assets/typescript.svg" alt="TypeScript" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo5}`}>
          <Image src="/assets/nestjs.svg" alt="NestJS" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo6}`}>
          <Image src="/assets/progress.svg" alt="Progress OpenEdge" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo7}`}>
          <Image src="/assets/nextjs.svg" alt="Next.js" width={50} height={50} />
        </div>
      </div>
    </main>
  );
}
