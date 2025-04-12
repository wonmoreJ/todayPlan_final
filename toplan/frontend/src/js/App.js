import { getCalendar, getPlan, getPlanInfo } from './components/api.js';
import Calendar from './components/Calendar.js';
import Plan from './components/Plan.js';
export default function App($app){
    
    this.state = {
        calendar: "",
        plan:""    
    }
    
    const renderCalendar = async () => {
        try {
            const todayDt  = "2025-04-11";
            const calendar = await getCalendar();
            new Calendar({
                $app
                , initialState : calendar
                , todayDt
                , addPlanBtn: (btnId) => {
                    console.log('플랜추가 >> ' + btnId);
                }
                });
        } catch (error) {
            console.error("달력조회에러", error);
        }        
    }
    
    const renderPlan = async () => {
        try{
            const userId = "원몽";      
            const plan = await getPlan(userId);

            this.setState({
                ...this.state,
                plan:plan
            });

            new Plan({
                $app,
                initialState: this.state,
                planInfo: async ({planId,userId}) => {
                    const planInfo = await getPlanInfo(planId,userId);
                    return planInfo;
                }
            });
        }catch(e){

        }
    }

    this.setState = (newState) => {
        this.state = newState;
        //render();
    }

    const render = async () => {
        $app.innerHTML = ""; //화면초기화
        await renderCalendar();
        await renderPlan();
    }
    
    const init = async () => {
        render();
    }

    init();
}
