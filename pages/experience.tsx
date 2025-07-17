import Image from 'next/image';
import styles from './experience.module.scss';

export default function Experience() {
  const starCount = 12;

  return (
    <main>
      <div className={styles.imageContainer}>
        {[...Array(starCount)].map((_, index) => (
          <Image
            key={index}
            src="/assets/star.png"
            alt={`Star ${index + 1}`}
            width={30}
            height={30}
            className={`${styles.star} ${styles[`star${index + 1}`]}`}
          />
        ))}

        <Image src="/assets/logo.png" alt="Logo" fill className={styles.backgroundImage} priority />

        <div className={styles.overlayContent}>
          <h1>✨ Experience</h1>

          <section className={styles.entry}>
            <div className={styles.header}>
              <span>💼</span>
              <div>
                <h2>Wayfare</h2>
                <p className={styles.dates}>02.05.2023 – Present (2+ years)</p>
              </div>
            </div>
            <p className={styles.role}>Full Stack Developer</p>
            <p>
              <strong>Frontend:</strong> Angular, React (Next.js), TypeScript
            </p>
            <p>
              <strong>Backend:</strong> Node.js (Nest.js), Progress OpenEdge, MySQL
            </p>
            <br />
            <ul>
              <li>
                🤖 Designed and implemented a full-stack React + Next.js UI with a Node.js (NestJS)
                backend, integrating ChatGPT APIs to display AI-generated responses with custom
                styling, code formatting, and copy-to-clipboard functionality.
              </li>
              <li>
                📊 Developed a dynamic Angular admin dashboard for HR activity planning using
                Reactive Forms with editable rows, real-time validation, and ensured backend
                consistency with Progress OpenEdge.
              </li>
              <li>
                🔐 Designed and built full auth systems in two projects: one with React/Next.js +
                Node.js/NestJS, another with Angular + Progress OpenEdge. Both included login,
                registration, email confirmation, password reset, and Mailgun email integration.
              </li>
              <li>
                🖼️ Built a rich text editor dialog (Kolkov Angular) with image upload and embedding,
                using relational mapping for atomic saves and efficient content/image retrieval.
              </li>
              <li>
                🧩 Developed an Electron-based desktop app with React and React Flow to visualize
                complex JSON as interactive node-link diagrams, featuring zoom, search, tabbed
                views, label toggles, and PNG export.
              </li>
              <li>
                🎨 Created a full Figma design and translated it into a production-ready Angular app
                with Progress backend integration.
              </li>
              <li>
                🔧 Delivered dynamic Angular components with conditional rendering and behavior,
                adapting layout and logic based on input metadata.
              </li>
            </ul>
          </section>

          <section className={styles.entry}>
            <div className={styles.header}>
              <span>📱</span>
              <div>
                <h2>Endava</h2>
                <p className={styles.dates}>27.06.2022 – 23.09.2022</p>
              </div>
            </div>
            <p className={styles.role}>Internship – Mobile Development</p>
            <ul>
              <li>
                🤝 Worked closely with a small Agile team to build an iOS app in Swift that lets
                students take online tests. I helped implement features like login, smooth question
                flow, timers, and score summaries — all aimed at making the testing experience
                simple and user-friendly.
              </li>
            </ul>
          </section>

          <section className={styles.entry}>
            <div className={styles.header}>
              <span>🧑‍🍳</span>
              <div>
                <h2>Wolfpack Digital</h2>
                <p className={styles.dates}>19.07.2021 – 27.08.2021</p>
              </div>
            </div>
            <p className={styles.role}>Internship – Mobile Development</p>
            <ul>
              <li>
                🤝 Built a food recipe app from scratch in Swift as a solo project. I designed and
                developed everything — from browsing and searching recipes to viewing detailed
                instructions — and wrapped it up by presenting a live demo of the final product.
              </li>
              <li>
                🎥{' '}
                <a
                  href="https://drive.google.com/file/d/1tMjEb3J-qFBKICfgCsBY8J02txFGGIK2/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Demo
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
