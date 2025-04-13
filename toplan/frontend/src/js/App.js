import { deletePlan, getCalendar, getPlan, getPlanInfo, insertplan } from './components/api.js';
import Calendar from './components/Calendar.js';
import Plan from './components/Plan.js';
export default function App($app){
    this.state = {
        userId:'',
        calendar:'',
        plan:'',
    };
    
    //달력조회
    const renderCalendar = () => {
        new Calendar({
            $app,
            initialState: this.state,
            todayDt: window.util.getDateFormat('yyyy-MM-dd'),
            addPlanBtn: (btnId) => {
                console.log('플랜추가 >> ' + btnId);
            }
        });
    }

    //플랜조회
    const renderPlan = () => {
        new Plan({
            $app,
            initialState: this.state,
            planInfo: async (planId) => {
                const planInfo = await getPlanInfo(planId,this.state.userId);
                return planInfo;
            },
            planDelete : async (boardId) => {
                const result = await deletePlan(boardId); //삭제
                if(result){
                    const newPlan = await getPlan(this.state.userId);
                    return {result : result, newPlan: newPlan};
                }
            },
            planInsert : async () => {
                const data = {
                    userId : this.state.userId,
                    title : document.getElementById('customMdTitle').value,
                    content : document.getElementById('customMdContent').value,
                    dt : document.getElementById('customMdStrtDt').value
                }
                const result = await insertplan(data);
                if(result){
                    const newPlan = await getPlan(this.state.userId);
                    return {result : result, newPlan: newPlan};
                }
            },
            chkCheck : (chkData) => {
                console.log(chkData);
            }
        });
    }

    this.setState = (newState) => {
        this.state = newState;
        render();
    };

    const render = () => {
        $app.innerHTML = '';

        if(this.state.calendar){
            renderCalendar();
        };
        if(this.state.plan){
            renderPlan();
        }
    };

    const init = async () => {
        sessionStorage.setItem("userId", "원몽");
        const userId = sessionStorage.getItem("userId");

        const calendarData = await getCalendar();
        const planData = await getPlan(userId);
        this.setState({
            ...this.state,
            userId: userId,
            calendar: calendarData,
            plan: planData,
        });
    }

    init();
}
