<<<<<<< HEAD
function setupExtraNetworksForTab(tabname) {
    gradioApp().querySelector('#' + tabname + '_extra_tabs').classList.add('extra-networks');

    var tabs = gradioApp().querySelector('#' + tabname + '_extra_tabs > div');
    var search = gradioApp().querySelector('#' + tabname + '_extra_search textarea');
    var refresh = gradioApp().getElementById(tabname + '_extra_refresh');

    search.classList.add('search');
    tabs.appendChild(search);
    tabs.appendChild(refresh);

    var applyFilter = function() {
        var searchTerm = search.value.toLowerCase();

        gradioApp().querySelectorAll('#' + tabname + '_extra_tabs div.card').forEach(function(elem) {
            var searchOnly = elem.querySelector('.search_only');
            var text = elem.querySelector('.name').textContent.toLowerCase() + " " + elem.querySelector('.search_term').textContent.toLowerCase();

            var visible = text.indexOf(searchTerm) != -1;

            if (searchOnly && searchTerm.length < 4) {
                visible = false;
            }

            elem.style.display = visible ? "" : "none";
        });
    };

    search.addEventListener("input", applyFilter);
    applyFilter();

    extraNetworksApplyFilter[tabname] = applyFilter;
}

function applyExtraNetworkFilter(tabname) {
    setTimeout(extraNetworksApplyFilter[tabname], 1);
}

var extraNetworksApplyFilter = {};
var activePromptTextarea = {};

function setupExtraNetworks() {
    setupExtraNetworksForTab('txt2img');
    setupExtraNetworksForTab('img2img');

    function registerPrompt(tabname, id) {
        var textarea = gradioApp().querySelector("#" + id + " > label > textarea");

        if (!activePromptTextarea[tabname]) {
            activePromptTextarea[tabname] = textarea;
        }

        textarea.addEventListener("focus", function() {
            activePromptTextarea[tabname] = textarea;
        });
    }

    registerPrompt('txt2img', 'txt2img_prompt');
    registerPrompt('txt2img', 'txt2img_neg_prompt');
    registerPrompt('img2img', 'img2img_prompt');
    registerPrompt('img2img', 'img2img_neg_prompt');
}

onUiLoaded(setupExtraNetworks);

var re_extranet = /<([^:]+:[^:]+):[\d.]+>/;
var re_extranet_g = /\s+<([^:]+:[^:]+):[\d.]+>/g;

function tryToRemoveExtraNetworkFromPrompt(textarea, text) {
    var m = text.match(re_extranet);
    var replaced = false;
    var newTextareaText;
    if (m) {
        var partToSearch = m[1];
        newTextareaText = textarea.value.replaceAll(re_extranet_g, function(found) {
            m = found.match(re_extranet);
            if (m[1] == partToSearch) {
                replaced = true;
                return "";
            }
            return found;
        });
    } else {
        newTextareaText = textarea.value.replaceAll(new RegExp(text, "g"), function(found) {
            if (found == text) {
                replaced = true;
                return "";
            }
            return found;
        });
    }

    if (replaced) {
        textarea.value = newTextareaText;
        return true;
    }

    return false;
}

function cardClicked(tabname, textToAdd, allowNegativePrompt) {
    var textarea = allowNegativePrompt ? activePromptTextarea[tabname] : gradioApp().querySelector("#" + tabname + "_prompt > label > textarea");

    if (!tryToRemoveExtraNetworkFromPrompt(textarea, textToAdd)) {
        textarea.value = textarea.value + opts.extra_networks_add_text_separator + textToAdd;
    }

    updateInput(textarea);
}

function saveCardPreview(event, tabname, filename) {
    var textarea = gradioApp().querySelector("#" + tabname + '_preview_filename  > label > textarea');
    var button = gradioApp().getElementById(tabname + '_save_preview');

    textarea.value = filename;
    updateInput(textarea);

    button.click();

    event.stopPropagation();
    event.preventDefault();
}

function extraNetworksSearchButton(tabs_id, event) {
    var searchTextarea = gradioApp().querySelector("#" + tabs_id + ' > div > textarea');
    var button = event.target;
    var text = button.classList.contains("search-all") ? "" : button.textContent.trim();

    searchTextarea.value = text;
    updateInput(searchTextarea);
}

var globalPopup = null;
var globalPopupInner = null;
function popup(contents) {
    if (!globalPopup) {
        globalPopup = document.createElement('div');
        globalPopup.onclick = function() {
            globalPopup.style.display = "none";
        };
        globalPopup.classList.add('global-popup');

        var close = document.createElement('div');
        close.classList.add('global-popup-close');
        close.onclick = function() {
            globalPopup.style.display = "none";
        };
        close.title = "Close";
        globalPopup.appendChild(close);

        globalPopupInner = document.createElement('div');
        globalPopupInner.onclick = function(event) {
            event.stopPropagation(); return false;
        };
        globalPopupInner.classList.add('global-popup-inner');
        globalPopup.appendChild(globalPopupInner);

        gradioApp().appendChild(globalPopup);
    }

    globalPopupInner.innerHTML = '';
    globalPopupInner.appendChild(contents);

    globalPopup.style.display = "flex";
}

