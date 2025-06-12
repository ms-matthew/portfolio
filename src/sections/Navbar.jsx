import { useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
function Navigation(){
    return <ul className='nav-ul'>
        <li className='nav-li'>
            <a className='nav-link' href='#home'>Home</a>
        </li>
        <li className='nav-li'>
            <a className='nav-link' href='#about'>About</a>
        </li>
        <li className='nav-li'>
            <a className='nav-link' href='#work'>Work</a>
        </li>
        <li className='nav-li'>
            <a className='nav-link' href='#contact'>Contact</a>
        </li>
    </ul>
}
const Navbar = () => {
    const[isOpen, setIsOpen] = useState(false);
    return <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
                <div className="mx-auto c-space max-w-7xl">
                    <div className="flex items-center justify-between py-2 xm:py-0">
                        <a href='/' className="text-xl font-bold transition-colors text-neutral-400 hover:text-white">Mateusz
                        </a>
                        <motion.button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                                        initial={false}
                                        animate={{scale: 1}}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                  key={isOpen ? "close" : "open"}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <img
                                    src={isOpen ? "assets/close.svg" : "assets/open.svg"}
                                    className="w-6 h-6"
                                    alt="toggle"
                                  />
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                        <nav className="hidden sm:flex">
                            <Navigation></Navigation>
                        </nav>
                    </div>
                </div>
                {isOpen  && 
                (<motion.div className='block overflow-hidden text-center sm:hidden'
                                initial={{ opacity:0, x: -10}}
                                animate={{opacity:1, x: 0}}
                                style={{ maxHeight: "100wh"}}
                                transition={{ duration: 1}}>
                    <nav className='pb-5'><Navigation></Navigation></nav>
                </motion.div>)}
            </div>
};

export default Navbar;