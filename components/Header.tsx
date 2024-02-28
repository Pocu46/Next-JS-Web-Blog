const Header = () => {
  return (
    <header className="flex justify-between items-center bg-[#BCC6CC] w-full h-16">
      <div
        className="burger-wrapper"
      >
        <span className="h-[3px] w-[26px] bg-[white]"/>
        <span className="burger-line"/>
        <span className="h-[3px] w-[26px] bg-[white]"/>
      </div>

      <p className="header-text text-white items-center px-2 mx-2">Create your posts to save them!</p>
    </header>
  )
}

export default Header;