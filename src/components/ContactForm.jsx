import React from "react";

const ContactForm = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 font-sans p-6">

      <form
        className="
          w-full
          max-w-6xl
          bg-white
          p-6
          md:p-12
          rounded-2xl
          shadow-xl
          flex
          flex-col
          gap-8
        "
        onSubmit={(e) => e.preventDefault()}
      >

        {/* Form Content */}
        <div className="
          flex
          flex-col
          lg:flex-row
          gap-8
        ">


          {/* Inputs Section */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">


            <input
              type="text"
              placeholder="Name"
              className="
                h-[70px]
                px-6
                text-lg
                border-2
                border-gray-300
                rounded-l-3xl
                rounded-r-md
                focus:outline-none
                focus:border-[#10b981]
                transition-all
              "
              required
            />


            <input
              type="tel"
              placeholder="Phone"
              className="
                h-[70px]
                px-6
                text-lg
                border-2
                border-gray-300
                rounded-l-3xl
                rounded-r-md
                focus:outline-none
                focus:border-[#10b981]
                transition-all
              "
              required
            />


            <input
              type="email"
              placeholder="Email"
              className="
                h-[70px]
                px-6
                text-lg
                border-2
                border-gray-300
                rounded-l-3xl
                rounded-r-md
                focus:outline-none
                focus:border-[#10b981]
                transition-all
              "
              required
            />


          </div>



          {/* Message Section */}
          <div className="w-full lg:w-1/2">

            <textarea
              placeholder="Message"
              className="
                w-full
                h-[250px]
                p-6
                text-lg
                border-2
                border-gray-300
                rounded-l-3xl
                rounded-r-md
                resize-none
                focus:outline-none
                focus:border-[#10b981]
                transition-all
              "
              required
            />

          </div>


        </div>



        {/* Button at the end */}
        <div className="flex justify-end">

          <button
            type="submit"
            className="
              w-full
              sm:w-44
              h-16
              bg-[#10b981]
              hover:bg-emerald-700
              text-white
              text-lg
              font-semibold
              rounded-xl
              shadow-lg
              shadow-emerald-200
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            Send
          </button>

        </div>


      </form>

    </div>
  );
};

export default ContactForm;