function extraNetworksShowMetadata(text) {
    var elem = document.createElement('pre');
    elem.classList.add('popup-metadata');
    elem.textContent = text;

    popup(elem);
}

function requestGet(url, data, handler, errorHandler) {
    var xhr = new XMLHttpRequest();
    var args = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
    xhr.open("GET", url + "?" + args, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var js = JSON.parse(xhr.responseText);
                    handler(js);
                } catch (error) {
                    console.error(error);
                    errorHandler();
                }
            } else {
                errorHandler();
            }
        }
    };
    var js = JSON.stringify(data);
    xhr.send(js);
}

function extraNetworksRequestMetadata(event, extraPage, cardName) {
    var showError = function() {
        extraNetworksShowMetadata("there was an error getting metadata");
    };

    requestGet("./sd_extra_networks/metadata", {page: extraPage, item: cardName}, function(data) {
        if (data && data.metadata) {
            extraNetworksShowMetadata(data.metadata);
        } else {
            showError();
        }
    }, showError);

    event.stopPropagation();
}
=======
function setupExtraNetworksForTab(tabname) {
    gradioApp().querySelector('#' + tabname + '_extra_tabs').classList.add('extra-networks');

    var tabs = gradioApp().querySelector('#' + tabname + '_extra_tabs > div');
    var search = gradioApp().querySelector('#' + tabname + '_extra_search textarea');
    var sort = gradioApp().getElementById(tabname + '_extra_sort');
    var sortOrder = gradioApp().getElementById(tabname + '_extra_sortorder');
    var refresh = gradioApp().getElementById(tabname + '_extra_refresh');

    search.classList.add('search');
    sort.classList.add('sort');
    sortOrder.classList.add('sortorder');
    sort.dataset.sortkey = 'sortDefault';
    tabs.appendChild(search);
    tabs.appendChild(sort);
    tabs.appendChild(sortOrder);
    tabs.appendChild(refresh);

    var applyFilter = function() {
        var searchTerm = search.value.toLowerCase();

        gradioApp().querySelectorAll('#' + tabname + '_extra_tabs div.card').forEach(function(elem) {
            var searchOnly = elem.querySelector('.search_only');
            var text = elem.querySelector('.name').textContent.toLowerCase() + " " + elem.querySelector('.search_term').textContent.toLowerCase();

            var visible = text.indexOf(searchTerm) != -1;

            if (searchOnly && searchTerm.length < 4) {
                visible = false;
            }

            elem.style.display = visible ? "" : "none";
        });
    };

    var applySort = function() {
        var reverse = sortOrder.classList.contains("sortReverse");
        var sortKey = sort.querySelector("input").value.toLowerCase().replace("sort", "").replaceAll(" ", "_").replace(/_+$/, "").trim();
        sortKey = sortKey ? "sort" + sortKey.charAt(0).toUpperCase() + sortKey.slice(1) : "";
        var sortKeyStore = sortKey ? sortKey + (reverse ? "Reverse" : "") : "";
        if (!sortKey || sortKeyStore == sort.dataset.sortkey) {
            return;
        }

        sort.dataset.sortkey = sortKeyStore;

        var cards = gradioApp().querySelectorAll('#' + tabname + '_extra_tabs div.card');
        cards.forEach(function(card) {
            card.originalParentElement = card.parentElement;
        });
        var sortedCards = Array.from(cards);
        sortedCards.sort(function(cardA, cardB) {
            var a = cardA.dataset[sortKey];
            var b = cardB.dataset[sortKey];
            if (!isNaN(a) && !isNaN(b)) {
                return parseInt(a) - parseInt(b);
            }

            return (a < b ? -1 : (a > b ? 1 : 0));
        });
        if (reverse) {
            sortedCards.reverse();
        }
        cards.forEach(function(card) {
            card.remove();
        });
        sortedCards.forEach(function(card) {
            card.originalParentElement.appendChild(card);
        });
    };

    search.addEventListener("input", applyFilter);
    applyFilter();
    ["change", "blur", "click"].forEach(function(evt) {
        sort.querySelector("input").addEventListener(evt, applySort);
    });
    sortOrder.addEventListener("click", function() {
        sortOrder.classList.toggle("sortReverse");
        applySort();
    });

    extraNetworksApplyFilter[tabname] = applyFilter;
}

function applyExtraNetworkFilter(tabname) {
    setTimeout(extraNetworksApplyFilter[tabname], 1);
}

var extraNetworksApplyFilter = {};
var activePromptTextarea = {};

