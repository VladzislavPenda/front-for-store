import axios from 'axios'

// получаем данные при загрузке главной странице, параметров никаких нет
export const fetchCarsList = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopModels')
        var responseData = ""
        await axios.get('https://localhost:44320/api/shopModels').then(function (response) {
            console.log(data)
            console.log(response.data)
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers['x-pagination']);
            responseData = response.headers['x-pagination']
            console.log(response.config);
          });

        console.log(responseData)
        const res = JSON.parse(responseData)
        console.log(res['TotalPages'])
        const result = {data, responseData}
        return result;
    } catch (error) {
        alert(error)
    }
}

// пхд бесполезный метод, не нашел где он применяется
export const fetchParams = async (param) => {
    try {
        console.log(param)
        const { data } = await axios.get(`https://localhost:44320/api/${param}`)
        
        return data;
    } catch (error) {
        alert(error)
    }
}

// получаем данные о машинке по id
export const fetchCar = async (id) => {
    try {
        const { data } = await axios.get(`https://localhost:44320/api/shopModels/${id}`)
        return data;
    } catch (error) {
        alert(error)
    }
}

// берем похожие по каркасу машины для отрисовки их в разделе "похожие авто"
export const fetchSameCars = async (carcase) => {
    try {
        const { data } = await axios.get(`https://localhost:44320/api/shopModels?carcaseType=${carcase}&pageSize=5`)
        return data;
    } catch (error) {
        alert(error)
    }
}

// запрос с параметрами из фильтра
export const fetchCarsListWithParam = async (params) => {
    let url = new URL('https://localhost:44320/api/shopModels');
    Object.keys(params).forEach((el) => {
        url.searchParams.set(el, params[el]);
    })
    console.log(url)
    try {
        const { data } = await axios.get(url)
        let head
        
        const header = await axios.get(url).then(function (response) {
            head = response.headers
          });
          console.log(head['x-pagination']) 
          const responseData = head['x-pagination']
         const result = {data, responseData}
        return result;
    } catch (error) {
        alert(error)
    }
}

// подгрузка всех кузовов, которые существуют в бд
export const fetchCarcaseTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopCarcaseType')
        return data;
    } catch (error) {
        alert(error)
    }
}

export const fetchTransmissionTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopTransmissionType')
        return data;
    } catch (error) {
        alert(error)
    }
}

// подгрузка всех марок, которые существуют в бд
export const fetchMarks = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopMark')
        return data;
    } catch (error) {
        alert(error)
    }
}

// подгрузка всех движков, которые существуют в бд
export const fetchEngineTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopEngineType')
        return data;
    } catch (error) {
        alert(error)
    }
}

// подгрузка всех приводов, которые существуют в бд
export const fetchDriveTypes = async () => {
    try {
        const { data } = await axios.get('https://localhost:44320/api/shopDriveType')
        return data;
    } catch (error) {
        alert(error)
    }
}

// отправка запроса на регистрацию
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

// отправка запроса на логин
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

// отправка запроса на редактирование записей бд
export const sendUpdateInf = async (updateInf, modifyingTable, id) => {
    try {
        console.log(updateInf)
        const data = await axios.put(`https://localhost:44320/api/${modifyingTable}/${id}`, updateInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

export const AddModel = async (updateInf, modifyingTable, id) => {
    try {
        console.log(updateInf)
        const body = {
            "model": updateInf.model,
            "year": updateInf.year,
            "horsePower": updateInf.horsePower,
            "price" : updateInf.price,
            "mileAge" : updateInf.mileAge,
            "phoneNumber": updateInf.phoneNumber,
            "description": updateInf.description,
            "pathToPicture": updateInf.pathToPicture
        }
        const data = await axios.post(`https://localhost:44320/api/${modifyingTable}/ShopMark/${updateInf.markName}/ShopEngine/${updateInf.engineType}/ShopCarcaseType/${updateInf.carcaseType}/ShopDriveType/${updateInf.driveType}/ShopTransmission/${updateInf.transmissionType}/models`, body)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

// отправка запроса на удаление из бд записи
export const deleteInf = async (modifyingTable, id) => {
    try {
        const data = await axios.delete(`https://localhost:44320/api/${modifyingTable}/${id}`)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}

// запрос на добавление записи в бд
export const addInf = async (newInf, modifyingTable) => {
    try {
        const data = await axios.post(`https://localhost:44320/api/${modifyingTable}`, newInf)
        return data
    } catch (error) {

        alert(Object.keys(error.response.data).reduce((acc, el) => {
            return acc + error.response.data[el][0] + '\n'
        }, ''))

    }
}
