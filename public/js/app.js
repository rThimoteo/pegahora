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
    
    const usersApiEndpoint = '/users';
    const userApi = '/user/';

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

    function rebindDeleteButtons() {
        $('.btn-delete-address').off('click');
        $('.btn-delete-address').on('click', function() {
            var addressId = $(this).data('id');
            var addressDiv = $(this).parent().parent().parent();
            var response = confirm('Deseja mesmo excluir este endereço?');
            if (response){
                $.ajax({
                    url: userApi+'address/'+addressId,
                    type:'delete',
                    success:function(data){
                        addressDiv.remove();
                        alert('Address Deleted!');
                    },
                    error:function(error){
                        alert('Ocorreu um erro inesperado.');
                        console.error(error);
                    } 
                });
            }
        });

        $('.btn-delete-company').off('click');
        $('.btn-delete-company').on('click', function() {
            var companyId = $(this).data('id');
            var companyDiv = $(this).parent().parent().parent();
            var response = confirm('Deseja mesmo excluir este endereço?');
            if (response){
                $.ajax({
                    url: userApi+'company/'+companyId,
                    type:'delete',
                    success:function(data){
                        companyDiv.remove();
                        alert('Company Deleted!');
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
                        '<div class="container">',
                            '<div class="mb-2 px-1 py-3 row border rounded">',
                                '<div class="col ">',    
                                    '<div class="col d-flex flex-column w-70">',
                                        '<h5 class="mb-1">',address.street,'</h5>',
                                        '<p class="mb-1">',address.zipcode,'</p>',
                                        '<p class="mb-1">',address.suite,'</p>',
                                        '<p class="mb-1">Lat: ',address.lat ?? 'n/a','</p>',
                                        '<p class="mb-1">Lng: ',address.lng ?? 'n/a','</p>',
                                    '</div>',
                                '</div>',
                                '<div class="col-2 flex-column d-flex">',
                                    '<button type="button" class="mb-2 btn btn-warning btn-edit-address" data-dismiss="modal" data-toggle="modal" data-target="#address-edit-modal" data-id="'+address.address_id+'"><i class="fas fa-pen"></i></button>',
                                    '<br>',
                                    '<button type="button" class="btn btn-danger btn-delete-address" data-id="'+address.address_id+'"><i class="fas fa-times"></i></button>',
                                '</div>',
                            '</div>',
                        '</div>'
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
                        '<div class="container">',
                            '<div class="mb-2 px-1 py-3 row border rounded">',
                                '<div class="col ">',    
                                    '<div class="col d-flex flex-column w-70">',
                                        '<h5 class="mb-1">',company.company,'</h5>',
                                        '<p class="mb-1">BS: ',company.bs ?? 'n/a','</p>',
                                        '<p class="mb-1">Catch Phrase: ',company.catch_phrase ?? 'n/a','</p>',
                                    '</div>',
                                '</div>',
                                '<div class="col-2 flex-column d-flex">',
                                    '<button type="button" class="mb-2 btn btn-warning btn-edit-company" data-dismiss="modal" data-toggle="modal" data-target="#company-edit-modal" data-id="'+company.company_id+'"><i class="fas fa-pen"></i></button>',
                                    '<br>',
                                    '<button type="button" class="btn btn-danger btn-delete-company" data-id="'+company.company_id+'"><i class="fas fa-times"></i></button>',
                                '</div>',
                            '</div>',
                        '</div>'
                    ].join(''));
                });

                rebindDeleteButtons();
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
                $('#user-edit-modal-title').text('Edit - '+data.user.name);
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

    $('#company-edit-modal').on('show.bs.modal', function (event) {
        var companyId = $(event.relatedTarget).data('id');
        globalCompanyId = companyId;
        $.ajax({
            url: userApi+'company/'+companyId,
            beforeSend: function() {
                $('#company-edit-modal-title').text('Loading...');
                $('#company-edit-modal-body').html('<p class="text-center"> Loading... </p>');
            },
            success: function(data) {
                $('#company-edit-modal-title').text('Edit - '+data.company.name);
                $('#company-edit-modal-body').html('');
                
                $('#company-edit-modal-body').append([
                    '<dl class="row">',
                        '<dt class="col-sm-3">Company Name:</dt>',
                        '<input id="company-edit-name" class="col-sm-9 mb-3 form-control" value="'+data.company.name+'">',
                        '<dt class="col-sm-3">BS:</dt>',
                        '<input id="company-edit-bs" class="col-sm-9 mb-3 form-control" value="'+data.company.bs+'">',
                        '<dt class="col-sm-3">Catch Phrase:</dt>',
                        '<input id="company-edit-phrase" class="col-sm-9 mb-3 form-control" value="'+data.company.catch_phrase+'">',
                    '</dl>'
                ].join(''));
            },
            error: function(error) {
                console.log(error);
            }
        });

        $('#company-edit-modal-footer').html(
            '<button type="button" class="btn btn-secondary btn-back-to-user" data-dismiss="modal" data-toggle="modal" data-target="#user-detail-modal" data-id="'+globalUserID+'"">Back</button>'
            +'<button type="submit" class="btn btn-success">Edit Company</button>'
        );
    });

    $('#address-edit-modal').on('show.bs.modal', function (event) {
        var addressId = $(event.relatedTarget).data('id');
        globalAddressId = addressId;
        $.ajax({
            url: userApi+'address/'+addressId,
            beforeSend: function() {
                $('#address-edit-modal-title').text('Loading...');
                $('#address-edit-modal-body').html('<p class="text-center"> Loading... </p>');
            },
            success: function(data) {
                $('#address-edit-modal-title').text('Edit Address');
                $('#address-edit-modal-body').html('');
                
                $('#address-edit-modal-body').append([
                    '<dl class="row">',
                        '<dt class="col-sm-3">Street Name:</dt>',
                        '<input id="address-edit-street" class="col-sm-9 mb-3 form-control" value="'+data.address.street+'">',
                        '<dt class="col-sm-3">Zipcode:</dt>',
                        '<input id="address-edit-zipcode" class="col-sm-9 mb-3 form-control" value="'+data.address.zipcode+'">',
                        '<dt class="col-sm-3">Suite:</dt>',
                        '<input id="address-edit-suite" class="col-sm-9 mb-3 form-control" value="'+data.address.suite+'">',
                        '<dt class="col-sm-3">Latitude:</dt>',
                        '<input id="address-edit-lat" class="col-sm-9 mb-3 form-control" value="'+data.address.lat+'">',
                        '<dt class="col-sm-3">Longitude:</dt>',
                        '<input id="address-edit-lng" class="col-sm-9 mb-3 form-control" value="'+data.address.lng+'">',
                    '</dl>'
                ].join(''));
            },
            error: function(error) {
                console.log(error);
            }
        });

        $('#address-edit-modal-footer').html(
            '<button type="button" class="btn btn-secondary btn-back-to-user" data-dismiss="modal" data-toggle="modal" data-target="#user-detail-modal" data-id="'+globalUserID+'"">Back</button>'
            +'<button type="submit" class="btn btn-success">Edit address</button>'
        );
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
        ev.preventDefault();
        var userData = {
            'name' : $('#form-user-name').val(),
            'email' : $('#form-user-email').val(),
            'username' : $('#form-user-username').val(),
            'phone' : $('#form-user-phone').val(),
            'website' : $('#form-user-website').val()
        };
        $.ajax({
            
            url: userApi+'create',

            data:userData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                alert('Usuário Criado!');
                window.location='/';
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
        $.ajax({
            url: userApi+globalUserID,

            data:userData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                alert('Usuário atualizado!');
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });

    $('#form-edit-company').on('submit', (ev) => { 
        ev.preventDefault();
        var companyData = {
            'name' : $('#company-edit-name').val(),
            'bs' : $('#company-edit-bs').val(),
            'catch_phrase' : $('#company-edit-phrase').val()
        };
        $.ajax({
            url: userApi+'company/edit/'+globalCompanyId,

            data:companyData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                alert('Compania editada!');
            },
            
            error: function(error) {
                console.log(error);
            }
        });    
        
    });

    $('#form-edit-address').on('submit', (ev) => { 
        ev.preventDefault();
        var addressData = {
            'street' : $('#address-edit-street').val(),
            'suite' : $('#address-edit-suite').val(),
            'zipcode' : $('#address-edit-zipcode').val(),
            'lat' : $('#address-edit-lat').val(),
            'lng' : $('#address-edit-lng').val()
        };

        $.ajax({
            url: userApi+'address/edit/'+globalAddressId,

            data:addressData,

            type: 'POST',

            beforeSend: function() {

            },
            
            success: function(data) {
                alert('Endereço editado!');
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

