import styles from './education.module.scss';

export default function Education() {
  return (
    <main>
      <div className={styles.overlayContent}>
        <h1 className={styles.fadeIn}>🎓 Education</h1>

        <p className={styles.fadeIn} style={{ animationDelay: '0.2s' }}>
          <strong>2018 – 2022:</strong> Technical University of Cluj-Napoca, Faculty of Electronics,
          Telecommunications and Information Technology (Telecommunication Technologies
          specialization).
        </p>

        <p className={styles.fadeIn} style={{ animationDelay: '0.8s' }}>
          <strong>Diploma Project:</strong> Voting website with blockchain. The project was made
          using vanila js and a smart contract in solidity backend I used ethereum’s. On front end
          I used web 3 and on blockchain. The way this application works is that an admin prepares
          the election with candidates and sets the period time available for voting. After the
          voting periods start, the admin can no longer modify anything, he can only see the votes
          being casted and the results. The users can vote only during that time frame and at the
          end the results are displayed for everybody.
        </p>

        <p className={styles.fadeIn} style={{ animationDelay: '1.4s' }}>
          🔗 GitHub repo:
          <a
            href="https://github.com/MuresanCoralia/SiteLicenta"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/MuresanCoralia/SiteLicenta
          </a>
        </p>

        <p className={styles.fadeIn} style={{ animationDelay: '2.0s' }}>
          <strong>2014 – 2018:</strong> “Gheorghe Șincai” High School, Cluj-Napoca — Baccalaureate
          in Mathematics and Computer Science.
        </p>
      </div>
    </main>
  );
}
