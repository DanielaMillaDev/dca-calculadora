import React, { useState } from 'react';
import { Card, Row, Col, CardTitle, CardBody, Button, Form as FormStrap, FormGroup, Label, Input } from 'reactstrap';

interface FormProps {
  onAmountChange: (value: string) => void;
  onStartDateChange: (value: string) => void; // Cambiar a una función que maneje un cambio en la fecha
  onEndDateChange: (value: string) => void;
  onSubmit: () => void;
}

const Form : React.FC<FormProps> = ({ onAmountChange, onStartDateChange, onEndDateChange, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [finicio, setfInicio] = useState('');
  const [ffin, setfFin] = useState('');
 
  const handleStartDate = (e: { target: { value: any; }; }) => {
    const date = e.target.value;
 
    setfInicio(date);
    onStartDateChange(date); // Llamar a la función proporcionada desde el componente padre
  };

  const handleEndDate = (e: { target: { value: any; }; }) => {
    const date = e.target.value;
    setfFin(date);
    onEndDateChange(date); // Llamar a la función proporcionada desde el componente padre
  };

  const handleAmountChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setAmount(value);
    onAmountChange(value); // Llamar a la función proporcionada desde el componente padre
  };

  const handleClickSubmit = () => {
    // Llamar a la función proporcionada desde el componente padre para manejar el envío del formulario
    onSubmit();
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Filtros
          </CardTitle>
          <CardBody>
            <FormStrap>
              <FormGroup>
                <Label for="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  name="cantidad"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDateRange">Fecha Inicio</Label>
                <Input
                  id="exampleDateRange"
                  name="daterange"
                  type="month"
                  value={finicio}
                  onChange={handleStartDate}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleDateRange">Fecha Fin</Label>
                <Input
                  id="exampleDateRange"
                  name="daterange"
                  type="month"
                  value={ffin}
                  onChange={handleEndDate}
                />
              </FormGroup>
              <Button onClick={handleClickSubmit}>Calcular</Button>
            </FormStrap>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Form;
