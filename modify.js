async function convert() {
    const text = document.getElementById('inputText').value;
    const type = document.getElementById('conversionType').value;
    const status = document.getElementById('status');
    status.textContent = 'Processing...';

    if (!text) {
        status.textContent = 'Please enter some text!';
        return;
    }

    try {
        if (type === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text(text, 10, 10);
            doc.save('output.pdf');
            status.textContent = 'PDF downloaded!';
        } else {
            const response = await fetch('https://theideaflowai.herokuapp.com/convert', {
                method: 'POST',
                body: new FormData().append('text', text).append('type', type)
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `output.${type === 'audio' ? 'mp3' : type === 'presentation' ? 'pptx' : 'mp4'}`;
                a.click();
                status.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} downloaded!`;
            } else {
                const error = await response.json();
                status.textContent = `Error: ${error.message}`;
            }
        }
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
}