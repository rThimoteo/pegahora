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
                            '<button class="btn btn-sm btn-primary mr-2 btn-view" data-toggle="modal" data-target="#user-detail-modal" data-id="'+userApi.id+'">',
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
            var userRow = $(this).parent().parent();
            var response = confirm('Deseja mesmo excluir o usuário?');
            if (response){
                $.ajax({
                    url: userApi + userId,
                    type:'delete',
                    success:function(data){
                        userRow.remove();
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

    $('#user-detail-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var userId = button.data('id');
        var modal = $(this);
        $.ajax({
            url: userApi+userId,
            beforeSend: function() {
                $('#user-detail-modal-title').text('Loading...');
                $('#user-detail-modal-body').html('<p class="text-center"> Loading... </p>');
            },
            success: function(data) {
                $('#user-detail-modal-title').text(data.user.name);
                $('#user-detail-modal-body').html('');
                
                $('#user-detail-modal-body').append([
                    '<dl class="row">',
                        '<dt class="col-sm-3">Name:</dt>',
                        '<dd class="col-sm-9 mb-3">',data.user.name,'</dd>',
                        '<dt class="col-sm-3">E-mail:</dt>',
                        '<dd class="col-sm-9 mb-3">',data.user.email,'</dd>',
                        '<dt class="col-sm-3">Username:</dt>',
                        '<dd class="col-sm-9 mb-3">',data.user.username,'</dd>',
                        '<dt class="col-sm-3">Phone:</dt>',
                        '<dd class="col-sm-9 mb-3">',data.user.phone,'</dd>',
                        '<dt class="col-sm-3">Website:</dt>',
                        '<dd class="col-sm-9 mb-3">',data.user.website,'</dd>',
                    '</dl>',
                    '<hr>'
                ].join(''));
                
                $('#user-detail-modal-body').append([
                    '<h5>Addresses</h5>'
                ].join(''));
                $.each(data.user.addresses, function (index, address){
                    $('#user-detail-modal-body').append([
                        '<div class="list-group-item list-group-item-action">',
                            '<div class="d-flex flex-column w-100">',
                                '<h5 class="mb-1">',address.street,'</h5>',
                                '<p class="mb-1">',address.zipcode,'</p>',
                                '<p class="mb-1">',address.suite,'</p>',
                                '<p class="mb-1">Lat: ',address.lat ?? 'n/a','</p>',
                                '<p class="mb-1">Lng: ',address.lng ?? 'n/a','</p>',
                            '</div>',
                        '</div'
                    ].join(''));
                });
                
                $('#user-detail-modal-body').append([
                    '<hr>',
                    '<h5>Companies</h5>'
                ].join(''));

                $.each(data.user.companies, function (index, company){
                    $('#user-detail-modal-body').append([
                        '<div class="list-group-item list-group-item-action">',
                            '<div class="d-flex flex-column w-100">',
                                '<h5 class="mb-1">',company.company,'</h5>',
                                '<p class="mb-1">BS: ',company.bs ?? 'n/a','</p>',
                                '<p class="mb-1">Catch Phrase: ',company.catch_phrase ?? 'n/a','</p>',
                            '</div>',
                        '</div'
                    ].join(''));
                });
            },
            error: function(error) {
            }
        });
    });

    $('#cep').on('focusin', (ev) => {
        $('#dados-cep').html('');
    });
});

