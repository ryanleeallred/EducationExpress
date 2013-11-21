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
});
$(".reading_4th_proficient").click(function() {
    loadNewMap('reading_4th_proficient');
});
$('.reading_8th_proficient').click(function() {
    loadNewMap('reading_8th_proficient');
});
$('.FY_2011').click(function() {
    loadNewMap('FY_2011');
});
$('.Change_2010_2011').click(function() {
    loadNewMap('Change_2010_2011');
});
$('.num_teachers_thous').click(function() {
    loadNewMap('num_teachers_thous');
});
$('.teacher_perc_bach').click(function() {
    loadNewMap('teacher_perc_bach');
});
$('.teacher_perc_edspecialist_or_doc').click(function() {
    loadNewMap('teacher_perc_edspecialist_or_doc');
});
$('.teach_3_to_0').click(function() {
    loadNewMap('teach_3_to_0');
});
$('.over_20').click(function() {
    loadNewMap('over_20');
});
$('.num_teachers_elem').click(function() {
    loadNewMap('num_teachers_elem');
});
$('.av_sal_thous').click(function() {
    loadNewMap('av_sal_thous');
});
$('.av_sal_sec').click(function() {
    loadNewMap('av_sal_sec');
});
$('.hours_day_k12_08').click(function() {
    loadNewMap('hours_day_k12_08');
});
$('.hours_day_k12_12').click(function() {
    loadNewMap('hours_day_k12_12');
});
$('.hours_year_k12_12').click(function() {
    loadNewMap('hours_year_k12_12');
});
$('.hours_day_elem_12').click(function() {
    loadNewMap('hours_day_elem_12');
});
$('.hours_day_sec_12').click(function() {
    loadNewMap('hours_day_sec_12');
});
$('.comp_perc_disabilities').click(function() {
    loadNewMap('comp_perc_disabilities');
});
$('.com_perc_econ_disadv').click(function() {
    loadNewMap('com_perc_econ_disadv');
});
$('.perc_bach_degree_25_plus').click(function() {
    loadNewMap('perc_bach_degree_25_plus');
});
$('.pop_dens').click(function() {
    loadNewMap('pop_dens');
});
$('.math_4th_proficient').click(function() {
    loadNewMap('math_4th_proficient');
});
$('.math_8th_proficient').click(function() {
    loadNewMap('math_8th_proficient');
});
$('.reading_4th_proficient').click(function() {
    loadNewMap('reading_4th_proficient');
});
$('.reading_8th_proficient').click(function() {
    loadNewMap('reading_8th_proficient');
});
$('.FY_2010').click(function() {
    loadNewMap('FY_2010');
});
$('.perc_change').click(function() {
    loadNewMap('perc_change');
});
$('.teacher_perc_less_bach').click(function() {
    loadNewMap('teacher_perc_less_bach');
});
$('.teacher_perc_mast').click(function() {
    loadNewMap('teacher_perc_mast');
});
$('.less_than_3').click(function() {
    loadNewMap('less_than_3');
});
$('.teach_10_to_20').click(function() {
    loadNewMap('teach_10_to_20');
});
$('.class_size_elem').click(function() {
    loadNewMap('class_size_elem');
});
$('.num_teachers_in_thous').click(function() {
    loadNewMap('num_teachers_in_thous');
});
$('.num_teachers_sec').click(function() {
    loadNewMap('num_teachers_sec');
});
$('.num_teachers_sec').click(function() {
    loadNewMap('math_8th_basic');
});
$('.av_sal_elem').click(function() {
    loadNewMap('av_sal_elem');
});
$('.enrollment_perc_k12_08').click(function() {
    loadNewMap('enrollment_perc_k12_08');
});
$('.enrollment_perc_k12_12').click(function() {
    loadNewMap('enrollment_perc_k12_12');
});
$('.days_year_k12_12').click(function() {
    loadNewMap('days_year_k12_12');
});
$('.enrollment_perc_elem_12').click(function() {
    loadNewMap('enrollment_perc_elem_12');
});
$('.enrollment_perc_sec_12').click(function() {
    loadNewMap('enrollment_perc_sec_12');
});
$('.completion_percent').click(function() {
    loadNewMap('completion_percent');
});
$('.comp_perc_limited_english').click(function() {
    loadNewMap('comp_perc_limited_english');
});
$('.perc_highschoolgrad_25_plus').click(function() {
    loadNewMap('perc_highschoolgrad_25_plus');
});
$('.Perc_Advanced_degree_25_plus').click(function() {
    loadNewMap('Perc_Advanced_degree_25_plus');
});

for(var i=0; i < DataTemplate.statesData.length; i++){

	}
	res.send(); 



});