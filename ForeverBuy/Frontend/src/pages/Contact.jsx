import { assets } from "../assets/assets"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div className="flex flex-col items-center w-full pt-[2rem] mb-[10rem] gap-[5rem]">
      <div className="flex justify-center">
        <Title firstName="CONTACT" secondName="US"/>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div>
          <img src={assets.contact_img} alt="contact-img" className="w-full md:w-[30rem]"/>
        </div>
        <div className="flex flex-col gap-7 text-slate-500">
          <div className="font-semibold text-xl text-black">Our Store</div>
          <div>
            <div>54709 Willms Station </div>
            <div>Suite 350, Washington, USA</div>
          </div>
          <div>
            <div>Tel: (415) 555-0132 </div>
            <div>Email: admin@forever.com</div>
          </div>
          <div className="font-semibold text-xl text-black">Careers at Forever</div>
          <div>Learn more about our teams and job openings</div>
          <div className="border bg-black text-white cursor-pointer p-3 px-6 text-center mt-[1rem] w-full md:w-fit">Explore Jobs</div>
        </div>
      </div>
    </div>
  )
}

export default Contact