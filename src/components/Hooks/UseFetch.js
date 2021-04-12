import {  useEffect, useState } from "react"
import { userData } from "../../App"

// eslint-disable-next-line
const UseFetch = (url) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

       useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: { authorization: userData.token}
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Colud not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
       }, [url])

    return { data, loading, error }

}

export default UseFetch;