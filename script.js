var currentDate=new Date();
const currentYear=currentDate.getFullYear();
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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


var daysb4process=0;
var monthsb4process=0;
var yearsb4process=0;

const calc=()=>{
    currentDate= new Date();
    daysb4process=inputDays.firstChild.value;
    monthsb4process=inputMonths.firstChild.value;
    yearsb4process=inputYears.firstChild.value;
    pastDate= new Date();
    pastDate.setFullYear(yearsb4process);
    pastDate.setMonth(monthsb4process);
    pastDate.setDate(daysb4process);
    const timeDiff=currentDate-pastDate;
    console.log([daysb4process,monthsb4process,yearsb4process]);
    const msid = 1000 * 60 * 60 * 24;
    const msim=msid*30.44;
    const msiy=msid*365;
    const years=Math.floor(timeDiff/msiy);
    const months=Math.floor(timeDiff/msim);
    const days=Math.floor(timeDiff/msid);
    return [years,months,days];
}

const display = () => {
    console.log(calc());
    // const [years,months,days]=calc();
    // outputDays.innerHTML=days;
    // outputMonths.innerHTML=months;
    // outputYears.innerHTML=years;
}

const emptyError = (e) => {
    if (e.target.value === "") {
        // e.target.parentNode.classList.remove("error", "emptyError", "dayError", "monthError", "yearError", "dateError");
        e.target.parentNode.classList.add("error", "emptyError");
    }
    else{
        e.target.parentNode.classList.remove("error", "emptyError");
    }
}
const dayError = (e) => {
    if (e.target.value !== "" && (e.target.value < 1 || e.target.value > 31)) {
        e.target.parentNode.classList.add( "dayError", 'error');
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "dayError");
        }
    }
}
const monthError = (e) => {
    if (e.target.value !== "" && (e.target.value < 1 || e.target.value > 12)) {
        e.target.parentNode.classList.add( "monthError", 'error');
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "monthError");
        }
    }
}
const yearError = (e) => {
    if (e.target.value !== "" && e.target.value > currentYear) {
        e.target.parentNode.classList.add("error", "yearError");
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "yearError");
        }
    }
}
const dateError = (e,m) => {
    if (e.target.value > daysInMonth[m.firstChild.value-1]){
        e.target.parentNode.classList.add("error", "dateError");
    }
    else{
        if (e.target.parentNode.classList.contains("emptyError")===false){
            e.target.parentNode.classList.remove("error", "dateError");
        }
        
    }
}
inputDays.addEventListener("input",function(e){
    daysb4process=e.target.value;
    emptyError(e);
    dayError(e);
    dateError(e,inputMonths);

})
inputMonths.addEventListener("input",function(e){
    monthsb4process=e.target.value;
    emptyError(e);
    monthError(e);
    // if (monthsb4process == "") {
    //     outputMonths.innerHTML="- -";
    // }
})
inputYears.addEventListener("input",function(e){
    emptyError(e);
    yearError(e);
})

button.addEventListener("click",display);
