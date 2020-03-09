$(document).ready(function(){
    var postCards;
    var getReloaded = JSON.parse(localStorage.getItem("blogObjectsArray"));
    if(getReloaded){
        postCards =$('<div>').addClass('postCards');
        for(var i=0 ;i<=getReloaded.length ;i++){
            craeteElements();
            $('.posts').append(postCards);
            $('.cardBody').eq(i).html( getReloaded[i].body);
            $('.firstCardTitle').eq(i).html(getReloaded[i].title);
        }
    }else{
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts ',
            type :'GET',
            success:function(response){
                postCards =$('<div>').addClass('postCards');
                for(var i=0 ;i<=response.length ;i++){
                    craeteElements();
                    $('.posts').append(postCards);
                    $('.cardBody').eq(i).html( response[i].body);
                    $('.firstCardTitle').eq(i).html(response[i].title);
                }
            },
            error:function(error){
                console.log(error);
            }
            
            
        })

    }
    // create posts function
    function craeteElements(){
        var postCard =$('<div>').addClass('postCard');
        var content =$('<div>').addClass('content');
        var cardSpan =$('<span>'+'word'+'</span>').addClass('cardSpan');
        var firstCardTitle =$('<h2>').addClass('firstCardTitle');
        var dateSpan =$('<span>'+'Nov 12'+'</p>').addClass('dateSpan');
        var cardBody =$('<p>').addClass('cardBody');
        var cardAnchor =$('<a>'+'Continue reading...'+'</a>');
        var figure =$('<figure>'+'<img src="#">'+'<figcaption>'+'thumbnail'+'</figcaption>'+'</figure>');
        content.append(cardSpan);
        content.append(firstCardTitle);
        content.append(dateSpan);
        content.append(cardBody);
        content.append(cardAnchor);
        postCard.append(content);
        postCard.append(figure);
        postCards.append(postCard);
        //set data in local storage            
    }
    
});
