import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../navigation/nav";
import Loading from "../ui/loading";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaderboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        setLeaderboardData(response.data.leaderboard);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="text-white h-screen w-screen">
      <Navigation />  
      <div className="h-[calc(100%-110px)] w-full flex flex-col items-center">
        <h1 className="text-[50px] font-bold py-5 text-center mt-10">
          Leaderboard
        </h1>
        <div className="flex w-full max-w-7xl justify-between  flex-col	gap-10 " >
          {["easy", "medium", "hard"].map((difficulty) => {
            const categoryData = leaderboardData[difficulty];

            return (
              <div
                key={difficulty}
                className="flex-1 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-lg shadow-2xl p-5"
              >
                <h2 className="text-[30px] font-bold capitalize mb-3 text-center">
                  {difficulty}
                </h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-w-[400px] text-left text-white mx-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Rank</th>
                        <th className="px-4 py-2 w-[35%]">Name</th>
                        <th className="px-4 py-2">Score</th>
                        <th className="px-4 py-2">Retries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData && categoryData.length > 0 ? (
                        categoryData.map((player, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                            }`}
                          >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 ">{player.name}</td>
                            <td className="px-4 py-2">{player.score}</td>
                            <td className="px-4 py-2">{player.retakeCount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-4 py-2 text-center text-gray-400"
                          >
                            No data available for {difficulty} category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
