let creatediv = document.querySelector(".create_div");
let createbtn = document.querySelector(".create_btn");
createbtn.addEventListener("click", ()=> {
	creatediv.classList.toggle("hide");
	if(createbtn.style.top == "0") {
		createbtn.innerText = "close";
	}else{
		createbtn.innerText = "Create Project";
	}
})
// form logic
let form = document.querySelector("form");
let displaydiv = document.querySelector(".projects_div");

form.addEventListener("submit", (data)=> {
	data.preventDefault();
	let name  = data.target.name.value;
	let sdate = data.target.sdate.value;
	let fdate = data.target.fdate.value;
	let plink = data.target.plink.value;

	// console.log(name, sdate, fdate, plink);

	let projectData = JSON.parse(localStorage.getItem("projectDetails")) ?? [];
	projectData.push({
		'projectName':name,
		'startingDate':sdate,
		'finishDate':fdate,
		'projectLink': plink
	});
	// console.log(projectData);
	localStorage.setItem("projectDetails",JSON.stringify(projectData));
	displayData();
})

let displayData=()=> {
		let finaldata = '';
	let projectData = JSON.parse(localStorage.getItem("projectDetails")) ?? [];
	projectData.forEach((element,i)=>{
		finaldata+=`
		<div class="project_box">
		<span class="del_project" onclick="removebox(${i})">&#10006;</span>
		<h3 class="project_title">${element.projectName}</h3>
		<br>
		<br>
		<b>Project Start: </b><span class="ending_date">${element.startingDate}</span>
		<br>
		<br>
		<b>Project End: </b><span class="ending_date">${element.finishDate}</span>
		<br>
		<br>
		<b>Github: </b><a href="${element.projectLink}">${element.projectLink}</a>
	</div>
		`
	displaydiv.innerHTML = finaldata;
	});
}

function removebox(index) {
	let projectData = JSON.parse(localStorage.getItem("projectDetails")) ?? [];
	projectData.splice(index,1);
	localStorage.setItem("projectDetails",JSON.stringify(projectData));
	displayData();
}
displayData();