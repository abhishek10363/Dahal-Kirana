import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/Policy.css"; // Import CSS file for Policy page styling

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="policy-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              className="policy-image"
            />
          </div>
          <div className="col-md-6">
            <div className="policy-content">
              <h2>Privacy Policy</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget libero eu nulla ultricies auctor eu eget mi. Donec
                ullamcorper, magna sed ultrices dapibus, elit enim finibus
                tortor, nec sagittis mauris arcu a neque.
              </p>
              <p>
                Nulla euismod aliquet aliquam. Duis id dictum tortor. Sed
                dapibus elit non nunc finibus dictum.
              </p>
              <p>
                Fusce porttitor ultricies nunc, sed varius orci suscipit
                vitae. Ut sit amet arcu nec odio convallis tincidunt vel sit
                amet libero.
              </p>
              {/* Add more paragraphs as needed */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
