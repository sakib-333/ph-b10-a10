import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { handleDeleteCampaign } from "../utilities/handleDeleteCampaign";
import LoadingComponent from "../components/LoadingComponent";
import { Typewriter } from "react-simple-typewriter";

const MyCampaignPage = () => {
  const { user, isLoading, setIsLoading } = useContext(AuthContext);
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ph-b10-a10-server.vercel.app/myCampaign/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(() => false);
        setMyCampaigns(data);
      })
      .catch(() => toast.error("Something went wrong!"));
  }, []);

  useEffect(() => {
    document.title = "Crowdcube | My Campaign";
  }, []);

  return isLoading ? (
    <LoadingComponent />
  ) : myCampaigns.length ? (
    <div className="bg-white overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="bg-purple-500 font-bold text-white">
            <th>#</th>
            <th>Thumbnail</th>
            <th>Campaign title</th>
            <th>Campaign type</th>
            <th>Deadline</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {myCampaigns.map((campaign, indx) => (
            <tr key={campaign._id}>
              <th>{indx + 1}</th>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={campaign?.imageURL} alt="Thumbnail" />
                  </div>
                </div>
              </td>
              <td>{campaign?.campaignTitle}</td>
              <td>{campaign?.campaignType}</td>
              <td>{campaign?.deadline}</td>
              <th className="flex gap-2">
                <Link
                  to={`/updateCampaign/${campaign._id}`}
                  className="btn btn-warning btn-xs"
                >
                  Update
                </Link>
                <button
                  className="btn  btn-error btn-xs"
                  onClick={() =>
                    handleDeleteCampaign(campaign?._id, setMyCampaigns)
                  }
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h1 className="text-xl font-bold text-primary">
      <Typewriter
        words={["If you add any campaign, will appear here."]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
  );
};

export default MyCampaignPage;
