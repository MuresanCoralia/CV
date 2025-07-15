import Image from 'next/image';
import styles from './education.module.scss';

export default function Education() {
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
            <h1>Education:</h1>
            <p>
              2018 – 2022: Technical University of Cluj-Napoca, Faculty of Electronics,
              Telecommunications and Information Technology (Telecommunication technologies
              specialization).
            </p>
            <p>
              Diploma project: Voting website with blockchain. The project was made using vanila js
              and a smart contract in solidity backend I used ethereum’s . On front end I used web 3
              and on blockchain. The way this application works is that an admin prepares the
              election with candidates and sets the period time available for voting. After the
              voting periods start, the admin can no longer modify anything, he can only see the
              votes being casted and the results. The users can vote only during that time frame and
              at the end the results are displayed for everybody. https
              ://github.com/MuresanCoralia/SiteLicenta
            </p>
            <p>
              2014 – 2018: “Gheorghe Șincai” High School, Cluj-Napoca, Baccalaureate in Mathematics
              and Computer Science.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
