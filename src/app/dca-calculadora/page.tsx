'use client'
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import DCAchart from '../../components/DcaChart';
import Form from '../../components/Forms';
import DcaTable from '../../components/DcaTable';
import TopCards from '../../components/TopCards';

const formatValueCLP = (value: number | bigint) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value);
};

const calculateDCAHistoricalPerformance = async (startDate: string | number | Date, endDate: number, inversion: number) => {
  let sumInversion = 0;
  let amount = 0;
  const dates = [];
  const currentDate = new Date(startDate);
  currentDate.setDate(1);

  while (currentDate.getTime() <= endDate) {
    const fetchData = { date: currentDate.getTime() };
    try {
      const response = await getCryptoData(fetchData.date);
      if (response?.trades?.entries) {
        const EntrieTrades = response.trades.entries;
        sumInversion += inversion;
        amount += inversion / EntrieTrades[0][2];
        dates.push({
          date: new Date(currentDate.getTime()).toLocaleString('es-ES', { month: 'long', year: 'numeric' }),
          timestamp: EntrieTrades[0][0],
          sumInversion,
          price: EntrieTrades[0][2],
          inversion,
          portfolio: amount * EntrieTrades[0][2], // Cambia 'portfolio' a 'portafolio'
          change: (amount * EntrieTrades[0][2]) - sumInversion,
          percentage: ((amount * EntrieTrades[0][2]) - sumInversion) / sumInversion * 100,
        });
        
      }
    } catch (error) {
      console.error('Error en fetch de fechas:', currentDate, error);
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
};

async function getCryptoData(date: number) {
  // URL base de la API de Buda.com
  const apiUrl = 'https://www.buda.com/api/v2/markets/BTC-CLP/trades';

  // Realizar solicitudes a la API de Buda.com para obtener los precios históricos de transacciones
  const response = await fetch(`${apiUrl}?timestamp=${date}&limit=1`);
  const data = await response.json();

  return data;
}

const Home = () => {
  const [historicalPerformance, setHistoricalPerformance] = useState<{ date: string; timestamp: any; sumInversion: number; price: any; inversion: number; portfolio: number; change: number; percentage: number; }[]>([]);
  const [amountCLP, setAmountCLP] = useState(100000); 
  const [startDate, setStartDate] = useState<string | null>(null); 
  const [endDate, setEndDate] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar si se está cargando

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      setIsLoading(true); 
      const startDateUnix = new Date(startDate! + 'T12:00:00Z').getTime();
      const endDateUnix = new Date(endDate! + 'T12:00:00Z').getTime();
      if (startDate && endDate) {
        const performance = await calculateDCAHistoricalPerformance(startDateUnix, endDateUnix, amountCLP);
        setHistoricalPerformance(performance);
      }
    } catch (error) {
      console.error('Error al calcular el rendimiento histórico:', error);
    } finally {
      setIsLoading(false); // Ocultar indicador de carga al finalizar el proceso
    }
  };

  const sumInversion = historicalPerformance && historicalPerformance.length > 0 ? historicalPerformance[historicalPerformance.length - 1].sumInversion : 0;
  const portfolio = historicalPerformance && historicalPerformance.length > 0 ? historicalPerformance[historicalPerformance.length - 1].portfolio : 0;
  
  const handleAmountChange = (value: string) => {
    setAmountCLP(parseFloat(value));
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };

  return (
    <div>
      <Row>
        <h1 className='text-center'>
          DCA Crypto Calculadora 
        </h1>
      </Row>
      <Row className='justify-content-center'>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            subtitle="Dinero invertido"
            earning={formatValueCLP(sumInversion)}
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            subtitle="Valor Portafolio"
            earning={formatValueCLP(portfolio)}
            icon="bi bi-coin"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" lg="5" xl="4" xxl="3">
          <Form 
            onAmountChange={handleAmountChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onSubmit={handleSubmit} 
          />
        </Col>
        <Col sm="12" lg="5" xl="8" xxl="9">
          {/* Mostrar indicador de carga mientras se procesa el formulario */}
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          ) : (
            <DCAchart historicalPerformance={historicalPerformance} />
          )}
        </Col>
      </Row>
      <Row>
        <Col lg="12" sm="12">
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          ) : (
            <DcaTable historicalPerformance={historicalPerformance} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Home;
