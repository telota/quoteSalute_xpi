function insertSalute() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const { quote, edition, title, url } = JSON.parse(this.responseText);
            const [ editor ] = document.getElementsByTagName('editor');
            const editorType = editor.getAttribute('editortype');
            let messageBody = editor.contentDocument.body;

            if (editorType.startsWith('html')) {
                messageBody.style["white-space"] = "pre-wrap";
            }

            const quoteNode = document.createTextNode(`»${quote}«\n\n`);
            const titleNode = document.createTextNode(`› Von: ${title}\n`);
            const editionNode = document.createTextNode(`› In: ${edition}\n`);
            let urlNode = document.createTextNode(`› Siehe: ${url}\n`);
            const quotesaluteNode = document.createTextNode(`› Mehr auf: https://correspsearch.net/quotesalute/index.xql`);

            let insertTarget = messageBody.querySelector('.moz-signature');

            const replyNodeList = messageBody.querySelectorAll('.moz-cite-prefix');

            if (replyNodeList.length) {
                [ insertTarget ] = replyNodeList;
                urlNode = document.createTextNode(`-- Siehe: ${url}\n\n`);
            }
            
            messageBody.insertBefore(quoteNode, insertTarget);
            messageBody.insertBefore(titleNode, insertTarget);
            messageBody.insertBefore(editionNode, insertTarget);
            messageBody.insertBefore(urlNode, insertTarget);
            messageBody.insertBefore(quotesaluteNode, insertTarget);

        }
    }
    const abfrageUrl = 'http://correspsearch.net/quotesalute/abfrage.xql';
    xhttp.open('GET', abfrageUrl, true);
    xhttp.send();
}