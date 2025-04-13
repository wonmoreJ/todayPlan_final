/*
	날짜포맷공통함수
	입력 : getDateFormat('yyyyMMdd')
	리턴 : 20250401 
*/
window.util = {
    getDateFormat : (formatStr, date) => {
        let year = "";
        let month = "";
        let day = "";
        
        if(!date){
            date = new Date();
        }
        
        if (typeof date === "string") {
          if(date.length > 9){
            year = date.slice(0, 4);
            month = date.slice(5, 7);
            day = date.slice(8, 10);
          }else{
            year = date.slice(0, 4);
            month = date.slice(4, 6);
            day = date.slice(6, 8);
          }
          
        } else {
          year = date.getFullYear().toString();
          month = (date.getMonth() + 1).toString().padStart(2, "0");
          day = date.getDate().toString().padStart(2, "0");
        }
      
        const formatMap = {
          "yyyyMMdd": year + month + day,
          "yyyy-MM-dd": `${year}-${month}-${day}`,
          "yyyy": year,
          "MM": month,
          "dd": day,
          "yyyy년MM월dd일": `${year}년${month}월${day}일`,
        };
      
        return formatMap[formatStr] || "";
      }
}
