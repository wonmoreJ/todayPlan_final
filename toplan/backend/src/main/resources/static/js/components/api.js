const $URL = "/api";
const request = async (url, options) => {
    try {
        const response = await fetch(url, {
            headers : {
                'Content-Type': 'application/json',
            },
            ...options
        });
        if(!response.ok) throw new Error(`통신오류 status : ${response.status}`);
        return  await response.json();
    } catch (e) {
        console.error("API 요청에러!", e);
        throw e
    }
}

export const getCalendar = async () => {
    return await request(`${$URL}/cal`);
};

export const getPaln = async (userId) => {
    return await request(`${$URL}/plan?userId=${userId}`)
}