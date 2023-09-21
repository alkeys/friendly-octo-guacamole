




import { useEffect, useState } from 'react';
import axios from 'axios';

const ImageVer = () => {
    const [dataObject, setDataObject] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const auth = {
            username: 'admin',
            password: 'couchdbtripv',
        };

        const urlbasexd="http://20.81.225.207:5984/sitio/";
        const fetchData = async () => {
            try {
                // Realiza una solicitud GET a _all_docs para obtener todos los documentos
                const response = await axios.get(urlbasexd+'_all_docs', {
                    auth: auth,
                });

                // Extrae los IDs de los documentos
                const documentIds = response.data.rows.map((row) => row.id);

                // Inicializa un objeto para almacenar los datos de todos los documentos
                const data = {};

                // Recorre los documentos para obtener todos los datos
                for (const documentId of documentIds) {
                    const documentResponse = await axios.get(
                        `${urlbasexd}/${documentId}`,
                        {
                            auth: auth,
                        }
                    );

                    // Agrega los datos del documento al objeto utilizando el ID como clave
                    data[documentId] = documentResponse.data;
                }

                // Establece el objeto de datos en el estado
                setDataObject(data);
            } catch (error) {
                setError('Error al obtener los datos de los documentos: ' + error.message);
            }
        };
 console.log(dataObject)
        fetchData();
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <pre>{JSON.stringify(dataObject, null, 2)}</pre>
            )}
        </div>
    );
};

export default ImageVer;
