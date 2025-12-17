import { Info, Package } from "lucide-react";
import useUserRole from "../../../Hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";

const MyTeam = () => {
  const axiosSqure = useAxiosSquer();
  const { userInfo } = useUserRole();
  const {newJoinCompaye} = userInfo;

  const [one] = newJoinCompaye;

  const {data: myTeam = [], isLoading} = useQuery({
    queryKey: ['myTeam', userInfo.email],
    queryFn: async () => {
      const resp = await axiosSqure.get(`/approvedAssets/company?companyName=${one.companyName}`);
      return resp.data;
    }
  });

    const uniqueEmployees = Array.from(
    new Map(
      myTeam.map((emp) => [emp.employeeEmail, emp])
    ).values()
  );

  if(isLoading) return <Loading />

  console.log(uniqueEmployees);
  
  return (
    <>
      <div className="my-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-normal flex justify-center items-center gap-2 mt-5">
          <Package /> My Active Aompayees
        </h2>
        <p className="flex justify-center items-center gap-2">
          <Info width={17} /> My all of compaye team members & HR info
        </p>

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-normal">
              My Active Compayees ( <span className="text-primary">5</span> )
            </h2>
          </div>
          <div>
            <select className="input-pro">
              <option className="text-primary">Select Compaye</option>
              <option className="text-primary" value="company name">
                company name
              </option>
            </select>
          </div>
        </div>

        <div className="w-full my-5 border border-b-2 border-dashed border-primary"></div>

      </div>
    </>
  );
};

export default MyTeam;
