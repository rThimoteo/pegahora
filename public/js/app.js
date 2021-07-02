//Funções em JQuery
$(function(){
    $('#formcep').on('submit', (ev)=> {
        ev.preventDefault();
        var cep = $('#cep').val();
        $.ajax({
            url: "https://viacep.com.br/ws/"+cep+"/json/",
            success: function(data){
                console.log(data);
                $('#lb-estado').append(['Estado:'].join(''));
                $('#lb-cidade').append(['Cidade:'].join(''));
                $('#lb-bairro').append(['Bairro:'].join(''));
                $('#lb-rua').append(['Logradouro:'].join(''));
                $('#lb-cep').append(['CEP:'].join(''));
                $('#cep-resp').html(data.cep);
                $('#cidade').html(data.localidade);
                $('#uf').html(data.uf);
                $('#bairro').html(data.bairro);
                $('#rua').html(data.logradouro);
                $('#cep').val('');
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
    $('#cep').on('click', (ev) => {
        $('#lb-estado').text('');
        $('#lb-cidade').text('');
        $('#lb-bairro').text('');
        $('#lb-rua').text('');
        $('#cidade').text('');
        $('#uf').text('');
        $('#bairro').text('');
        $('#rua').text('');
        $('#lb-cep').text('');
        $('#cep-resp').text('');
    });
});

