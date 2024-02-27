const Header = () => {
  return (
    <header className="flex justify-between items-center bg-[#BCC6CC] w-full h-16">
      <div
        className="w-[76px] h-[46px] flex justify-center items-center flex-col ml-[26px] rounded-[5px] border-[3px] border-solid border-[white] hover:shadow-[10px_5px_5px_#686e71]"
        data-testid="menu-button__wrapper"
      >
        <span className="h-[3px] w-[26px] bg-[white] translate-y-2.5"/>
        <span className="h-[3px] w-[26px] bg-[white]"/>
        <span className="h-[3px] w-[26px] bg-[white] -translate-y-2.5"/>
      </div>

      <p className="header-text text-white items-center px-2 mx-2">Create your posts to save them!</p>
    </header>
  )
}

export default Header;