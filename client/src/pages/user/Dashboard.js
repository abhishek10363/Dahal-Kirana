import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Profile from "./Profile";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Dahal-Kirana"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3 ">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <Profile/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
