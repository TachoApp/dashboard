import { TableComponent } from "../components/private/table"

const drivers = [
    { code: "DR001", name: "Juan Pérez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "1234567890", plate: "ABC123" },
    { code: "DR002", name: "María Rodríguez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "0987654321", plate: "XYZ456" },
    { code: "DR003", name: "Pedro Gómez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "5678901234", plate: "DEF789" },
    { code: "DR004", name: "Ana Torres", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "6789012345", plate: "GHI456" },
    { code: "DR005", name: "Carlos Sánchez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "3456789012", plate: "JKL789" },
    { code: "DR006", name: "Sofía Ramírez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "4567890123", plate: "MNO456" },
    { code: "DR007", name: "Luis Hernández", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "2345678901", plate: "PQR789" },
    { code: "DR008", name: "Fernanda López", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "7890123456", plate: "STU456" },
    { code: "DR009", name: "Diego Martínez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "8901234567", plate: "VWX789" },
    { code: "DR010", name: "Valeria García", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "9012345678", plate: "YZA456" },
    { code: "DR011", name: "Andrés Gutiérrez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "0123456789", plate: "BCD789" },
    { code: "DR012", name: "Laura Flores", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "3456789012", plate: "EFG456" },
    { code: "DR013", name: "Javier Rosales", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "4567890123", plate: "HIJ789" },
    { code: "DR014", name: "Camila Herrera", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "5678901234", plate: "KLM456" },
    { code: "DR015", name: "Ricardo Morales", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "6789012345", plate: "NOP789" },
  ];

const DriverPage = () => {
    const headers = ['Avatar', 'Código', 'Nombre', 'Número CI', 'Placa'];

    return (
        <div style={{width: '92vw', marginBottom: 25}}>
            <TableComponent headers={headers} data={drivers}/>
        </div>
    )
}

export default DriverPage