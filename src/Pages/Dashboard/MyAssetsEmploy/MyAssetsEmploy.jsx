import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSquer from "../../../Hooks/useAxiosSquer";
import Loading from "../../../Components/Loading/Loading";
import { FileText, LogOut, Package, Search, Printer } from "lucide-react"; // Added Printer icon
import Swal from "sweetalert2";
import { useState } from "react";
// 1. Import PDF components
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// 2. Define PDF Styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: { width: 120, fontWeight: "bold" },
  value: { flex: 1 },
});

const AssetPDF = ({ request }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Asset Assignment Details</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Asset Name:</Text>
          <Text style={styles.value}>{request.assetName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{request.companyName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{request.assetType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Request Date:</Text>
          <Text style={styles.value}>
            {new Date(request.requestDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Approval Date:</Text>
          <Text style={styles.value}>
            {new Date(request.approvalDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{request.requestStatus}</Text>
        </View>
        <Text style={{ marginTop: 40, fontSize: 10, color: "gray" }}>
          Printed on: {new Date().toLocaleString()}
        </Text>
      </View>
    </Page>
  </Document>
);

const MyrequestsEmploy = () => {
  const { user } = useAuth();
  const axiosSquer = useAxiosSquer();
  const [searchText, setSearchTExt] = useState("");
  const [type, setType] = useState("");

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["myRequests", user?.email, searchText, type],
    queryFn: async () => {
      const res = await axiosSquer.get(
        `/requests?email=${user?.email}&type=${type}&search=${searchText}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Search and Filter section remains the same */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:mb-10 mt-20 flex flex-col md:flex-row gap-6 justify-between items-center mx-4 md:mx-14"
      >
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary/80">
          Approved Assets ({requests.length})
        </div>

        <div className="flex gap-4 px-4 border rounded-lg">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input-pro text-slate-700 bg-transparent border-none py-2 focus:ring-0"
          >
            <option className="bg-primary text-gray-900" value="">
              All Types
            </option>
            <option className="bg-primary text-gray-900" value="Non-returnable">
              Non-returnable
            </option>
            <option className="bg-primary hover:bg-secondary text-gray-900" value="Returnable">
              Returnable
            </option>
          </select>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTExt(e.target.search.value);
          }}
          className="relative"
        >
          <input
            placeholder="Search..."
            className="input-pro"
            name="search"
            type="text"
          />
          <div className="absolute top-2 right-3 text-primary">
            <Search />
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 md:mx-14 my-16 bg-white/5 shadow-xl rounded-2xl p-6"
      >
        <div className="flex justify-center items-center gap-2 mb-6">
          <Package className="text-primary" />
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/80">
            All My Approved Asset!
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Requested Date</th>
                <th>Approved Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id} className="glass-card rounded-xl">
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-3">
                    <img
                      className="w-14 h-14 rounded-2xl"
                      src={
                        request?.assetImage ||
                        "https://i.ibb.co.com/7tZ3tFXs/pexels-c-125803429-11829002.jpg"
                      }
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{request.assetName}</p>
                      <p className="text-xs opacity-60">
                        {request.companyName}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        request.assetType === "Returnable"
                          ? "badge-warning text-red-300"
                          : "badge-success"
                      }`}
                    >
                      {request.assetType}
                    </span>
                  </td>
                  <td className="text-sm">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </td>
                  <td className="text-sm">
                    {new Date(request.approvalDate).toLocaleDateString()}
                  </td>
                  <td
                    className={
                      request.requestStatus === "pending"
                        ? "text-secondary"
                        : "text-success"
                    }
                  >
                    {request.requestStatus}
                  </td>

                  <td className="flex items-center gap-2">
                    {/* --- PDF PRINT BUTTON --- */}
                    <PDFDownloadLink
                      document={<AssetPDF request={request} />}
                      fileName={`${request.assetName}_details.pdf`}
                    >
                      {({ loading }) => (
                        <button
                          className={`btn btn-xs btn-outline btn-primary ${
                            loading ? "loading" : ""
                          }`}
                          title="Download PDF"
                        >
                          <Printer size={14} />
                        </button>
                      )}
                    </PDFDownloadLink>

                    {request.assetType === "Returnable" && (
                      <button
                        title="Return"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You want to return this asset?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, return it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // Add your actual return logic here
                              Swal.fire("Returned!", "Success", "success");
                            }
                          });
                        }}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        <LogOut size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default MyrequestsEmploy;
