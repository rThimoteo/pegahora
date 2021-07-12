//Funções em JQuery
$(function(){
    $('#formcep').on('submit', async (ev) => { 
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
    
    const usersApiEndpoint = 'http://web.pegahora.com/users';
    const userApi = 'http://web.pegahora.com/user/';

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
                        '<td>',userApi.user_name,'</td>', 
                        '<td>',userApi.username,'</td>', 
                        '<td>',userApi.email,'</td>',
                        '<td>',
                            '<button class="btn btn-sm btn-primary mr-2 btn-view" data-id="'+userApi.id+'">',
                                '<i class="fas fa-eye" ></i>',
                            '</button>',
                            '<button class="btn btn-sm btn-success mr-2 btn-edit" data-id="'+userApi.id+'">',
                                '<i class="fas fa-edit"></i>',
                            '</button>',
                            '<button class="btn btn-sm btn-danger btn-delete" data-id="'+userApi.id+'">',
                                '<i class="fas fa-trash-alt"></i>',
                            '</button>',
                        '</td>',
                    '</tr>'
                ].join(''))
            });
            
            rebindButtons();
        },
        error: function(error) {
        }
    });

    function rebindButtons (){
        $('.btn-delete').off('click');

        $('.btn-delete').on('click', function() {
            var userId = $(this).data('id');
            var response = confirm('Deseja mesmo excluir o usuário?');
            if (response){
                $.ajax({
                    url: userApi + userId,
                    type:'delete',
                    success:function(data){
                        $(this).parent().parent().remove();
                        alert('Usuário Excluído com sucesso.');
                    },
                    error:function(error){
                        alert('Ocorreu um erro inesperado.');
                        console.error(error);
                    } 
                });
            }
        });
    }

    $('#cep').on('focusin', (ev) => {
        $('#dados-cep').html('');
    });
});

