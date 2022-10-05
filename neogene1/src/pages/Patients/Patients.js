import React, { useState } from 'react'
import Scanner from "../../components/Scanner/Scanner"
import Scanner1 from '../../components/Scanner1/Scanner1';
import { useSelector, useDispatch } from "react-redux"
import Fetching from '../../components/Fetching/Fetching';
import { scann } from "../../store/scanSlice"

function Patients() {
    const [dataValidate, setValidate] = useState(null)
    const [toggleVisibility, setToggleVisibility] = useState(true);
    const [html5QrCode , sethtml5QrCode]=useState({})
    console.log(toggleVisibility)
    const visibility = () => {
        setToggleVisibility(!toggleVisibility)

    }
    console.log("Patient" ,html5QrCode )


    const selector = useSelector(state => state.scan)
    console.log(selector)
    const subject = useSelector(state => state.subject)
    console.log(subject)
    // console.log(subject.subject[0].DIN)
    console.log(subject.subject.length)
    const validate = (data) => {
        console.log(data)
        console.log(data == subject.subject[0].DIN)

        if (subject.subject.length > 0) {
            
            var data1 = (data == subject.subject[0].DIN)
            console.log(data1)
            setValidate(data1)
        }

    }
    console.log(dataValidate)




    return (
        <div >
            <Scanner visibility={visibility} ></Scanner>
            <Scanner1 sethtml5QrCode={sethtml5QrCode} html5QrCode={html5QrCode } validate={validate} ></Scanner1>
            <Fetching></Fetching>

            {dataValidate ?
            <>Validated</>: dataValidate==false ?
            <>Invalid</>:null

           
           
           }





        </div>
    )
}

export default Patients