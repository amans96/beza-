import React, { useState } from "react";
import { event } from "../data/events.js";

export default function Events() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
<h1 className=" mt-10 text-4xl font-extrabold tracking-tight text-green-400 text-center  sm:text-5xl md:text-6xl">
  EVENTS
</h1>

    <section className="max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {event.map((item) => (
          <div
            key={item.id}
            className="relative h-[500px] rounded-3xl overflow-hidden group shadow-xl"
            style={{
              backgroundImage: `url(${item.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 duration-300"></div>

         

            {/* Description */}
            <div className="absolute bottom-8 left-6 right-6">

              <div className=" backdrop-blur-sm rounded-2xl p-5 shadow-xl">

                <p className="text-white leading-7">
                  {selected === item.id ? item.big : item.small}
                </p>

                <button
                  onClick={() =>
                    setSelected(selected === item.id ? null : item.id)
                  }
                  className="mt-5 font-semibold hover:translate-x-2 transition text-green-900"
                >
                  {selected === item.id ? "See Less ←" : "See More →"}
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>

    </div>
  );
}