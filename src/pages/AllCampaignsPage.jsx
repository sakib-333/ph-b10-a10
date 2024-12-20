import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import LoadingComponent from "../components/LoadingComponent";
import { FaSortAmountUpAlt } from "react-icons/fa";

const AllCampaignsPage = () => {
  const { isLoading, setIsLoading } = useContext(AuthContext);
  const [allCampaigns, setAllCampaigns] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ph-b10-a10-server.vercel.app/allCampaign")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(() => false);
        setAllCampaigns(data);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  }, []);

  useEffect(() => {
    document.title = "Crowdcube | All Campaigns";
  }, []);

  const handleSortCampaigns = () => {
    setIsLoading(true);
    fetch("https://ph-b10-a10-server.vercel.app/sort-campaigns")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(() => false);
        setAllCampaigns(() => data);
      })
      .catch(() => toast.error("Something went wrong."));
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <>
      <button
        className="btn bg-white text-primary border-0 mb-4"
        onClick={handleSortCampaigns}
      >
        <FaSortAmountUpAlt />
        <span>Sort by Donation</span>
      </button>
      <div className="bg-white overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-purple-500 font-bold text-white">
              <th>#</th>
              <th>Thumbnail</th>
              <th>Campaign title</th>
              <th>Campaign type</th>
              <th>Deadline</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {allCampaigns.map((campaign, indx) => (
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
                <th>
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    See More
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllCampaignsPage;
