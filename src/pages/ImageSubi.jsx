import { useState } from 'react';
import axios from 'axios';

function ImageSubir() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            //cosas de los usuirio xd
            const username = 'admin';
            const password = '1234';

            const auth = {
                username,
                password
            };

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();

            image.src = URL.createObjectURL(selectedImage);

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                const base64 = canvas.toDataURL('image/png');

                axios.post('http://localhost:5984/xd', { image: base64 }, {  //url de la base de datos papus
                    auth,//la utenticacion papus xd
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log('Imagen subida exitosamente:', response.data);
                    })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
            };
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    return (
        <div className={"flex flex-col"} >
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Subir imagen</button>




        </div>



    );
}

export default ImageSubir;