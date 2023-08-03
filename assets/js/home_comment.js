{
    // method to submit the form data for new comment using AJAX
    function createComment(){
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success:function(data){
                    let commentData = data.data.comment;
                    let newComment = createCommentDom(commentData);
                    $(`#post-comments-${commentData.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button',newComment));
                    // call the deleteComment when newComment created
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log('error',error.responseText);
                }
            })
        })
    }
    // method to create a comment in DOM
    let createCommentDom = function(comment){
        return $(`
        <li id="comment-${comment._id}">
            <p>
                <small>
                    <a class= "delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>
                ${comment.content}
                <br>
                <small>
                ${comment.user.name}
                </small>
            </p>
        </li>
        `);
    }
    // method to delete a post from DOM
    let deleteComment = function (deleteLink){
        console.log('deletelink',deleteLink);
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    function convertCommentsToAjax(){
        $('.delete-comment-button').each(function() {
            deleteComment($(this));
        })
    }
    
    createComment();
    convertCommentsToAjax();
}