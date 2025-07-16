import Image from 'next/image';
import styles from './softskills.module.scss';

export default function Contact() {
  return (
    <>
      <main>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/logo.png"
            alt="C Logo"
            fill
            className={styles.backgroundImage}
            priority
          />
          <div className={styles.overlayContent}>
            <h1>Soft Skills:</h1>
            <div className={styles.skillsGrid}>
              <div className={styles.leftColumn}>
                <p>
                  <strong>&nbsp;Teamwork ➢</strong> I have experience working independently, as well
                  as in both small and large teams. I view the work objectives as a team effort and
                  I like the idea of shared responsibilities between team members, according to
                  personal preferences, skills and efficiency.
                </p>
                <p>
                  <strong>&nbsp;Meeting Deadlines ➢</strong> With strong organizational skills and a
                  commitment to maintaining order in all aspects of work, I consistently meet
                  deadlines through effective time management, focus, and clear planning—even under
                  pressure.
                </p>
              </div>
              <div className={styles.rightColumn}>
                <p>
                  <strong>&nbsp;Organized ➢</strong>I have exceptional organizational skills,
                  consistently structuring tasks and workflows to maximize overall efficiency and
                  productivity. I am able to handle multiple projects simultaneously while
                  maintaining a very high level of accuracy.
                </p>
                <p>
                  <strong>&nbsp;Critical Thinking ➢</strong> I approach problems analytically,
                  evaluating different perspectives before making decisions. I strive to base my
                  solutions on evidence, logic, and creativity, especially when faced with complex
                  or unfamiliar challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
