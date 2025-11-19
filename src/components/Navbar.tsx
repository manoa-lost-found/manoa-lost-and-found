'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#024731' }}
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-white fw-bold d-flex align-items-center">
          <Image src="/uh-logo.png" alt="UH Logo" width={40} height={40} />
          <span className="ms-2">Manoa Lost & Found</span>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/list" className="nav-link text-white">
                Lost/Found Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/add/lost" className="nav-link text-white">
                Report Lost
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/add/found" className="nav-link text-white">
                Report Found
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/auth/signin" className="nav-link text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
