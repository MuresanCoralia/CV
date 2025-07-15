import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';

export default function Navbar() {
  const router = useRouter();
  const navLinks = [
    { href: '/', label: 'About me' },
    { href: '/experience', label: 'Experience' },
    { href: '/education', label: 'Education' },
    { href: '/softskills', label: 'Soft skills' },
    { href: '/hobies', label: 'Hobies' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/assets/logo.png" alt="C Logo" width={40} height={40} />
        <span>Muresan Coralia</span>
      </div>
      <ul className={styles.navItems}>
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={router.pathname === href ? 'active' : ''}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
