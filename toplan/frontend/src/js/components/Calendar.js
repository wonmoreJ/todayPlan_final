export default function Calendar ({ $app, initialState, todayDt, addPlanBtn}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "calendar-table";
    this.addPlanBtn = addPlanBtn;

    $app.appendChild(this.$target);

    this.template = () => {
        let calendar = this.state.calendar;
        let temp = `<table>`;
        calendar.forEach((cal) => {
            temp += `
                    <tr id="${cal.dt}" tabindex="0" data-day="${cal.enWeek}">
                        <td class="plan-list-cell">
                            <button id="btn_${cal.dt}" class="add-plan-btn" data-strt=${cal.dt}>
                                <span class="date">${cal.dt}</span>
                                <span class="day">(${cal.week})</span>
                            </button>
                        </td>
                    <tr>    
            `
        });
        temp += `</table>`
        return temp;
    }
    
    this.render = () => {
        this.$target.innerHTML = this.template();
        this.$target.addEventListener('click', (e) => {
            if(e.target.closest('.add-plan-btn')){
                const dt = e.target.closest('.add-plan-btn').dataset.strt;
                document.getElementById('customMdStrtDt').value = dt;
                document.getElementById('customModalOverlay').classList.add('show');
            }
        });
        document.getElementById(todayDt).focus(); //오늘날짜로 이동
        document.getElementById(todayDt).setAttribute("data-today","true");
        
    };

    this.render();
}

