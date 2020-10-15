import axios from 'axios';

$(document).on("click", ".confirm-delete", function(e) {
    var hash = $(this).data('hash');
    bootbox.confirm({
        message: "Are you sure you want to delete this snippet?",
        buttons: {
            confirm: {
                label: 'Delete',
                className: 'btn-danger'
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-secondary'
            }
        },
        callback: async function (result) {
            if (result) {
                let res = await axios.post('/s/delete/' + hash);
                location = res.data.url;
            }
        }
    });
});
