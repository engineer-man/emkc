import axios from 'axios'

$(document).ready(async function() {
    if ($('.get-versions').length > 0) {
        var languages = await axios.get('/api/v1/piston/versions');
        $('.version').each(function() {
            let language = languages.data.filter(lang => $(this).data('langname') === lang.name)[0];
            $(this).append(language.version);
        })
    }    
})
