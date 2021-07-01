// window.onload = function() {
//     // alert("Página caregada!");
//     // var element = document.getElementById("hora");
//     // console.log(element);
//     // element.innerText = "Batata";

//     document.getElementById("formcep").addEventListener("submit", function(ev){
//         ev.preventDefault();
//         var cep = document.getElementById("cep").value;
        
//         fetch("https://viacep.com.br/ws/"+cep+"/json/")
//         .then(response => response.json())
//         .then (data =>{
//             console.log(data);
//             var cidade = document.getElementById("cidade");
//             cidade.innerText = data.localidade;
            
//         })
//         .catch(error => {
//             console.error(error);
//         });
        
//     })
// }


// $(document).ready(()=>{
//     console.log('pronto 1');
// });

$(function(){
    $('#formcep').on('submit', (ev)=> {
        ev.preventDefault();
        var cep = $('#cep').val();
        $.ajax({
            url: "https://viacep.com.br/ws/"+cep+"/json/",
            success: function(data){
                console.log(data);
                $('#cidade').html(data.localidade);
                $('#uf').html(data.uf);
                $('#bairro').html(data.bairro);
                $('#rua').html(data.logradouro);
            },
            error: function(response, textStatus, errorThrown){
                alert('Problema na Requisição');
                console.error(response, textStatus, errorThrown);
            }

        });
    });

});

