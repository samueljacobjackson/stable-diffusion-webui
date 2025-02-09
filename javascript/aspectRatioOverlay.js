<<<<<<< HEAD

let currentWidth = null;
let currentHeight = null;
let arFrameTimeout = setTimeout(function() {}, 0);

function dimensionChange(e, is_width, is_height) {

    if (is_width) {
        currentWidth = e.target.value * 1.0;
    }
    if (is_height) {
        currentHeight = e.target.value * 1.0;
    }

    var inImg2img = gradioApp().querySelector("#tab_img2img").style.display == "block";

    if (!inImg2img) {
        return;
    }

    var targetElement = null;

    var tabIndex = get_tab_index('mode_img2img');
    if (tabIndex == 0) { // img2img
        targetElement = gradioApp().querySelector('#img2img_image div[data-testid=image] img');
    } else if (tabIndex == 1) { //Sketch
        targetElement = gradioApp().querySelector('#img2img_sketch div[data-testid=image] img');
    } else if (tabIndex == 2) { // Inpaint
        targetElement = gradioApp().querySelector('#img2maskimg div[data-testid=image] img');
    } else if (tabIndex == 3) { // Inpaint sketch
        targetElement = gradioApp().querySelector('#inpaint_sketch div[data-testid=image] img');
    }


    if (targetElement) {

        var arPreviewRect = gradioApp().querySelector('#imageARPreview');
        if (!arPreviewRect) {
            arPreviewRect = document.createElement('div');
            arPreviewRect.id = "imageARPreview";
            gradioApp().appendChild(arPreviewRect);
        }



        var viewportOffset = targetElement.getBoundingClientRect();

        var viewportscale = Math.min(targetElement.clientWidth / targetElement.naturalWidth, targetElement.clientHeight / targetElement.naturalHeight);

        var scaledx = targetElement.naturalWidth * viewportscale;
        var scaledy = targetElement.naturalHeight * viewportscale;

        var cleintRectTop = (viewportOffset.top + window.scrollY);
        var cleintRectLeft = (viewportOffset.left + window.scrollX);
        var cleintRectCentreY = cleintRectTop + (targetElement.clientHeight / 2);
        var cleintRectCentreX = cleintRectLeft + (targetElement.clientWidth / 2);

        var arscale = Math.min(scaledx / currentWidth, scaledy / currentHeight);
        var arscaledx = currentWidth * arscale;
        var arscaledy = currentHeight * arscale;

        var arRectTop = cleintRectCentreY - (arscaledy / 2);
        var arRectLeft = cleintRectCentreX - (arscaledx / 2);
        var arRectWidth = arscaledx;
        var arRectHeight = arscaledy;

        arPreviewRect.style.top = arRectTop + 'px';
        arPreviewRect.style.left = arRectLeft + 'px';
        arPreviewRect.style.width = arRectWidth + 'px';
        arPreviewRect.style.height = arRectHeight + 'px';

        clearTimeout(arFrameTimeout);
        arFrameTimeout = setTimeout(function() {
            arPreviewRect.style.display = 'none';
        }, 2000);

        arPreviewRect.style.display = 'block';

    }

}


onUiUpdate(function() {
    var arPreviewRect = gradioApp().querySelector('#imageARPreview');
    if (arPreviewRect) {
        arPreviewRect.style.display = 'none';
    }
    var tabImg2img = gradioApp().querySelector("#tab_img2img");
    if (tabImg2img) {
        var inImg2img = tabImg2img.style.display == "block";
        if (inImg2img) {
            let inputs = gradioApp().querySelectorAll('input');
            inputs.forEach(function(e) {
                var is_width = e.parentElement.id == "img2img_width";
                var is_height = e.parentElement.id == "img2img_height";

                if ((is_width || is_height) && !e.classList.contains('scrollwatch')) {
                    e.addEventListener('input', function(e) {
                        dimensionChange(e, is_width, is_height);
                    });
                    e.classList.add('scrollwatch');
                }
                if (is_width) {
                    currentWidth = e.value * 1.0;
                }
                if (is_height) {
                    currentHeight = e.value * 1.0;
                }
            });
        }
    }
});
=======

