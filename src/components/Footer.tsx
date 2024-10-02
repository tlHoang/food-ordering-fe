const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          LOGO
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Copyright © 2022. All rights reserved</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </span>
      </div>
    </div>
  )
}

export default Footer;