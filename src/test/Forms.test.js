/*El test verifica que el componente Form actualice su estado correctamente cuando los
 inputs cambien y que las funciones de callback se llamen adecuadamente cuando se hace clic en el botón de submit*/

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from '../components/Forms';

describe('Form', () => {
  it('should update state and call callbacks when inputs change and submit button is clicked', () => {
    // Mock de las funciones de callback
    const onAmountChange = jest.fn();
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const onSubmit = jest.fn();

    // Renderizar el componente
    const { getByLabelText, getByText } = render(
      <Form
        onAmountChange={onAmountChange}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSubmit={onSubmit}
      />
    );

    // Simular cambios en los inputs
    fireEvent.change(getByLabelText('Cantidad'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Fecha Inicio'), { target: { value: '2024-01' } });
    fireEvent.change(getByLabelText('Fecha Fin'), { target: { value: '2024-02' } });

    // Verificar que las funciones de callback se llamen con los valores correctos
    expect(onAmountChange).toHaveBeenCalledWith('1000');
    expect(onStartDateChange).toHaveBeenCalledWith('2024-01');
    expect(onEndDateChange).toHaveBeenCalledWith('2024-02');

    // Simular clic en el botón de submit
    fireEvent.click(getByText('Calcular'));

    // Verificar que la función de callback de submit se haya llamado
    expect(onSubmit).toHaveBeenCalled();
  });
});
