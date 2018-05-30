var filterInput = document.querySelector('#filter-input'),
    filterOutput = document.querySelector('#filter-output'),
    json = $.getJSON('js/kladr.json');

filterInput.addEventListener('keyup', cityPool);
filterInput.addEventListener('click', cityPool);

function compare(full, part) {
    full = full.toLowerCase();
    part = part.toLowerCase();
    if (full.indexOf(part) !== 0) {
        return false;
    } else {
        return true;
    }
}

function cityPool() {
    let value = $('#filter-input').val().trim(),
        matchedCities = [],
        htmlText = '';
    if (value.length >= 0) {
        for (var i in json.responseJSON.Cities) {
            if (compare(json.responseJSON.Cities[i].City, value)) {
                matchedCities.push(json.responseJSON.Cities[i].City);
                htmlText += '<div class="filter-output">' + json.responseJSON.Cities[i].City + '</div>';
            } else {
                htmlText += '';
            }
        }
    }
    if (htmlText != 0) {
        filterOutput.innerHTML = htmlText;
    } else {
        htmlText += '<div id="filter-output-none" class="filter-output-none">Такого города нет, проверьте ввод.</div>';
        window.setTimeout(wrongCity, 1000);
        filterOutput.innerHTML = htmlText;
    }
    citySelect();
    citiesClose();
}

function citySelect() {
    $(".filter-output").on('click', function () {
        $("#filter-input").val($(this).html());
        $('div.filter-output').remove();
        return true;
    });
}

function citiesClose(e) {
    $(document).mouseup(function (e) {
        let cities = $('#filter-output'),
            noCities = $('#filter-output-none');
        if (!cities.is(e.target) && cities.has(e.target).length === 0) {
            $('div.filter-output').remove();
            $('div.filter-output-none').remove();
            return true;
        } else if (noCities.is(e.target)) {
            $('div.filter-output-none').remove();
            return true;
        }
    });
}

function wrongCity() {
    $('div.filter-output').remove();
    $('div.filter-output-none').remove();
    htmlText = '<div id="filter-output-none" class="filter-output-wrong">Выберите значение из списка!</div>';
    filterOutput.innerHTML = htmlText;
}




