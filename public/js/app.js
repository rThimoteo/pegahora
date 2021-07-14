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
                            '<button class="btn btn-sm btn-success mr-2 btn-edit" data-toggle="modal" data-target="#user-edit-modal" data-id="'+userApi.id+'">',
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
        var userId = $(event.relatedTarget).data('id');
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
                    '<hr>',
                    '<div class="container">',
                        '<div class="row">',
                            '<div class="col">',
                                '<h5>Addresses</h5>',
                            '</div>',
                            '<div class="col text-right">',
                                '<button type="button" class="mb-2 btn btn-success btn-company" data-dismiss="modal" data-toggle="modal" data-target="#address-add-modal">Add Address</button>',
                            '</div>',
                        '</div>'
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
                    '<div class="container">',
                        '<div class="row">',
                            '<div class="col">',
                                '<h5>Companies</h5>',
                            '</div>',
                            '<div class="col text-right">',
                                '<button type="button" class="mb-2 btn btn-success btn-company" data-dismiss="modal" data-toggle="modal" data-target="#company-add-modal">Add Company</button>',
                            '</div>',
                        '</div>'
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

                globalUserID = data.user.id;
                globalUserName = data.user.name;

            },
            error: function(error) {
            }
        });

    });

    $('#user-edit-modal').on('show.bs.modal', function (event) {
        var userId = $(event.relatedTarget).data('id');
        globalUserID = userId;
        var modal = $(this);
        $.ajax({
            url: userApi+userId,
            beforeSend: function() {
                $('#user-edit-modal-title').text('Loading...');
                $('#user-edit-modal-body').html('<p class="text-center"> Loading... </p>');
            },
            success: function(data) {
                $('#user-edit-modal-title').text(data.user.name);
                $('#user-edit-modal-body').html('');
                
                $('#user-edit-modal-body').append([
                    '<dl class="row">',
                        '<dt class="col-sm-3">Name:</dt>',
                        '<input id="user-edit-name" class="col-sm-9 mb-3 form-control" value="'+data.user.name+'">',
                        '<dt class="col-sm-3">E-mail:</dt>',
                        '<input id="user-edit-email" class="col-sm-9 mb-3 form-control" value="'+data.user.email+'">',
                        '<dt class="col-sm-3">Username:</dt>',
                        '<input id="user-edit-username" class="col-sm-9 mb-3 form-control" value="'+data.user.username+'">',
                        '<dt class="col-sm-3">Phone:</dt>',
                        '<input id="user-edit-phone" class="col-sm-9 mb-3 form-control" value="'+data.user.phone+'">',
                        '<dt class="col-sm-3">Website:</dt>',
                        '<input id="user-edit-website" class="col-sm-9 mb-3 form-control" value="'+data.user.website+'">',
                    '</dl>'
                ].join(''));

            },
            error: function(error) {
            }
        });
    });

    $('#company-add-modal').on('show.bs.modal', function () {
        $('#add-company-modal-title').text(globalUserName + ' - Add Company');
        $('#footer-modal-company').html(
            '<button type="button" class="btn btn-secondary btn-back-to-user" data-dismiss="modal" data-toggle="modal" data-target="#user-detail-modal" data-id="'+globalUserID+'"">Back</button>'
            +'<button type="submit" class="btn btn-success">Add Company</button>'
        );
    });

    $('#address-add-modal').on('show.bs.modal', function () {
        $('#add-address-modal-title').text(globalUserName + ' - Add Address');
        $('#footer-modal-address').html(
            '<button type="button" class="btn btn-secondary btn-back-to-user" data-dismiss="modal" data-toggle="modal" data-target="#user-detail-modal" data-id="'+globalUserID+'"">Back</button>'
            +'<button type="submit" class="btn btn-success">Add Address</button>'
        );
    });

    $('#form-user').on('submit', (ev) => { 
        var userData = {
            'name' : $('#form-user-name').val(),
            'email' : $('#form-user-email').val(),
            'username' : $('#form-user-username').val(),
            'phone' : $('#form-user-phone').val(),
            'website' : $('#form-user-website').val()
        };
        console.log(userData);
        $.ajax({
            
            url: userApi+'create',

            data:userData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                console.log(data);
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });

    $('#form-edit').on('submit', (ev) => { 
        ev.preventDefault();
        var userData = {
            'name' : $('#user-edit-name').val(),
            'email' : $('#user-edit-email').val(),
            'username' : $('#user-edit-username').val(),
            'phone' : $('#user-edit-phone').val(),
            'website' : $('#user-edit-website').val()
        };
        console.log(userData);
        $.ajax({
            url: userApi+globalUserID,

            data:userData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                console.log(data);
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });

    $('#form-company').on('submit', (ev) => { 
        ev.preventDefault();

        if ($('#form-company-name').val() == '') {
            if (!$('#form-company-name').hasClass('is-invalid')) {
                $('#form-company-name').addClass('is-invalid');
            }
            alert('Preencha o campo Name');
            return;
        }

        var companyData = {
            'name' : $('#form-company-name').val(),
            'bs' : $('#form-company-bs').val(),
            'catch_phrase' : $('#form-company-catch_phrase').val(),
            'id_user' : globalUserID
        };
        
        $.ajax({
            url: userApi+'company',

            data:companyData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                console.log(data);
                alert('Company '+companyData.name+' added!');
                $('.form-control').val('');
                
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });

    $('#form-address').on('submit', (ev) => { 
        ev.preventDefault();

        if ($('#form-address-street').val() == '' ) {
            $('#form-address-street').toggleClass('is-invalid');
            alert('Preencha o campo Name');
            return;
        }

        var addressData = {
            'street' : $('#form-address-street').val() ,
            'zipcode' : $('#form-address-zipcode').val(),
            'suite' : $('#form-address-suite').val(),
            'lat' : $('#form-address-lat').val(),
            'lng' : $('#form-address-lng').val(),
            'id_user' : globalUserID
        };
        
        $.ajax({
            url: userApi+'address',

            data:addressData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                console.log(data);
                alert('Address added!');
                $('.form-control').val('');
                
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });


    $('#cep').on('focusin', (ev) => {
        $('#dados-cep').html('');
    });
});

