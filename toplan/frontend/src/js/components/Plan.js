import { setPlanModalInfo, setModalInfoBtn, setModalAddBtn } from './Modal.js';

export default function Plan ({$app, initialState, planInfo, planDelete, planInsert, chkCheck}) {
    this.state = initialState.plan;
    this.planInfo = planInfo;
    this.planDelete = planDelete;
    this.planInsert = planInsert;
    this.chkCheck = chkCheck;
    this.eventBound = false;
    this.template = () => {
        let plan = this.state;
        console.log(plan);
        plan.forEach((data) => {
            //table
            const tr = document.getElementById(`${data.strtDt}`);
            const td = document.createElement("td");
            td.className = "plan-td";

            //title
            const title_div = document.createElement("div");
            title_div.id = `${data.planId}`;
            title_div.className = "plan-div";
            title_div.textContent = `${data.title}`;

            //checkBox
            const chk_div = document.createElement("div");
            chk_div.className = "chk-wrapper";
            const chk = document.createElement("input");
            chk.type = "checkbox";
            chk.id = `chk_${data.planId}`;
            chk.checked = false;
            if(data.commitChk==='Y'){
                chk.checked = true;
            }
            chk.className = "plan-checkbox";
            chk.addEventListener("change", (e)=>{
                const planDiv = document.getElementById(`${data.planId}`);
                if (e.target.checked) {
                    planDiv.style.textDecoration = "line-through";
                    planDiv.style.opacity = "0.5";
                } else {
                    planDiv.style.textDecoration = "none";
                    planDiv.style.opacity = "1";
                }
                this.chkCheck({check: e.target.checked, planId: `${data.planId}`});
            });
            chk_div.appendChild(chk);

            td.appendChild(title_div);
            td.appendChild(chk_div);
            tr.appendChild(td);
        });

        let temp = ``;
        if(!document.querySelector('.modal_')){
            //조회 모달창 추가
           temp += `
            <div class="modal_">
                <div class="modal_popup_">
                    <div class="modal_header_">
                        <h2>플랜</h2>
                        <button type="button" class="modal_close_icon_" id="modal_close_icon">
                            ×
                        </button>
                    </div>
                    <div class="modal_body_">
                        <div class="modal_section_">
                            <div class="modal_label_group_">
                                <span class="modal_icon_">📅</span>
                                <span class="modal_label_text_">날짜</span>
                            </div>
                            <div class="modal_value_" id="modal_dt"></div>
                        </div>

                        <div class="modal_section_">
                            <div class="modal_label_group_">
                                <span class="modal_icon_">📝</span>
                                <span class="modal_label_text_">제목</span>
                            </div>
                            <div class="modal_value_" id="modal_title"></div>
                        </div>

                        <div class="modal_section_">
                            <div class="modal_label_group_">
                                <span class="modal_icon_">💬</span>
                                <span class="modal_label_text_">내용</span>
                            </div>
                            <div class="modal_value_" id="modal_content"></div>
                        </div>

                        <!-- 숨겨진 input들 -->
                        <input type="text" id="modal_boardId" hidden />
                        <input type="text" id="modal_year" hidden />
                        <input type="text" id="modal_month" hidden />
                        <input type="text" id="modal_day" hidden />
                        <input type="text" id="modal_backColor" hidden />
                        <input type="text" id="modal_commitChk" hidden />
                        <input type="text" id="modal_strtDt" hidden />
                        <input type="text" id="modal_endDt" hidden />
                        <input type="text" id="modal_userId" hidden />
                    </div>
                    <div class="modal_footer_">
                        <button type="button" id="modal_delete_btn" class="delete_btn">
                            삭제
                        </button>
                        <button type="button" id="modal_close_btn" class="close_btn">
                            닫기
                        </button>
                    </div>
                </div>
            </div>
            `;
        }
        
        if(!document.querySelector('.custom-modal-overlay')){    
            //plan추가 모달창
            temp += `
                    <div id="customModalOverlay" class="custom-modal-overlay">
                        <div class="custom-modal-container">
                            <!-- 헤더 -->
                            <div class="custom-modal-header">
                                <h2>📝 계획 추가</h2>
                                <button class="custom-modal-close" id="customModalCloseBtn">❌</button>
                            </div>

                            <!-- 바디 -->
                            <div class="custom-modal-body">
                                <label for="customMdTitle">📌 제목</label>
                                <input type="text" id="customMdTitle" placeholder="예: 운동, 공부, 회의 등" />

                                <label for="customMdContent">💬 내용</label>
                                <input type="text" id="customMdContent" placeholder="자세한 계획을 입력하세요" />

                                <input type="text" id="customMdStrtDt" class="custom-hidden" />
                            </div>

                            <!-- 푸터 -->
                            <div class="custom-modal-footer">
                                <button class="custom-btn custom-btn-cancel" id="customModalCloseBtn2">🙈 닫기</button>
                                <button class="custom-btn custom-btn-add" id="customModalAddPlan">✅ 추가</button>
                            </div>
                        </div>
                    </div>
                    `;
            $app.insertAdjacentHTML('beforeend', temp);  
        }
    }

    this.render = () => {
        this.template();
        document.querySelectorAll('.plan-div').forEach((planDiv) => {
            planDiv.addEventListener('click', async (e) => {
                
                let id = e.target.id;
                const planInfoData = await this.planInfo(id);
                setPlanModalInfo(planInfoData); //modal 모듈
            });
        });
        
        if(!this.eventBound){
            setModalAddBtn(); //modal 모듈.이벤트세팅
            setModalInfoBtn(); //modal 모듈.이벤트세팅

            //삭제버튼
            document.getElementById('modal_delete_btn').addEventListener('click', async () => {
                let boardId = document.getElementById('modal_boardId').value;
                const result = await this.planDelete(boardId);  
                if(result.result){
                    document.querySelector('.modal_').classList.remove('show');
                    //삭제후 TD만 초기화
                    document.querySelectorAll(".plan-td").forEach(td => {
                        td.remove()
                    });

                    this.setState(result.newPlan);
                }
            });
            
            //추가버튼 insertplan
            document.getElementById('customModalAddPlan').addEventListener('click', async () => {
                const result = await this.planInsert();
                if(result.result){
                    document.getElementById('customModalOverlay').classList.remove('show');
                    //삭제후 TD만 초기화
                    document.querySelectorAll(".plan-td").forEach(td => {
                        td.remove()
                    });
                    document.getElementById('customMdTitle').value = '';
                    document.getElementById('customMdContent').value = '';
                    document.getElementById('customMdStrtDt').value = '';
                    this.setState(result.newPlan);
                }
            });

            this.eventBound = true;
        }

        
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }

    this.render();
}