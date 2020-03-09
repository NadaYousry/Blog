$(document).ready(function(){
    var gettedData;
    var blogObject;
    var blogObjectsArray=[];
    var createTr ;
    var createTd1;
    var createTd2;
    var createTd3;
    var createEditButton;
    var createEditButton;
    var getReloaded = JSON.parse(localStorage.getItem("blogObjectsArray"));

    //if there is data in local storage
    if(getReloaded){
        blogObject;
        blogObjectsArray=[];
        for(var i=0;i<getReloaded.length;i++){
            //give first td the post title
            createBlogPosts();
            $(createTd1).html(getReloaded[i].title);
            $(createTd2).html(getReloaded[i].body);
            $('#postTable').append(createTr);
            blogObject={
                id:i,
                title:getReloaded[i].title,
                body:getReloaded[i].body
            }
            blogObjectsArray.push(blogObject);
            $('.delete').eq(i).attr('id',getReloaded[i].id);
        } 
    }else{//if there is no data in local storage
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts ',
            type :'GET',
            success:function(response){
                blogObject;
                blogObjectsArray=[];
                for(i=0;i<response.length;i++){
                    //give first td the post title
                    createBlogPosts();
                    $(createTd1).html(response[i].title);
                    $(createTd2).html(response[i].body);
                    $('#postTable').append(createTr);
                    blogObject={
                        id:i,
                        title:response[i].title,
                        body:response[i].body
                    }
                    blogObjectsArray.push(blogObject);
                    localStorage.setItem("blogObjectsArray",JSON.stringify(blogObjectsArray));
                    $('button.delete').eq(i).attr('id',response[i].id-1);
                }
            },
            error:function(error){
                console.log(error);
            }
        })
        
    }
     
    // create posts
    function createBlogPosts(){
        createTr =$('<tr>').css('order',i);
        createTd1=$('<td>').addClass('addedTd1');
        createTd2=$('<td>').addClass('addedTd2');
        createTd3=$('<td>');
        createDeleteButton =$('<button>'+'Delete'+'</button>').attr('class','delete');
        createEditButton =$('<a>'+'Edit'+'</a>').attr('class','edit');
        createTd3.append(createDeleteButton,createEditButton);
        createTr.append(createTd1);
        createTr.append(createTd2);
        createTr.append(createTd3);
    }

    // delete button
    $(document).on('click','.delete',deleteClickHandeler);
    function deleteClickHandeler(){    
        var confirmation =confirm('are you sure you want to delete this post');
        if(confirmation==true){
            var deleteId =$(this).attr('id');
            //ajax 
            $.ajax({
                //give button id
                url:'https://jsonplaceholder.typicode.com/posts'+deleteId,
                Type:'DELETE',
                success:function(response){
                console.log(response);
                }
            });
            getData();
            //delete the row from local storage
            $(this).parent().parent().remove();
            for(var i=0;i<gettedData.length;i++){
                if($(this).attr('id')==gettedData[i].id){
                    gettedData.splice(i,1)
                }
            }
            //set new Data In Local Storage
            localStorage.setItem('blogObjectsArray',JSON.stringify(gettedData));
            function getData(){
            gettedData =JSON.parse(localStorage.getItem("blogObjectsArray"));
            }
        }
    }

    // edit posts button
    $(document).on('click','.edit',editClickHandeller);
    function editClickHandeller(){
        $(this).attr('href', 'editPosts.html');
        var editId =$(this).attr('id');
        var inputVals =[];
        var inputValsObj;
        //give button id
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts'+editId,
            Type:'GET',
            success:function(response){
            console.log(response);
            }
        });
        var titleValue=$(this).parent().parent().children('.addedTd1').text();
        var bodyValue =$(this).parent().parent().children('.addedTd2').text();
        var EditButtonId =$(this).siblings('.delete').attr('id'); 
        inputValsObj={
            id:EditButtonId,
            title:titleValue,
            body:bodyValue
        }
        inputVals.push(inputValsObj);
        localStorage.setItem('inputs',JSON.stringify(inputVals));

        inputValsObjEdit={
            id:gettedData[0].id,
            title:gettedData[0].title,
            body :gettedData[0].body
        }
    }
});

