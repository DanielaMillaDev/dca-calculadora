import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

// Función para convertir un timestamp Unix a una fecha legible
const unixTimestampToReadable = (timestamp: string | number | Date)=> {
  // Crear un nuevo objeto Date con el timestamp dado
  const date = new Date(timestamp);

  // Obtener los componentes de la fecha
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
  const year = date.getFullYear();

  // Formatear la fecha en un formato legible
  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
}

function formatearMontoCLP(monto: number | bigint) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(monto);
}


const DcaTable = ({ historicalPerformance }: { historicalPerformance: any[] }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Detalle Bitcoin DCA</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Variación en CLP y % de la inversión
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Bitcoin Precio</th>
                <th>Monto Invertido</th>
                <th>Valor Portafolio</th>
                <th>Cambio %</th>
              </tr>
            </thead>
            <tbody>
              {historicalPerformance && historicalPerformance.map((tdata, index: number) => (
                <tr key={index} className="border-top">
                  <td>{index + 1}</td>
                  <td>{unixTimestampToReadable(parseInt(tdata.timestamp))}</td>
                  <td>{formatearMontoCLP(tdata.price)}</td>
                  <td>{formatearMontoCLP(tdata.sumInversion)}</td>
                  <td>{formatearMontoCLP(tdata.portfolio)}</td>
                  <td>{Math.round(tdata.percentage)}%</td>
                </tr>
              ))}
              {!historicalPerformance && (
                <tr>
                  <td colSpan={6} className="text-center">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default DcaTable;
