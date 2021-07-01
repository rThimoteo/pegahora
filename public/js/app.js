window.onload = function() {
    // alert("Página caregada!");
    // var element = document.getElementById("hora");
    // console.log(element);
    // element.innerText = "Batata";

    document.getElementById("formcep").addEventListener("submit", function(ev){
        ev.preventDefault();
        var cep = document.getElementById("cep").value;
        
        fetch("https://viacep.com.br/ws/"+cep+"/json/")
        .then(response => response.json())
        .then (data =>{
            console.log(data);
            var cidade = document.getElementById("cidade");
            cidade.innerText = data.localidade;
            
        })
        .catch(error => {
            console.error(error);
        });
        
    })
}



