import React from "react";
import { Container } from "reactstrap";
import "../../../styles/style.scss";

const FullLayout = ({children}: { children: React.ReactNode;} ) => {
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
