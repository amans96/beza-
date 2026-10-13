export default function Location() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Find Us
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Visit us at our location or contact us for more information.
          </p>
        </div>

        {/* Location Card */}
        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
          grid
          md:grid-cols-2
        ">
          {/* Map */}
          <div className="h-[350px] md:h-[500px]">
            <iframe
              className="w-full h-full"
              src="YOUR_GOOGLE_MAP_EMBED_LINK"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>

          {/* Information */}
          <div className="
            p-8
            md:p-12
            flex
            flex-col
            justify-center
          ">
            <h3 className="
              text-3xl
              font-bold
              text-gray-800
              mb-6
            ">
              Our Location
            </h3>

            <div className="space-y-5 text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800">
                  Address
                </h4>
                <p>
                  Addis Ababa, Ethiopia
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  Phone
                </h4>
                <p>
                  +251 900 000 000
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  Opening Hours
                </h4>
                <p>
                  Monday - Saturday: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8067192.125432863!2d40.49939505!3d9.1491755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1635d0cedd6cfd2b%3A0x7bf6a67f5348c55a!2sEthiopia!5e0!3m2!1sen!2set!4v1785692907962!5m2!1sen!2set"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8
                inline-flex
                justify-center
                items-center
                w-full   
                md:w-fit
                px-8
                py-3
                bg-[#10b981]
                text-white
                rounded-xl
                font-semibold
                hover:bg-emerald-700
                transition
              "
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}