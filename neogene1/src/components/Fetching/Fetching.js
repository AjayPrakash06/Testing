import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {subjectt} from "../../store/subjectSlice"
import axios from "axios";

function Fetching() {
    const [error, setError] = useState("")
    const [ subject , setSubject] = useState([])

    const selector = useSelector(state => state.scan.batchRecord)
    const dispatch = useDispatch()
    //  console.log(selector)
    if(selector.length>0 && subject.length == 0 )
    {
        console.log("Fetching",selector[0].decodedText)

        axios
        .get(
            `http://localhost:8000/patient/${selector[0].decodedText}`
        )

        .then(function (response) {
            // I need this data here ^^
            console.log(response);
            return (setSubject([response.data.data]),
            dispatch(subjectt.subjectFetch(response.data.data))
            )
        })
        .catch(function (error) {
            console.log("React", error);
        });

    }
console.log(subject.length)

   
        // ${props.decodedText[0].decodedText}

        
    // console.log(props.testing[0].data.Subject.FullName)

    return (
        <>





         { subject.length >0   ? <>
                <div class="flex flex-col mt-12">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full border text-center">
                                    <thead class="border-b">
                                        {console.log(subject.map((details)=>details.Subject.FullName))}
                                        <tr>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                                            >
                                                Full Name
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                                            >
                                                Country
                                            </th>
                                        </tr>
                                    </thead>

                                    {subject.map((details , i) => (
                      <tbody key={i}>
                        <tr class="border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {details.Subject.FullName}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {details.Subject.Country}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>:null}

        </>
    );
}

export default Fetching;
