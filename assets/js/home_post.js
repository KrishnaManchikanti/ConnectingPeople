    // method to submit the form data for new post using AJAX
    function createPost() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function( event ){
            event.preventDefault();
            $.ajax({
                url: "/posts/create",
                type: "post",
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    createComment();// call the create comment class when newPost created
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error){
                    console.log(error.responceText);
                }
            })
        });
    }

// method to create a post in DOM
    let newPostDom = function(post){
        return $(`
        <li id="post-${post._id}">
        <p>
            <small>
                    <a class= "delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
                ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
                    <form action="/comments/create" id="new-comment-form" method="POST">
                            <input type="text" name="content" placeholder="comment here.......">
                            <input type="hidden" name="post" value="${post._id}"">
                            <input type="submit" value="Comment">
                    </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        </div>
    </li>
        `);
    } 

// method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
// loop over all the existing posts on the page 
    function convertPostsToAjax() {
        $('.delete-post-button').each(function() {
            deletePost($(this));
        });
    }
    
    createPost();
    convertPostsToAjax();
