import axios from "axios"

export const apiGetProvinces = () => new Promise<string>(
    async (resolve, reject) => {
        try {
            const response: any = await axios.get('https://vapi.vnappmob.com/api/province/')
            resolve(response)
        } catch (error) {
            reject(error)
        }
    }
)

export const apiGetDistricts = (id: string | undefined) => new Promise<string>(
    async (resolve, reject) => {
        try {
            const response: any = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    }
)