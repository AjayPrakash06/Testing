import React, { useEffect, useState , useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {useDispatch , useSelector} from "react-redux"
import { scann } from "../../store/scanSlice";

function Scanner(props) {
  let html5QrCode;
  const [toggleVisibility, setToggleVisibility] = useState(true);

  const ref = useRef({
    html5QrCode:null
  })
  
  const dispatch = useDispatch()
  const selector = useSelector(state => state.scan.batchRecord)
  
 
 
 

  useEffect(() => {
  
    // html5QrCode = new Html5Qrcode("reader", {
        
    //     // Use this flag to turn on the feature.
    //     experimentalFeatures: {
    //       useBarCodeDetectorIfSupported: true,
    //     },
    //   });

    ref.current.html5QrCode = new Html5Qrcode("reader", {
        
        // Use this flag to turn on the feature.
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
    
 
  
  });

//   console.log(ref.current.html5QrCode )
//   console.log(html5QrCode)
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

        dispatch(scann.batchScan(decodedResult))
        console.log(decodedText)
      handleStop();
    };
    try {
        console.log("1")
        ref.current.html5QrCode 
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
    try {
       console.log("!")
       ref.current.html5QrCode 
        .stop()
        .then((res) => {
       
            ref.current.html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {

        console.log("!" , html5QrCode )
       
        ref.current.html5QrCode.clear();
        
       
      console.log(err.message)
    }
  };
  return (
    <>
      <>
      <div    style={{ position: "relative" }}>
        <div className="mx-auto" style={{ height: "50%", width: "50%" }}>
          <div id="reader" width="100%" />
        </div>
        <div  className="mx-auto flex space-x-6"  style={{ width: "10%" , marginTop: "5px" }}>
         
            <button
              onClick={() => {handleClickAdvanced()  }}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
             Batch Scanning
            </button>
         
            <button
              onClick={() => {handleStop() }}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Stop Scanning
            </button>
       
        </div>
      </div>
    </>
     
    </>
  );
}

export default Scanner;
