import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Timeline from "components/Timeline";
import React, { useEffect } from "react";

const DashBoard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div id="dashboard-page" className="dashboard-wrapper">
      <Header />
      <div className="dashboard-main">
        <div className="container">
          <div className="dashboard-main--inner">
            <Timeline />
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
