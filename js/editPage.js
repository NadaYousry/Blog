$(document).ready(function(){
    // edit posts button
    var inputVals =[];
    var inputValsObj;
    getData =JSON.parse(localStorage.getItem('blogObjectsArray'));
    gettedEditData =JSON.parse(localStorage.getItem("inputs"));
        $('#titleEdit').val(gettedEditData[0].title);
        $('#bodyEdit').val(gettedEditData[0].body);
        var gettedId =gettedEditData[0].id;
        $('#cancel').on('click',function(e){
            var editConfirmation =confirm('you sure you want back to dashboard page');
            if(editConfirmation==true){
                $('#cancel').attr('href','dashBoard.html')
            }
            else{
                e.preventDefault()
            }
        });


    //save button
    $('#editForm').on('submit', function(e){
        inputValsObj=[]
        if($('input').val==null){
            alert('empty fields')
            e.preventDefault()
        }
        else{
            var saveData =$('#save').attr('id');            
            $.ajax({
                url:'https://jsonplaceholder.typicode.com/posts'+saveData,
                Type:'PUT',
                success:function(response){
                console.log(response);
                },
                error:function(error){
                    console.log(error);
                }
                

            });
            var titleFieldEdit =$('#titleEdit').val();
            var bodyFieldEdit =$('#bodyEdit').val();
            inputValsObj={
                id:gettedId,
                title:titleFieldEdit,
                body:bodyFieldEdit,
            }
            inputVals.push(inputValsObj);
            localStorage.setItem('inputs',JSON.stringify(inputVals));
            $('#editForm').attr('action','dashBoard.html');
            getDataEdited =JSON.parse(localStorage.getItem('inputs'));
        
            // //search on button has the same id and save in local storage
            for(var i=0;i<getData.length;i++){
            if(getDataEdited[0].id==getData[i].id){
                getData[i].title=getDataEdited[0].title;
                getData[i].body=getDataEdited[0].body;

            }
            
            localStorage.setItem('blogObjectsArray',JSON.stringify(getData));
            }
            
        }  

    }) ;  
});