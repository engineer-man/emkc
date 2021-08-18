import axios from 'axios';

$(document).on('click', '.confirm-delete', function (e) {
    let target_name = e.target.id.replace('delete-', '');
    let url = target_name === 'snippet' ? '/' : '/admin/';
    // dataset.target is the id/hash
    url += target_name + 's/delete/' + e.target.dataset.target;

    bootbox.confirm({
        message: `Are you sure you want to delete this ${target_name}?`,
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
                await axios.post(url);
                location = location;
            }
        }
    });
});
