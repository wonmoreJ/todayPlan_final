const $URL = "http://localhost:8080/api";
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

//달력조회
export const getCalendar = async () => {
    return await request(`${$URL}/cal`);
};

//플랜전체조회
export const getPlan = async (userId) => {
    return await request(`${$URL}/plan?userId=${userId}`)
}

//플랜상세조회
export const getPlanInfo = async(planId,userId) => {
    return await request(`${$URL}/planInfo?userId=${userId}&planId=${planId}`);
}

//플랜삭제
export const deletePlan = async(planId) => {
    return await request(`${$URL}/deleteplan/${planId}`,{method:'DELETE'});
}