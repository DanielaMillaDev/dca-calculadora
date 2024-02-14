import React from 'react';
import { render } from '@testing-library/react';
import DCAchart from '../components/DcaChart';

describe('DCAchart Component', () => {
  const historicalPerformance = [
    {
      date: 'enero de 2023',
      timestamp: '1672622364948',
      sumInversion: 100000,
      price: 14540000,
      inversion: 100000,
      portfolio: 101000,
      change: 100,
      percentage: 10,
    },
  ];

  it('renders the component with correct data', async () => {
    const { getByText } = render(<DCAchart  />);
    
    expect(getByText('DCA Calculadora')).toBeInTheDocument();

    // Verificar la existencia de datos simulados en el gráfico
    expect(getByText('Invertido')).toBeInTheDocument();
    expect(getByText('Portafolio')).toBeInTheDocument();

    // Asegurar que los datos simulados están representados en el gráfico
    expect(getByText('$6,000,000')).toBeInTheDocument(); // Ajustar según el formato esperado
    expect(getByText('$12,000,000')).toBeInTheDocument(); // Ajustar según el formato esperado
  });

  it('displays loading indicator while data is being fetched', () => {
    // Simular que el componente está en proceso de carga
    const { getByRole } = render(<DCAchart historicalPerformance={[]} />);
    
    // Verificar que el indicador de carga está presente
    expect(getByRole('status')).toBeInTheDocument();
  });
});