function setupExtraNetworks() {
    setupExtraNetworksForTab('txt2img');
    setupExtraNetworksForTab('img2img');

    function registerPrompt(tabname, id) {
        var textarea = gradioApp().querySelector("#" + id + " > label > textarea");

        if (!activePromptTextarea[tabname]) {
            activePromptTextarea[tabname] = textarea;
        }

        textarea.addEventListener("focus", function() {
            activePromptTextarea[tabname] = textarea;
        });
    }

    registerPrompt('txt2img', 'txt2img_prompt');
    registerPrompt('txt2img', 'txt2img_neg_prompt');
    registerPrompt('img2img', 'img2img_prompt');
    registerPrompt('img2img', 'img2img_neg_prompt');
}

onUiLoaded(setupExtraNetworks);

var re_extranet = /<([^:]+:[^:]+):[\d.]+>/;
var re_extranet_g = /\s+<([^:]+:[^:]+):[\d.]+>/g;

function tryToRemoveExtraNetworkFromPrompt(textarea, text) {
    var m = text.match(re_extranet);
    var replaced = false;
    var newTextareaText;
    if (m) {
        var partToSearch = m[1];
        newTextareaText = textarea.value.replaceAll(re_extranet_g, function(found) {
            m = found.match(re_extranet);
            if (m[1] == partToSearch) {
                replaced = true;
                return "";
            }
            return found;
        });
    } else {
        newTextareaText = textarea.value.replaceAll(new RegExp(text, "g"), function(found) {
            if (found == text) {
                replaced = true;
                return "";
            }
            return found;
        });
    }

    if (replaced) {
        textarea.value = newTextareaText;
        return true;
    }

    return false;
}

function cardClicked(tabname, textToAdd, allowNegativePrompt) {
    var textarea = allowNegativePrompt ? activePromptTextarea[tabname] : gradioApp().querySelector("#" + tabname + "_prompt > label > textarea");

    if (!tryToRemoveExtraNetworkFromPrompt(textarea, textToAdd)) {
        textarea.value = textarea.value + opts.extra_networks_add_text_separator + textToAdd;
    }

    updateInput(textarea);
}

function saveCardPreview(event, tabname, filename) {
    var textarea = gradioApp().querySelector("#" + tabname + '_preview_filename  > label > textarea');
    var button = gradioApp().getElementById(tabname + '_save_preview');

    textarea.value = filename;
    updateInput(textarea);

    button.click();

    event.stopPropagation();
    event.preventDefault();
}

function extraNetworksSearchButton(tabs_id, event) {
    var searchTextarea = gradioApp().querySelector("#" + tabs_id + ' > div > textarea');
    var button = event.target;
    var text = button.classList.contains("search-all") ? "" : button.textContent.trim();

    searchTextarea.value = text;
    updateInput(searchTextarea);
}

var globalPopup = null;
var globalPopupInner = null;
function popup(contents) {
    if (!globalPopup) {
        globalPopup = document.createElement('div');
        globalPopup.onclick = function() {
            globalPopup.style.display = "none";
        };
        globalPopup.classList.add('global-popup');

        var close = document.createElement('div');
        close.classList.add('global-popup-close');
        close.onclick = function() {
            globalPopup.style.display = "none";
        };
        close.title = "Close";
        globalPopup.appendChild(close);

        globalPopupInner = document.createElement('div');
        globalPopupInner.onclick = function(event) {
            event.stopPropagation(); return false;
        };
        globalPopupInner.classList.add('global-popup-inner');
        globalPopup.appendChild(globalPopupInner);

        gradioApp().appendChild(globalPopup);
    }

    globalPopupInner.innerHTML = '';
    globalPopupInner.appendChild(contents);

    globalPopup.style.display = "flex";
}

function extraNetworksShowMetadata(text) {
    var elem = document.createElement('pre');
    elem.classList.add('popup-metadata');
    elem.textContent = text;

    popup(elem);
}

function requestGet(url, data, handler, errorHandler) {
    var xhr = new XMLHttpRequest();
    var args = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
    xhr.open("GET", url + "?" + args, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var js = JSON.parse(xhr.responseText);
                    handler(js);
                } catch (error) {
                    console.error(error);
                    errorHandler();
                }
            } else {
                errorHandler();
            }
        }
    };
    var js = JSON.stringify(data);
    xhr.send(js);
}

function extraNetworksRequestMetadata(event, extraPage, cardName) {
    var showError = function() {
        extraNetworksShowMetadata("there was an error getting metadata");
    };

    requestGet("./sd_extra_networks/metadata", {page: extraPage, item: cardName}, function(data) {
        if (data && data.metadata) {
            extraNetworksShowMetadata(data.metadata);
        } else {
            showError();
        }
    }, showError);

    event.stopPropagation();
}
>>>>>>> 20ae71faa8ef035c31aa3a410b707d792c8203a3
