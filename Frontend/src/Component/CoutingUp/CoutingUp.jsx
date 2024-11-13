import React from "react";
import CountUp from "react-countup";

const CoutingUp = () => {
  return (
    <>
      <div className="counterUp bg-black">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="text-center">
                <h1 className="greenheading">
                  <CountUp start={1} end={1000} duration={5} /> +
                </h1>
              </div>
              <h2>Happy Clients</h2>
            </div>
            <div className="col-md-4 col-12">
              <div className="text-center">
                <h1 className="greenheading">
                  <CountUp start={1} end={180} duration={5} /> +
                </h1>
              </div>
              <h2>Restaurant Chain</h2>
            </div>
            <div className="col-md-4 col-12">
              <div className="text-center">
                <h1 className="greenheading">
                  <CountUp start={1} end={3000} duration={5} /> +
                </h1>
              </div>
              <h2>Stores</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoutingUp;
