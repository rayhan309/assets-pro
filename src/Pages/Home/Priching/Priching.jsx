import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { Check } from "lucide-react";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";

const Priching = () => {
  const axiosSquer = useAxiosSquer();

  const { data: pricingData = [], isLoading } = useQuery({
    queryKey: ["priching", "priching"],
    queryFn: async () => {
      const res = await axiosSquer("/priceing");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-50/10 via-white/70 to-slate-50/20 p-20 my-12">
      <div className="my-10">
        <h1 className="text-4xl font-bold text-center">
          Find Your Perfect Plan
        </h1>
        <p className="text-center font-normal py-3">Choose the plan that fits your needs and start enjoying our features today.</p>
      </div>

      <div className="grid grid-cols-3 gap-5">

      {pricingData.map((card, index) => {
        return (
          <div className="card w-96 rounded-2xl border bg-white/25 border-white shadow-sm">
            <div className="card-body">
              {index === 2 && (
                <span className="badge badge-xs badge-warning">
                  Most Popular
                </span>
              )}

              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">{card?.name}</h2>
                <span className="text-xl">$ {card?.price}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                {card.features.map((f) => {
                  return (
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 me-2 inline-block text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{f}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <button className="btn btn-primary btn-block">Subscribe</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    </div>
  );
};

export default Priching;
