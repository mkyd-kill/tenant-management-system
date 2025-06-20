function Footer() {
    return (
      <div
        className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 px-1 pb-2 bg-white rounded-xl"
      >
        <span className="flex flex-grow text-[#475467] text-sm text-center pt-2.5">
          Developed by &copy; {new Date().getFullYear()}{' '}Kodek Technologies
        </span>
      </div>
    );
  }
  export default Footer;