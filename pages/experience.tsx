import Image from 'next/image';
import styles from './experience.module.scss';

export default function Experience() {
  return (
    <>
      <main>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/logo.png"
            alt=" Logo"
            fill
            className={styles.backgroundImage}
            priority
          />
          <div className={styles.overlayContent}>
            <h1>Experience:</h1>
            <p>
              ➢ 02.05.2023 – present : Wayfare 
              Front End Developer Frontend Technologies : Angular,React with Next.js, TypeScript, HTML5, CSS 
              Backend Technologies: Node.js with Nest.js,Progress Openedge, MySQL 
              • Led UI design and implementation for an AI-powered ChatGPT-style interface using
              React with Next.js, formatting and styling OpenAI-generated
              responses for clear readability, including custom code snippet borders and copy
              to-clipboard features. 
              • Developed a dynamic admin dashboard for internal HR activity
              planning using Angular and with FormArrays Reactive Forms, including editable rows
              with multiple data types and real-time validations. Ensured transactional consistency
              on the backend using Progress OpenEdge. 
              • Designed and built full authentication
              systems in two separate projects: one using React/Next .js with a Node .js/Nest.js
              backend, and another using Angular with a Progress OpenEdge backend. Both
              implementations included login, registration, email confirmation, and password reset
              workflows, with transactional email integration via Mailgun . 
              • Designed and
              implemented a rich text editor dialog (Kolkov Angular , ) with image upload and
              embedding. Ensured atomic data saving and efficient retrieval via relational mapping
              of content and images. 
              • Built an Electron-based desktop app frontend using React Flow
              and React to visualize complex JSON data as interactive node-link diagrams,
              implementing features like zoom, node search with highlighting, multi-tab support,
              landscape/portrait mode, circular reference filtering, toggling labels and export to
              PNG. 
              • Delivered dynamic Angular components with conditional rendering and logic,
              adapting visual structure and behavior based on input metadata. 
              • Created a full Figma
              design for a project, translating the design into a fully implemented production-ready
              application using Angular.
            </p>
            <p>
               27.06.2022 – 23.09.2022: Endava, Internship in Mobile Development (Swift).
                    ➢ Worked in a team to develop an application for online tests for students
            </p>
            <p>
              19.07.2021 – 27.08.2021: Wolfpack Digital, Internship in Mobile Development.
                    ➢ Worked alone in developing an application with food recipes.
                    ➢ Video demo: https://drive.google.com/file/d/1tMjEb3J-qFBKICfgCsBY8J02txFGGIK2/view?usp=sharing
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
