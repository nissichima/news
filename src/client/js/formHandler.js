function handleSubmit(event) {
    event.preventDefault()

    //Receive input from form field
    var inputt = document.querySelectorAll('input[name=test-url]')

    //Verify that input is a valid url
    if(Client.validURL(JSON.parse(JSON.stringify(inputt[0].value))))
    {
        console.log("INPUT IS VALID")
        
        //Building Request
        fetch('http://localhost:8080/userText', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({formText: inputt[0].value})
        })
        .then(res => res.json())
        .then(function(res) {
            // print for debugging
            console.log(res); 

            // Populate html with result
            document.querySelector('section.analysis #subjectivity').innerHTML = res.subjectivity
            document.querySelector('section.analysis #polarity').innerHTML = res.score_tag
            document.querySelector('section.analysis #confidence').innerHTML = res.confidence
            document.querySelector('section.analysis #agreement').innerHTML = res.agreement
            document.querySelector('section.analysis #irony').innerHTML = res.irony
        })

    }else{
        // error message for invalid input
        var error_section = document.querySelector('section.errors');
        var error = document.querySelector('section.errors #error');
        error.innerHTML = "The URL:[" +JSON.stringify(inputt[0].value)+"] is not valid."
        error_section.style.display = "block";
        
    } 
}

export { handleSubmit }