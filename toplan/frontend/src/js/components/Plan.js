export default function Plan ({$app, initialState, planInfo}) {
    this.state = initialState;
    this.planInfo = planInfo;

    this.template = () => {
        let plan = this.state.plan;
        console.log(plan);
        plan.forEach((data) => {
            const tr = document.getElementById(`${data.strtDt}`);
            const td = document.createElement("td");
            const div = document.createElement("div");

            div.id = `${data.planId}`;
            div.className = "plan-div";
            div.dataset.userId = `${data.userId}`;
            
            div.textContent = `${data.title}`;
            td.appendChild(div);
            tr.appendChild(td);
        });

        //조회 모달창 추가
        let temp = `
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
        $app.insertAdjacentHTML('beforeend', temp);  
    }

    this.render = () => {
        this.template();
        document.querySelectorAll('.plan-div').forEach((planDiv) => {
            planDiv.addEventListener('click', async (e) => {
                
                let id = e.target.id;
                let userId = e.target.dataset.userId;
                const planInfoData = await planInfo({planId:id, userId:userId});
                
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
            });
        });

        //닫기버튼
        document.getElementById('modal_close_icon').addEventListener('click', () => {
            document.querySelector('.modal_').classList.remove('show');
        });

        document.getElementById("modal_close_btn").addEventListener("click", () => {
            document.querySelector('.modal_').classList.remove('show');
        });

    }

    this.render();
}