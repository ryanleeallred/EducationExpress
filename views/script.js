$(document).ready(function() {


var localStates = null;
$.get('/states', function(data) {
	localStates = data;
});


var loadNewMap = function(col) {
    var max = 0;
    var min = null;
    $.each(localStates, function(index, state) {
        var stateName = state.Region;
        var data = state[col] || 0;
        if (data > max) {
            max = data-1;
        }
        if (data < min || min === null) {
            min = data;
        }
        $.each(statesData.features, function(count, stateData) {
            if (stateData.properties.name == stateName) {
                stateData.properties.density = Math.round(data);
            } 
        });
    });
    
    var range = (max-min)/8;
    
    grades = [];
    for (var i = 0; i<8; i++) {
        grades[i] = Math.round(min+(range*i));
    }

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
    
    map.removeControl(legend);
    
    legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);
    
    map.invalidateSize();
}

$('.Population').click(function () {
    loadNewMap('Population');
});
$('.math_4th_basic').click(function() {
    loadNewMap('math_4th_basic');
});
$('.math_8th_basic').click(function() {
    loadNewMap('math_8th_basic');
})
for(var i=0; i < DataTemplate.statesData.length; i++){

	}
	res.send(); 



});