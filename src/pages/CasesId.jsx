import React from 'react'
import { useParams } from 'react-router-dom'

const CasesId = () => {

    const { id } = useParams();

    console.log(id)

    return (
        <div>CasesId</div>
    )
}

export default CasesId