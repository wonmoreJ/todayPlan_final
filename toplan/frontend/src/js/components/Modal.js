export function setPlanModalInfo(planInfoData) {
    Object.keys(planInfoData).forEach((key) => {
        const el = document.getElementById('modal_'+key);
        if(el){
            if(el.tagName === 'DIV'){
                el.textContent = planInfoData[key];
            }else{
                el.value = planInfoData[key];
            }
        }
    });
    document.querySelector('.modal_').classList.add('show');
};

export function setModalInfoBtn(){
    //닫기(X)버튼
    document.getElementById('modal_close_icon').addEventListener('click', () => {
        document.querySelector('.modal_').classList.remove('show');
    });
    //닫기버튼
    document.getElementById("modal_close_btn").addEventListener("click", () => {
        document.querySelector('.modal_').classList.remove('show');
    });
    // 배경 클릭 시 모달 닫기
    document.querySelector(".modal_").addEventListener("click", function (e) {
        const popup = document.querySelector(".modal_popup_");

        // 클릭한 대상이 팝업 내부가 아니면 (=배경 클릭)
        if (!popup.contains(e.target)) {
            document.querySelector('.modal_').classList.remove('show');
        }
    });
    //상세조회에서 esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && document.querySelector(".modal_").classList.contains("show")) {
            document.querySelector(".modal_").classList.remove("show");
        }
    });
}

export function setModalAddBtn(){
    document.getElementById('customModalCloseBtn').addEventListener('click', () => {
        const modal = document.getElementById('customModalOverlay');
        modal.classList.remove('show');
    });
    
    document.getElementById('customModalCloseBtn2').addEventListener('click', () => {
        const modal = document.getElementById('customModalOverlay');
        modal.classList.remove('show');
    });
    document.querySelector(".custom-modal-overlay").addEventListener("click", function (e) {
        const popup = document.querySelector(".custom-modal-container");

        // 클릭한 대상이 팝업 내부가 아니면 (=배경 클릭)
        if (!popup.contains(e.target)) {
            document.querySelector(".custom-modal-overlay").classList.remove('show');
        }
    });
    //상세조회에서 esc
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && document.querySelector(".custom-modal-overlay").classList.contains("show")) {
            document.querySelector(".custom-modal-overlay").classList.remove("show");
        }
    });
}