import p1 from "./picture1.png";
import p3 from "./picture2.png";
//import './App.css';
import VariantTable from "./VariantTable";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <h1 className="pt-5 py-4 text-center">
          Human SVA Retrotransposon Catalog
        </h1>

        <div className="row py-5">
          <div className="col">
            <div className="d-flex justify-content-evenly flex-wrap">
              <img
                src={p1}
                className="frontpage-img1 d-inline-block"
                alt="p1"
              />
              <img
                src={p3}
                className="frontpage-img2 d-inline-block"
                alt="p2"
              />
            </div>
          </div>
        </div>

        <VariantTable />

        
      </div>
      <div className="container-fluid bg-light mt-2 py-4 text-center">
          <div className="mb-1">If you have any questions or suggestions please contact us:</div>
          <div>
            <strong>Simon Chong Chu:</strong> chong.simon.chu at gmail.com <br />
            <strong>Peter J Park:</strong> peter_park at hms.harvard.edu
          </div>
        </div>
    </React.Fragment>
  );
}

export default App;
