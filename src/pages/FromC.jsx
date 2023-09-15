import { useState } from 'react';
import axios from 'axios';

const FromC = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Configurar los parámetros de autenticación
            const username = 'admin';
            const password = '1234';
            const auth = {
                username,
                password
            };

            // Realizar la petición POST a la base de datos CouchDB con la autenticación básica
            const response = await axios.post('http://127.0.0.1:5984/xd', {
                nombre,
                apellido
            }, {
                auth
            });

            console.log(response.data); // Manejar la respuesta de la base de datos

            // Limpiar los campos del formulario después de enviar los datos
            setNombre('');
            setApellido('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <br />
            <label>
                Apellido:
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </label>
            <br />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default FromC;