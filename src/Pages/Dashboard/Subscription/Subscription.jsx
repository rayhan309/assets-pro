import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";

const Subscription = () => {
  const axiosSquer = useAxiosSquer();

  const { data: priceing = [], isLoading } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const res = await axiosSquer.get("/priceing");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // handlePayment
  const handlePayment = (plan) => {
    console.log(plan);
  };

  return (
    <section className="px-4 md:px-24 pt-28 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#f77e52]">
          Choose Your Plan!
        </h2>
        <p className="max-w-2xl mx-auto text-[#f77e52]">
          Simple, transparent pricing. No hidden fees.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
        {priceing.map((plan) => {
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flip-card min-h-100"
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p className="title">{plan?.name}</p>
                  <p>Hover Me</p>
                </div>
                <div className="flip-card-back">
                  <p className="title text-primary">{plan?.name}</p>
                  <p className="mb-6 text-primary">
                    Up to{" "}
                    <span className="font-medium">{plan.employeeLimit}</span>{" "}
                    employees
                  </p>
                  <div className="mb-6 text-primary">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-xl font-normal">/Month</span>
                  </div>

                  <ul className="space-y-3 mb-8 ml-10 flex-1">
                    {plan.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                  onClick={() => handlePayment(plan)}
                    className={`btn w-[40%] border-none btn-primary rounded-xl absolute bottom-0 right-0 text-sm font-semibold transition mb-5`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

  
    </section>
  );
};

export default Subscription;
