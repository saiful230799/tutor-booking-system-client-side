import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-auto">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 max-w-7xl mx-auto justify-items-start md:justify-items-center">
        
        <nav className="flex flex-col space-y-2">
          <h6 className="footer-title opacity-60 font-bold tracking-wider text-primary">Learning Services</h6> 
          <Link href="/tutors" className="link link-hover text-sm">Mathematics Tutors</Link>
          <Link href="/tutors" className="link link-hover text-sm">Physics Tutors</Link>
          <Link href="/tutors" className="link link-hover text-sm">English Spoken</Link>
          <Link href="/tutors" className="link link-hover text-sm">Programming (ICT)</Link>
        </nav> 

        <nav className="flex flex-col space-y-2">
          <h6 className="footer-title opacity-60 font-bold tracking-wider text-primary">Contact Us</h6> 
          <p className="text-sm">Email: support@mediqueue.com</p>
          <p className="text-sm">Phone: +00 xxx-xxxxx</p>
          <p className="text-sm">Address: Dhaka, Bangladesh</p>
        </nav> 

        <nav className="flex flex-col space-y-2">
          <h6 className="footer-title opacity-60 font-bold tracking-wider text-primary">Social Links</h6> 
          <div className="grid grid-flow-col gap-5 text-2xl mt-1">
            <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary transition-all duration-300 transform hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </nav>

      </div>

      <div className="footer footer-center p-4 bg-neutral text-neutral-content border-t border-gray-800 text-xs opacity-70">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by MediQueue Ltd.</p>
        </aside>
      </div>
    </footer>
  );
}