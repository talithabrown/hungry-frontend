import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

const PrivateRoute = ({ children }) => {

        let jwtAccess = localStorage.getItem('jwtAccess')
        let jwtRefresh = localStorage.getItem('jwtRefresh')

        const verifyJwt = async ( jwtAccess ) => {

            const res = await fetch('https://hungry-backend-api.herokuapp.com/auth/jwt/verify/', 
            {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({'token': jwtAccess })
            })

            const response = await res
            return response.status
        }

        const refreshJwt = async ( jwtRefresh ) => {
            const res = await fetch('https://hungry-backend-api.herokuapp.com/auth/jwt/refresh/', 
            {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': jwtRefresh })
            })

            const data = await res.json()
            if (data.access) {
                return data.access
            }
            else {
                return false
            }
        }

        const checkLogin = async () => {

            let jwtIsValid = false

            if (jwtAccess) {
                let jwtAccessStatus = await verifyJwt(jwtAccess)

                if (jwtAccessStatus === 401) {
                    let jwtRefreshRes = await refreshJwt(jwtRefresh)

                    if (jwtRefreshRes !== false) {
                        localStorage.setItem('jwtAccess', jwtRefreshRes)
                        jwtIsValid = true
                        return jwtIsValid
                    }
                    else {
                        localStorage.clear()
                        jwtIsValid = false
                        return jwtIsValid
                    }
                }
                else if (jwtAccessStatus === 200) {
                    jwtIsValid = true
                    return jwtIsValid
                }
            }
            else {
                jwtIsValid = false
                return jwtIsValid
            }

        }

        ///////////////////////////

        const [validToken, setValidToken] = useState([])

        useEffect(() => {
            const getValidToken = async () => {
                const isValidToken = await checkLogin()
                setValidToken(isValidToken)
            }
    
            getValidToken()
        }, [])

        //////////////////////////


        return (validToken ? children : <Navigate to="/login" />)
        //return jwt ? children : <Navigate to="/login" />
}

export default PrivateRoute