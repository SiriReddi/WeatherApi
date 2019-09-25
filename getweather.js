function get(url){
    return fetch(url)
.then(function(response){
    console.log("response is ", response);
    return response.json();
})
.then(function(data){
    console.log("data is :", data);
    return data;

    
});
}