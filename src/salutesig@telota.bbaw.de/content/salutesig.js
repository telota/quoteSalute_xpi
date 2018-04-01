function insertSalute() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const { quote, edition, title, url } = JSON.parse(this.responseText);
            const saluteMessage = `${quote}<br/>-- Von: ${title}<br/>-- In: ${edition}<br/>-- Siehe: ${url}`;
            const [ editor ] = document.getElementsByTagName('editor');
            let messageBody = editor.contentDocument.body.innerHTML;
            const salute = messageBody + saluteMessage;
            editor.contentDocument.body.innerHTML = salute;
        }
    }
    const abfrageUrl = 'http://correspsearch.net/salute/abfrage.xql';
    xhttp.open('GET', abfrageUrl, true);
    xhttp.send();
}