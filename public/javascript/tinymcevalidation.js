
    tinymce.init({
        selector: '#content',
        setup: function (editor) {
            editor.on('change', function () {
                editor.save();
            });
        }
    });

    document.getElementById('blogForm').addEventListener('submit', function(event) {
        // Update the textarea with the content from TinyMCE
        tinymce.triggerSave();

        // Check form validity
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.classList.add('was-validated');
    });
