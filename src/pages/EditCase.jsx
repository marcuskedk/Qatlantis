import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const api = {
    baseUrl: 'https://localhost:7141/',
    contentType: "application/json; charset=utf-8"
}

const EditCase = () => {

    const { caseId } = useParams();

    const [ cases, setCases ] = useState();

    useEffect(() => {
        fetch(api.baseUrl + "api/cases/" + caseId, {
            method: "GET",
            headers: {
                "content-type": api.contentType
            }
        }).then(response => response.json()).then((json) => setCases(json));
    });

    return (
        <div>EditCase</div>
    )
}

export default EditCase