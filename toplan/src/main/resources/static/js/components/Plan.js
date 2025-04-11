export default function Plan ({$app, initialState, planInfo}) {
    this.state = initialState;
    this.planInfo = planInfo;

    this.template = () => {
        let plan = this.state;
        console.log(plan);
        plan.forEach((data) => {
            const tr = document.getElementById(`${data.strtDt}`);
            const td = document.createElement("td");
            const div = document.createElement("div");

            div.id = `${data.planId}`
            div.className = "plan-div";

            div.textContent = `${data.title}`;
            td.appendChild(div);
            tr.appendChild(td);
        });
    }

    this.render = () => {
        this.template();
        document.querySelectorAll('.plan-div').forEach((planDiv) => {
            planDiv.addEventListener('click', (e) => {
                let id = e.target.id;
                planInfo(id);
            })
        })
    }

    this.render();
}