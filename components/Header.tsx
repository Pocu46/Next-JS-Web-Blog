"use client"

import {useState} from "react";
import Modal from "@/components/Modal";
import Link from "next/link";
import {usePathname} from "next/navigation";

const BurgerMenu = ({action}: () => void) => {
  const pathname: string = usePathname()

  const active: string = "bg-[#506d5d] w-full h-[4rem] flex justify-center items-center text-3xl font-[200] leading-[1] text-[white] hover:bg-[#43414c] hover:text-[white] hover:underline"
  const style: string = "w-full h-[4rem] flex justify-center items-center text-3xl font-[200] leading-[1] text-[white] hover:bg-[#43414c] hover:text-[white] hover:underline"

  return (
    <>
      <h2 className="py-3 bg-[#4a535c] text-[white] m-auto mt-3 text-center text-2xl font-[200] leading-[1]">Create your
        posts to
        save them!</h2>

      <nav className="m-auto mt-5 flex justify-center items-center flex-col py-2">
        <Link onClick={action} href="/" className={pathname == "/" ? active : style}>Home</Link>
        <Link onClick={action} className={pathname == "/post/create" ? active : style} href="/post/create">Create Post</Link>
        <Link onClick={action} className={pathname == "/post/posts" ? active : style} href="/post/posts">Posts</Link>
        <Link onClick={action} className={pathname == "/post/favorites" ? active : style} href="/post/favorites">Favorites</Link>
      </nav>
    </>
  )
}

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const burgerOpen = () => {
    setIsOpened(true)
    document.body.style.overflow = 'hidden'
  }

  const burgerClose = () => {
    setIsOpened(false)
    document.body.style.overflow = ''
  }

  return (
    <header className="flex justify-between items-center bg-[#BCC6CC] w-full h-16 relative">
      <div
        className="burger-wrapper"
        onClick={burgerOpen}
      >
        <span className="h-[3px] w-[26px] bg-[white]"/>
        <span className="burger-line"/>
        <span className="h-[3px] w-[26px] bg-[white]"/>
      </div>

      <Modal
        style="ml-0 mr-auto mt-16 mb-0 w-[400px] h-[calc(100vh_-_64px)] bg-[rgba(0,0,0,0.85)] relative left-0 bottom-0 modal"
        open={isOpened}
        onClose={burgerClose}
        root="modalId"
      >
        <BurgerMenu action={burgerClose}/>
      </Modal>
    </header>
  )
}

export default Header;