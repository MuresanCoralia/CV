'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'About me' },
    { href: '/experience', label: 'Experience' },
    { href: '/education', label: 'Education' },
    { href: '/softskills', label: 'Soft skills' },
    { href: '/hobbies', label: 'Hobbies' },
    { href: '/blogs', label: 'Blogs' },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/assets/logo.png" alt="C Logo" width={40} height={40} />
        <span>Muresan Coralia</span>
      </div>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`${styles.navItems} ${isOpen ? styles.open : ''}`}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={router.pathname === href ? styles.active : ''}
              onClick={closeMenu}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
