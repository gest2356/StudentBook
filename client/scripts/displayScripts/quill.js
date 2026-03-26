let quillInstance;

export function initialize() {
    const editorElement = document.querySelector('#post-editor-container');

    if (editorElement) {

        quillInstance = new window.Quill('#post-editor-container', {
            theme: 'snow',
            placeholder: 'write something smart :)',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link']
                ]
            }
        });
    }
}

export function getTextFromQuill() {
    if (quillInstance) {
        return quillInstance.root.innerHTML;
    }
    return null;
}
