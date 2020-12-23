var count = 0;
var oldUserName = "";
const setTableButton = document.querySelector("#setTable");
eventListeners();

function eventListeners() { // T�m event listenerlar

    setTableButton.addEventListener("click", setTable2);

}
$( document ).ready(function() {
   
    console.log( "ready!" );
});

function setTable2(e){
    if($("#userName").val() != ""){
        if(oldUserName != $("#userName").val()){
            var list = document.getElementsByTagName("tr");
            for(var k= 1; k< list.length; k++){
                list[k].remove();
            }
        }



        var path = './' + $("#userName").val() + '.json';
        fetch(path).then(results => results.json()).then(function(data) {
        console.log(data);
        if(count == 0){
            count++;

            for(var i = 0; i< data.Tasks.length; i++){
                let tTaskId=document.createElement("td");
                let tTaskName=document.createElement("td");
                let tIsCompleted=document.createElement("td");
                let tEndDate=document.createElement("td");
        
                tTaskId.textContent = data.Tasks[i].TaskId;
                tTaskName.textContent = data.Tasks[i].TaskName;
                tIsCompleted.textContent = data.Tasks[i].IsCompleted;
                tEndDate.textContent = data.Tasks[i].EndDate;
        
        
                //tr elementi oluşturuyoruz
                let tr=document.createElement("tr");

                //tdleri tr içine ekliyoruz
                tr.appendChild(tTaskId);
                tr.appendChild(tTaskName);
                tr.appendChild(tIsCompleted);
                tr.appendChild(tEndDate);
        
                    //tr elementini liste (tablo) içine ekliyoruz
            Tasks.appendChild(tr);
            }
            oldUserName = $("#userName").val();
        }
    
    })
    }
    else{
        alert("Lütfen kullanıcı seçiniz.");
    }
}