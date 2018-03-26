
Reveal.addEventListener( 'ready', function() {
    let ctx = document.getElementById('poll').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ["#4dba87", "#3096ff", "#e23237"],
                borderColor: "rgba(255, 255, 255, 0.4)"
            }]
        },

        options: {
            responsive: false,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            tooltips: {enabled: false}
        }
    });

    setInterval(function () {
        $.get('/stats', (data) => {
            var parsed = {};
            $.each(data, function (i, stat) {
                parsed[stat._id] = stat.count;
            });
            updateChart(chart, parsed.vue || 0, parsed.react || 0, parsed.angular || 0);
        });
    }, 2000)
});

function updateChart(chart,vue, react, angular) {
    chart.data.datasets[0].data = [vue, react, angular];
    chart.update();
    setNumber(vue, "vue");
    setNumber(react, "react");
    setNumber(angular, "angular");

}

function setNumber(numb, framework) {
    $("#poll-container").find(`.${framework}`).text(`${numb}`);
}

Reveal.addEventListener('slidechanged', function( event ) {
    if (event.currentSlide.hasAttribute('data-hide-meter') || event.currentSlide.parentElement.hasAttribute('data-hide-meter')) {
        $('#poll-container').hide();
    } else {
        $('#poll-container').show();
    }
});