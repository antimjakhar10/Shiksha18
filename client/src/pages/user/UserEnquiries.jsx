import { useEffect, useState } from "react";

function UserEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoading(false);
      return;
    }

    const userId = user.id || user._id;

    fetch(`https://shiksha18.onrender.com/api/enquiries/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Enquiries:", data);
        setEnquiries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Enquiries</h2>

      {enquiries.length === 0 ? (
        <p>No enquiries found</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-[600px] w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">College</th>
                <th className="p-3">Course</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((e) => (
                <tr key={e._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{e.college}</td>

                  <td className="p-3">{e.course}</td>

                  <td className="p-3 text-sm text-gray-400">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Submitted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserEnquiries;
