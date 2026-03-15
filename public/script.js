function useSample(){

const sample = `Sales: Hi thanks for joining the call.

Customer: I like the product but the price seems high.

Sales: We offer discounts for yearly plans.

Customer: Sounds good. Let's schedule a demo next week.`;

document.getElementById("transcript").value = sample;

}

async function analyzeCall(){

const transcript = document.getElementById("transcript").value;

const loading = document.getElementById("loading");
const result = document.getElementById("result");

if(!transcript){
alert("Please paste a transcript first");
return;
}

loading.style.display = "block";
result.innerText = "";

try{

const res = await fetch("/analyze",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({transcript})
});

const data = await res.json();

loading.style.display="none";

result.innerText=data.result;

}catch(error){

loading.style.display="none";
result.innerText="Error analyzing transcript";

}

}