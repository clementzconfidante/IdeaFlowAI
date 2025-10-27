<script src="https://unpkg.com/mermaid@9.4.3/dist/mermaid.min.js"></script>
<div id="mermaidOutput" style="display: none;"></div>
<script>
mermaid.initialize({ startOnLoad: false });
function renderMermaid(text) {
    const mermaidOutput = document.getElementById('mermaidOutput');
    mermaidOutput.style.display = 'block';
    mermaidOutput.innerHTML = `graph TD\nA[Idea] --> B[${text}]`;
    mermaid.render('mermaidGraph', mermaidOutput.innerHTML, (svg) => {
        mermaidOutput.innerHTML = svg;
    });
}
</script>