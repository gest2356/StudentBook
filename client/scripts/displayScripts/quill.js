let quillInstance;
let quillCommentInstance = [];
let quillInstanceForPostEdit;

export async function initialize() {
    const editorElement = document.querySelector('#post-editor-container');

    if (editorElement) {

        quillInstance = new window.Quill('#post-editor-container', {
            theme: 'snow',
            placeholder: 'write something smart :)',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                ]
            }
        });
    }
}

export async function initCommentsEditor() {
    let editorElement = document.querySelectorAll('.comments-editor');

    editorElement.forEach(el => {
        const instanceOfComment = new window.Quill(el, {
            theme: 'snow',
            placeholder: 'write something smart :)',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                ]
            }
        });

        quillCommentInstance.push(instanceOfComment);
    })

}

export function getTextFromQuillInstance(id) {
    return quillCommentInstance[id].root.innerHTML
}

export function getTextFromQuill() {
    if (quillInstance) {
        return quillInstance.root.innerHTML;
    }
    return null;
}

export function createQuiltForPostEdit(postContent){
    quillInstanceForPostEdit = new window.Quill('#post-edit-quilt-input', {
        theme: 'snow',
        placeholder: 'write something smart :)',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
            ]
        }
    });

    quillInstanceForPostEdit.root.innerHTML = postContent;
}

export function getTextFromCommentInput() {
    if (quillInstanceForPostEdit) {
        return quillInstanceForPostEdit.root.innerHTML;
    }
}
