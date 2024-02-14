import React from 'react';
import { render } from '@testing-library/react';
import DcaTable from '../components/DcaTable'; // Asegúrate de que la ruta sea correcta según la ubicación de tu componente
import '@testing-library/jest-dom/extend-expect';

describe('DcaTable Component', () => {
  const historicalPerformance = [
    {
      timestamp: 1641004800000,
      price: 6000000,
      sumInversion: 10000000,
      portfolio: 12000000,
      percentage: 20,
    },
  ];

  it('renders the component with correct data', () => {
    const { getByText } = render(<DcaTable historicalPerformance={historicalPerformance} />);
    
    // Verificar que los elementos de la tabla se renderizan correctamente
    expect(getByText('Detalle Bitcoin DCA')).toBeInTheDocument();
    expect(getByText('Variación en CLP y % de la inversión')).toBeInTheDocument();
    expect(getByText('N°')).toBeInTheDocument();
    expect(getByText('Fecha')).toBeInTheDocument();
    expect(getByText('Bitcoin Precio')).toBeInTheDocument();
    expect(getByText('Monto Invertido')).toBeInTheDocument();
    expect(getByText('Valor Portafolio')).toBeInTheDocument();
    expect(getByText('Cambio %')).toBeInTheDocument();

    // Verificar que los datos históricos se renderizan correctamente
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('31/12/2021')).toBeInTheDocument(); // Ajusta la fecha según el formato esperado
    expect(getByText('$6,000,000')).toBeInTheDocument(); // Ajusta el formato del precio según lo esperado
    expect(getByText('$10,000,000')).toBeInTheDocument(); // Ajusta el formato de la inversión según lo esperado
    expect(getByText('$12,000,000')).toBeInTheDocument(); // Ajusta el formato del portafolio según lo esperado
    expect(getByText('20%')).toBeInTheDocument(); // Ajusta el formato del porcentaje según lo esperado
  });

  it('displays "No hay datos disponibles" when historicalPerformance is empty', () => {
    const { getByText } = render(<DcaTable historicalPerformance={[]} />);
    
    expect(getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  it('displays "No hay datos disponibles" when historicalPerformance is null', () => {
    const { getByText } = render(<DcaTable historicalPerformance={null} />);
    
    expect(getByText('No hay datos disponibles')).toBeInTheDocument();
  });
});
