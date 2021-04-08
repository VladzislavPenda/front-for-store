import axios from 'axios'

export const fetchCarsList = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopModels')
        return data;
    } catch (error) {
        alert(error)
    }
}


export const sendRegInf = async (regInf) => {
    try {
        const data = await axios.post("https://localhost:44320/api/authentication", regInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

export const sendLogInf = async (logInf) => {
    try {
        const data = await axios.post("https://localhost:44320/api/authentication/login", logInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}