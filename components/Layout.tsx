import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Copyright from './Copyright';
import styles from './layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <Navbar />
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </div>
    </>
  );
}
