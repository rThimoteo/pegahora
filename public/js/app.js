//Funções em JQuery
$(function(){
    $('#formcep').on('submit', (ev)=> {
        ev.preventDefault();
        var cep = $('#cep').val();
        $.ajax({
            url: "https://viacep.com.br/ws/"+cep+"/json/",
            success: function(data){
                $('#cep').val('');
                $('#cep').blur();
                $('#dados-cep').append([
                    '<label id="lb-cep">CEP: </label>',
                    '<span class="resp" id="cep-resp">',data.cep,'</span>',
                    '<br>',
                    '<label id="lb-estado">Estado: </label>',
                    '<span class="resp" id="uf">',data.uf,'</span>',
                    '<br>',
                    '<label  id="lb-cidade">Cidade: </label>',
                    '<span class="resp" id="cidade">',data.localidade,'</span>',
                    '<br>',
                    '<label id="lb-bairro">Bairro: </label>',
                    '<span class="resp" id="bairro">',data.bairro,'</span>',
                    '<br>',
                    '<label id="lb-rua">Logradouro: </label>',
                    '<span class="resp" id="rua">',data.logradouro,'</span>'
                ].join(''));
            },
            error: function(response, textStatus, errorThrown){
                alert('Problema na Requisição');
                console.error(response, textStatus, errorThrown);
            }
        });
    });
    
    const usersApiEndpoint = 'https://jsonplaceholder.typicode.com/users';
    
    const loadingDataRow = [
        '<tr id="loading">',
            '<td colspan="6" class="text-center">Carregando...</td>',
        '<tr>'
    ];
    $.ajax({
        url: usersApiEndpoint,
        beforeSend: function() {
            $('#users-table').find('tbody').append(loadingDataRow.join(''));
        },
        complete: function() {
            $('#loading').remove();
        },
        success: function(data) {
            $.each(data, function(index, userApi) {
                $('#users-table').find('tbody').append([
                    '<tr>', 
                        '<td>',userApi.id,'</td>', 
                        '<td>',userApi.name,'</td>', 
                        '<td>',userApi.username,'</td>', 
                        '<td>',userApi.email,'</td>', 
                        '<td>',userApi.phone,'</td>', 
                        '<td>',userApi.website,'</td>',
                    '</tr>'
                ].join(''))
            });
        },
        error: function(error) {
        }
    }); 
    $('#cep').on('focusin', (ev) => {
        $('#lb-estado').remove();
        $('#lb-cidade').remove();
        $('#lb-bairro').remove();
        $('#lb-rua').remove();
        $('#cidade').remove();
        $('#uf').remove();
        $('#bairro').remove();
        $('#rua').remove();
        $('#lb-cep').remove();
        $('#cep-resp').remove();
    });
});

