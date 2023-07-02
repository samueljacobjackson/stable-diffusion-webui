<<<<<<< HEAD



function start_training_textual_inversion() {
    gradioApp().querySelector('#ti_error').innerHTML = '';

    var id = randomId();
    requestProgress(id, gradioApp().getElementById('ti_output'), gradioApp().getElementById('ti_gallery'), function() {}, function(progress) {
        gradioApp().getElementById('ti_progress').innerHTML = progress.textinfo;
    });

    var res = Array.from(arguments);

    res[0] = id;

    return res;
}
=======



function start_training_textual_inversion() {
    gradioApp().querySelector('#ti_error').innerHTML = '';

    var id = randomId();
    requestProgress(id, gradioApp().getElementById('ti_output'), gradioApp().getElementById('ti_gallery'), function() {}, function(progress) {
        gradioApp().getElementById('ti_progress').innerHTML = progress.textinfo;
    });

    var res = Array.from(arguments);

    res[0] = id;

    return res;
}
>>>>>>> 20ae71faa8ef035c31aa3a410b707d792c8203a3