let currentWidth = null;
let currentHeight = null;
let arFrameTimeout = setTimeout(function() {}, 0);

function dimensionChange(e, is_width, is_height) {

    if (is_width) {
        currentWidth = e.target.value * 1.0;
    }
    if (is_height) {
        currentHeight = e.target.value * 1.0;
    }

    var inImg2img = gradioApp().querySelector("#tab_img2img").style.display == "block";

    if (!inImg2img) {
        return;
    }

    var targetElement = null;

    var tabIndex = get_tab_index('mode_img2img');
    if (tabIndex == 0) { // img2img
        targetElement = gradioApp().querySelector('#img2img_image div[data-testid=image] img');
    } else if (tabIndex == 1) { //Sketch
        targetElement = gradioApp().querySelector('#img2img_sketch div[data-testid=image] img');
    } else if (tabIndex == 2) { // Inpaint
        targetElement = gradioApp().querySelector('#img2maskimg div[data-testid=image] img');
    } else if (tabIndex == 3) { // Inpaint sketch
        targetElement = gradioApp().querySelector('#inpaint_sketch div[data-testid=image] img');
    }


    if (targetElement) {

        var arPreviewRect = gradioApp().querySelector('#imageARPreview');
        if (!arPreviewRect) {
            arPreviewRect = document.createElement('div');
            arPreviewRect.id = "imageARPreview";
            gradioApp().appendChild(arPreviewRect);
        }



        var viewportOffset = targetElement.getBoundingClientRect();

        var viewportscale = Math.min(targetElement.clientWidth / targetElement.naturalWidth, targetElement.clientHeight / targetElement.naturalHeight);

        var scaledx = targetElement.naturalWidth * viewportscale;
        var scaledy = targetElement.naturalHeight * viewportscale;

        var cleintRectTop = (viewportOffset.top + window.scrollY);
        var cleintRectLeft = (viewportOffset.left + window.scrollX);
        var cleintRectCentreY = cleintRectTop + (targetElement.clientHeight / 2);
        var cleintRectCentreX = cleintRectLeft + (targetElement.clientWidth / 2);

        var arscale = Math.min(scaledx / currentWidth, scaledy / currentHeight);
        var arscaledx = currentWidth * arscale;
        var arscaledy = currentHeight * arscale;

        var arRectTop = cleintRectCentreY - (arscaledy / 2);
        var arRectLeft = cleintRectCentreX - (arscaledx / 2);
        var arRectWidth = arscaledx;
        var arRectHeight = arscaledy;

        arPreviewRect.style.top = arRectTop + 'px';
        arPreviewRect.style.left = arRectLeft + 'px';
        arPreviewRect.style.width = arRectWidth + 'px';
        arPreviewRect.style.height = arRectHeight + 'px';

        clearTimeout(arFrameTimeout);
        arFrameTimeout = setTimeout(function() {
            arPreviewRect.style.display = 'none';
        }, 2000);

        arPreviewRect.style.display = 'block';

    }

}


onAfterUiUpdate(function() {
    var arPreviewRect = gradioApp().querySelector('#imageARPreview');
    if (arPreviewRect) {
        arPreviewRect.style.display = 'none';
    }
    var tabImg2img = gradioApp().querySelector("#tab_img2img");
    if (tabImg2img) {
        var inImg2img = tabImg2img.style.display == "block";
        if (inImg2img) {
            let inputs = gradioApp().querySelectorAll('input');
            inputs.forEach(function(e) {
                var is_width = e.parentElement.id == "img2img_width";
                var is_height = e.parentElement.id == "img2img_height";

                if ((is_width || is_height) && !e.classList.contains('scrollwatch')) {
                    e.addEventListener('input', function(e) {
                        dimensionChange(e, is_width, is_height);
                    });
                    e.classList.add('scrollwatch');
                }
                if (is_width) {
                    currentWidth = e.value * 1.0;
                }
                if (is_height) {
                    currentHeight = e.value * 1.0;
                }
            });
        }
    }
});
>>>>>>> 20ae71faa8ef035c31aa3a410b707d792c8203a3
