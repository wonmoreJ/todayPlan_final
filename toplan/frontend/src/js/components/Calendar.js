export default function Calendar ({ $app, initialState, todayDt, addPlanBtn}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "calendar-table";
    this.addPlanBtn = addPlanBtn;

    $app.appendChild(this.$target);

    console.log(this.state);

    this.template = () => {
        let calendar = this.state;
        let temp = `<table>`;

        calendar.forEach((cal) => {
            temp += `
                    <tr id="${cal.dt}" tabindex="0">
                        <td>
                            <button id="btn_${cal.dt}" class="add-plan-btn">${cal.fullDate}</button>
                        </td>
                    <tr>    
            `
        });
        temp += `</table>`
        return temp;
    }
    
    this.render = () => {
        this.$target.innerHTML = this.template();
        document.getElementById(todayDt).focus();
        document.querySelectorAll('.add-plan-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                let id = e.target.id.split('_')[1]; 
                

                    
                
                
                addPlanBtn(id);
                
            });
        })
    };

    this.render();
}

