import { QRCodeCanvas } from "qrcode.react"
import { useState, useRef } from "react";
import check from '/check.svg'

export default function QrCode() {

    const [descargado, setDescargando] = useState(false);

    // OBTENER EL QR DEL DOM

    const qrRef = useRef();

    // OBTENER LA URL

    const url = window.location.href;

    // DESCARGAR CODIGO QR

    const handleDescargar = () => {

        setDescargando(true)

        const canvas = qrRef.current.querySelector('canvas');

        const enlace = document.createElement('a');

        enlace.href = canvas.toDataURL('image/jpg');

        enlace.download = 'Codigo QR';

        enlace.click();
    };

    return (
        <div className="qr card">

            <h3>Guarda tu boleto</h3>

            <div ref={qrRef}>

                <QRCodeCanvas

                    value={url}
                    size={250}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                />

            </div>

            {!descargado ? <button className="btn" onClick={handleDescargar}>Descargar</button>

                : <button onClick={handleDescargar} className="btn descargado">

                    Descargado <img width="20" height="20" src={check} /></button>}
        </div>
    )
}
