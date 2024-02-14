import React from "react";
import { Container } from "reactstrap";

const FullLayout = ({ children }) => {
  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        <div className="contentArea">
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
