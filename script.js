var currentDate=new Date();
const currentYear=currentDate.getFullYear();
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let okd=0;
let okm=0;
let oky=0;

const inputDays=document.querySelector("#input-days");
const inputMonths=document.querySelector("#input-months");
const inputYears=document.querySelector("#input-years");
const button=document.querySelector("button");

const outputDays=document.querySelector("#ouput-days");
const outputMonths=document.querySelector("#ouput-months");
const outputYears=document.querySelector("#ouput-years");

const init = () => {
    outputDays.innerHTML='- -';
    outputMonths.innerHTML="- -";
    outputYears.innerHTML="- -";
}
const calc = () =>{
    if(okd+okm+oky==3){        
        currentDate= new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth()+1;
        let year = currentDate.getFullYear();

        let daysInp=inputDays.firstChild.value;  
        let monthsInp=inputMonths.firstChild.value;  
        let yearsInp=inputYears.firstChild.value; 

        if(daysInp > day){
            day+=daysInMonth[month-1];
            month-=1;
        }
        if(monthsInp > month){
            month+=12;
            year-=1;
        }

        const d = day - daysInp;
        const m = month - monthsInp;
        const y = year - yearsInp;

        return [y,m,d];
    }
        else{
            init();
            return [-1,-1,-1];
        }
}   
const display = () => {
    const [years,months,days]=calc();
    if(years*months*days>=0){
        outputDays.innerHTML=days;
        outputMonths.innerHTML=months;
        outputYears.innerHTML=years;
    }
}

const emptyError = (e) => {
    if (e.target.value === "") {
        e.target.parentNode.classList.add("error", "emptyError");
        return 0;
    }
    else{
        e.target.parentNode.classList.remove("error", "emptyError");
        return 1;
    }
}
const dayError = (e) => {
    if (e.target.value !== "" && (e.target.value < 1 || e.target.value > 31)) {
        e.target.parentNode.classList.add( "dayError", 'error');
        return 0;
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "dayError");
            return 1;
        }
    }
}
const monthError = (e) => {
    if (e.target.value !== "" && (e.target.value < 1 || e.target.value > 12)) {
        e.target.parentNode.classList.add( "monthError", 'error');
        return 0;
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "monthError");
            return 1;
        }
    }
}
const yearError = (e) => {
    if (e.target.value !== "" && e.target.value > currentYear) {
        e.target.parentNode.classList.add("error", "yearError");
        return 0;
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "yearError");
            return 1;
        }
    }
}
const dateError = (e,m) => {
    if (e.target.value > daysInMonth[m.firstChild.value-1]){
        e.target.parentNode.classList.add("error", "dateError");
        return 0;
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false && e.target.parentNode.classList.contains("dayError")===false){
            e.target.parentNode.classList.remove("error", "dateError");
            return 1;
        }
        
    }
}
inputDays.addEventListener("input",function(e){
    okd= emptyError(e) * dayError(e) * dateError(e,inputMonths);

})
inputMonths.addEventListener("input",function(e){
    okm= emptyError(e) * monthError(e);
})
inputYears.addEventListener("input",function(e){
    emptyError(e);
    yearError(e);
})

button.addEventListener("click",display);
