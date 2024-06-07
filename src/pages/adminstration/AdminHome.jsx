import React from "react";
import AdminSidebar from "./AdminSidebar";
import StatisticsBox from "./home/StatisticsBox";
import BarGraphe from "./home/BarGraphe";
import ComposedChart from "./home/ComposedGraphe";
import PieChartComponent from "./home/PieGraphe";
import { useSelector } from "react-redux";
import PerLocation from "./home/PerLocation";
import CarRatingChart from "./home/TopRatedCar";
import { Helmet, HelmetProvider } from "react-helmet-async";

function AdminHome() {
  const { user } = useSelector((state) => state.auth);
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {user.role === 1 ? "Admin Espace" : "Manager Espace"} - Home
        </title>
      </Helmet>
      <div className="admin-home">
        <div className="row flex-nowrap">
          <AdminSidebar />
          <div className="col py-2">
            <div className=" left ">
              <div className="row pe-2">
                <div className="col-lg-8  col-md-12">
                  <StatisticsBox user={user} />
                  <div className="row p-1">
                    <div className="box-white  px-3 py-2">
                      <ComposedChart token={user.token} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 p-1 ">
                  {user.role === 1 ? (
                    <BarGraphe token={user.token} />
                  ) : (
                    <CarRatingChart token={user.token} />
                  )}
                  <PieChartComponent token={user.token} />
                </div>
              </div>
              {user.role === 1 && (
                <div className="row px-2 ">
                  <div className="col-md-4 p-1">
                    <CarRatingChart token={user.token} />
                  </div>
                  <div className="col-md-8 p-1">
                    <PerLocation token={user.token} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default AdminHome;
