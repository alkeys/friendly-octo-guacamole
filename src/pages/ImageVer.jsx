import { useState} from 'react';
import axios from "axios";

function ImageVer() {
    const [imageSrc, setImageSrc] = useState('');

    const auth = {
        username: 'admin',
        password: '1234'
    }

    axios.get('http://127.0.0.1:5984/xd/070e3eab03781798e79c5a0af400a0ae', {//base de datos selecionada con la cosa de la url del id
        auth: auth
    })
        .then(response => setImageSrc(response.data.image))
        .catch(error => console.error(error))


    return (
        <div>

            <img src={imageSrc} alt="imagen"/>
        </div>
    );
}

export default ImageVer;