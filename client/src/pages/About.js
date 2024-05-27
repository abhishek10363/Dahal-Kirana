import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/About.css"; // Import CSS file for About page styling

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="about-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="about"
              className="about-image"
            />
          </div>
          <div className="col-md-6">
            <div className="about-content">
              <h2>About Us</h2>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus officiis obcaecati esse tempore unde ratione, eveniet
                mollitia, perferendis eius temporibus dicta blanditiis
                doloremque explicabo quasi sunt vero optio cum aperiam vel
                consectetur! Laborum enim accusantium atque, excepturi sapiente
                amet! Tenetur ducimus aut commodi illum quidem neque tempora
                nam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
