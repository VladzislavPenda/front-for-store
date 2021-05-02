import axios from 'axios'

export const fetchCarsList = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopModels')
        const header = await axios.get('https://localhost:44320/api/shopModels').then(function (response) {
            
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers['x-pagination']);
            console.log(response.config);
          });
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchParams = async (param) => {
    try {
        console.log(param)
        const { data } = await axios.get(`https://localhost:44320/api/${param}`)
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchCar = async (id) => {
    try {
        const { data } = await axios.get(`https://localhost:44320/api/shopModels/${id}`)
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchSameCars = async (carcase) => {
    try {
        const { data } = await axios.get(`https://localhost:44320/api/shopModels?carcaseType=${carcase}&pageSize=5`)
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchCarsListWithParam = async (params) => {
    let url = new URL('https://localhost:44320/api/shopModels');
    Object.keys(params).forEach((el) => {
        url.searchParams.set(el, params[el]);
    })
    
    try {
        const { data } = await axios.get(url)
        let head
        const header = await axios.get(url).then(function (response) {
            head = response.headers
          });
          console.log(head['x-pagination'])  
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchCarcaseTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopCarcaseType')
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchMarks = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopMark')
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchEngineTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopEngineType')
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchDriveTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopDriveType')
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

export const sendUpdateInf = async (updateInf) => {
    try {
        const data = await axios.post("https://localhost:44320/api/", updateInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}
