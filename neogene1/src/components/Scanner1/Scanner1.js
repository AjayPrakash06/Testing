import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useSelector, useDispatch } from "react-redux"
import { scann } from "../../store/scanSlice";


function Scanner1({ validate, sethtml5QrCode, html5QrCode }) {


    const [toggleVisibility, setToggleVisibility] = useState(true);
    const selector = useSelector(state => state.scan.batchRecord)
    console.log(toggleVisibility)
    const dispatch = useDispatch()
    useEffect(() => {
        sethtml5QrCode(new Html5Qrcode("reader", {
            // Use this flag to turn on the feature.
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true,
            },
        }))
        console.log(html5QrCode)

    }, []);

    let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
        let minEdgePercentage = 0.7; // 70%


        let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);

        return {
            width: qrboxSize,
            height: qrboxSize,
        };
    };


    const handleClickAdvanced = () => {


        const qrCodeSuccessCallback = (decodedText, decodedResult) => {

            console.log(decodedResult)
            setToggleVisibility((data) => !data)

            handleStop();
            validate(decodedText)

            dispatch(scann.coiScan(decodedText))





        };
        try {

            html5QrCode
                .start(
                    { facingMode: "environment" },
                    {
                        fps: 30,
                        qrbox: qrboxFunction,
                    },
                    qrCodeSuccessCallback
                )
                .catch((err) => console.log("Error4", err));
        } catch (err) {
            console.log(err);
        }
    };


    const handleStop = () => {

        console.log(html5QrCode)
        try {

            console.log("!")
            html5QrCode
                .stop()
                .then((res) => {

                    html5QrCode.clear();
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log("!")
            html5QrCode.clear();
            console.log(err)
        }
    };
    return (
        <>
            <>
                <div style={{ position: "relative" }}>
                    <div className="mx-auto" style={{ height: "50%", width: "50%" }}>
                        <div id="reader" width="100%" />
                    </div>
                    <div className="mx-auto flex space-x-6" style={{ width: "10%", marginTop: "5px" }}>
                        {toggleVisibility ? <button
                            onClick={() => { handleClickAdvanced(); setToggleVisibility(!toggleVisibility) }}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                           COI Scanning
                        </button> : <button
                            onClick={() => { handleStop(); setToggleVisibility(!toggleVisibility) }}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Stop Scanning
                        </button>
                        }




                    </div>
                </div>
            </>

        </>
    );
}

export default Scanner1;
