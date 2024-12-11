Everything is self explanatory

You must add your own prompts in a prompts.js file, start with the function:

```javascript
function prompts(){
    var pid = document.getElementById('pidbox').value
    if(pid == 1){ //Special Theme 1, add new IDs if need be
        var prompts = [
        ]
        localStorage.setItem("prompts", JSON.stringify(prompts));
    }
    else{ //Generic
        var prompts = [
        ]
        localStorage.setItem("prompts", JSON.stringify(prompts));
    }
}
```