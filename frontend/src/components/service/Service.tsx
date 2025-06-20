import Image from "next/image";
import feature from "../../assets/Clipboard.svg";

export const Services = () => {
  return (
    <div className="my-2">
      <div className="px-2 flex">
        <Image alt="Feature Services" src={feature} />
        <p className="text-xl font-semibold text-black">Services Offered</p>
      </div>

      <div className="flex flex-grow text-center px-5 py-2">
        <p className="flex-grow text-[#525252]">
            At Homr Management, we strive to exceed your expectations, delivering not just services but boss-like experience to you at the comport of your home.
        </p>
      </div>

      <div className="justify-center items-center grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 2xs:grid-cols-1 gap-2 my-2">

      </div>
    </div>
  );
};
