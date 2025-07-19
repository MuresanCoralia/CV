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
          &nbsp;&nbsp;&nbsp;I'm a Full Stack Developer with a strong passion for frontend frameworks
          like Angular and React/Next.js, backed by solid backend experience using Node.js (NestJS)
          and Progress OpenEdge. I love building complex, intuitive user interfaces, designing full
          authentication systems, developing desktop apps, and creating admin dashboards that make
          workflows smoother. Clean, maintainable code and great user experiences drive my work —
          and I’m especially excited about blending AI and data visualization to build smarter, more
          engaging applications.
        </p>
        <p>
          You can check my{' '}
          <a
            href="https://github.com/MuresanCoralia?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
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
          <Image src="/assets/progress.png" alt="Progress OpenEdge" width={50} height={50} />
        </div>
        <div className={`${styles.logo} ${styles.logo7}`}>
          <Image src="/assets/nextjs.svg" alt="Next.js" width={50} height={50} />
        </div>
      </div>
    </main>
  );
}
