import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";
import useTitle from "../../../customhook/useTitle/useTitle";
import EmptyReview from "../EmptyReview/EmptyReview";
import ReviewTable from "../ReviewTable/ReviewTable";

const MyReviews = () => {
  useTitle("My-Reviews");
  const { user, loading, logOut } = useContext(AuthContext);
  const [myreviews, setMyreviews] = useState([]);

  useEffect(() => {
    fetch(`https://server-green-five.vercel.app/review?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => {
        if (loading) {
          return (
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
          );
        }
        setMyreviews(data);
      });
  }, [user?.email, loading, logOut]);
  return (
    <div>
      {myreviews.length > 0 ? (
        <>
          <div className="  lg:w-full p-40  ">
            <table className="table   lg:w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <ol>
                        <li></li>
                      </ol>
                    </label>
                  </th>
                  <th>Service Name</th>
                  <th>Review</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myreviews.map((myreview) => (
                  <ReviewTable
                    key={myreview._id}
                    myreview={myreview}
                  ></ReviewTable>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <EmptyReview></EmptyReview>
        </>
      )}
    </div>
  );
};

export default MyReviews;
