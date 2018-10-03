
$("#noResultButton").on("click", function () {
    $('#results').css('display', 'none');
    $('#learnMore').css('display', 'block');
});

$(document).ready(function(){

    $('#itemcontain').addClass('fadein');
    $('.chart-container').addClass('fadein');
    $('.result-container').addClass('fadein');


});

var quotes = [
    'Try to buy less, think about if you REALLY need it!',
    'Buy things that will last, and that will keep its value after use!',
    'Choose items that are biodegradable and/or easily recyclable!',
    'How about finding a second hand option?',
    'Avoid unnecessary mixtures of clothing as these are more difficult to recycle.',
    'Mixture of materials can sometimes be more durable. \nBut make an informed decision!',
    'Look for ORGANIC and RECYCLED materials. \nThey are simply better!',
    'NO consumption is the BEST consumption!'
];

function randomLesson() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById("quote").innerHTML = quotes[randomNumber];
};

$(window).on('submit', function () {
    searchFunction()
    return false
})

function searchFunction(url) {

    var url = $('#url').val();
    if(url.length === 0){

        return
    }
    $('#search').css('display', 'none');
    $('#loading').css('display', 'block');

    randomLesson();

    var material = $('#allMaterial');
    var info = $('#info');
    $.get('https://api.allorigins.win/get?method=raw&url=' + encodeURIComponent(url) + '&callback=?', function (data) {

        //find matching pattern in html source code
        var patt1 = /([0-9]+% (cotton|wool|acrylic|polyester|polyamide|nylon|viscose|rayon|lyocell|spandex|modal|elastane))|((cotton|wool|acrylic|polyester|polyamide|nylon|viscose|lyocell|rayon|spandex|modal|elastane) [0-9]+%)/ig;

        var result = data.match(patt1);
        console.log(result);

        var lowercaseArray = result.map(function (item) {
            return item.toLowerCase();
        });

        //duplicate check
        final = lowercaseArray.filter(function (item, pos) {
            return lowercaseArray.indexOf(item) === pos;
        });


        console.log(final);

        //'not relevant material showing' bug fixed
        var count = 0;
        var percent = [];
        for(var i = 0; i <final.length; i++) {
            count += parseInt(final[i].split(" ")[1]);
            console.log(count);
            percent.push(final[i]);
            if (count === 100) {
                break;
            }
        }
        console.log(percent);

        //printing out all elements in 'final' array
        var string = '';
        for (var i = 0; i < percent.length; i++) {
            string += percent[i] + '\n';
        }

        //page change to result
        $('#loading').css('display', 'none');
        $('#results').css('display', 'block');

        $('#infoCotton').hide();
        $('#infoWool').hide();
        $('#infoPolyester').hide();
        $('#infoNylon').hide();
        $('#infoViscose').hide();
        $('#infoAcrylic').hide();

        $('#noResult').hide();

        material.text(string);


        for (var i = 0; i < percent.length; i++) {

            // order = 'material' + %

            var cottonMatches = final[i].match(/[0-9]+% cotton/);
            if (cottonMatches != null) {
                $("#infoCotton").show();
                datasets.push(dataDictionary.cotton);
            }
            var woolMatches = final[i].match(/[0-9]+% wool/);
            if (woolMatches != null) {
                $("#infoWool").show();
                datasets.push(dataDictionary.wool);

            }

            var polyesterMatches = final[i].match(/[0-9]+% polyester/);
            if (polyesterMatches != null) {
                $("#infoPolyester").show();
                datasets.push(dataDictionary.polyester);

            }

            var nylonMatches = final[i].match(/[0-9]+% nylon/);
            if (nylonMatches != null) {
                $("#infoNylon").show();
                datasets.push(dataDictionary.nylon);

            }

            var viscoseMatches = final[i].match(/[0-9]+% viscose/);
            if (viscoseMatches != null) {
                $("#infoViscose").show();
                datasets.push(dataDictionary.viscose);

            }

            var acrylicMatches = final[i].match(/[0-9]+% acrylic/);
            if (acrylicMatches != null) {
                $("#infoAcrylic").show();
                datasets.push(dataDictionary.acrylic);

            }

            // order = 'material' + %

            var cottonMatches = final[i].match(/cotton [0-9]+%/);
            if (cottonMatches != null) {
                $("#infoCotton").show();
                datasets.push(dataDictionary.cotton);
            }

            var woolMatches = final[i].match(/wool [0-9]+%/);
            if (woolMatches != null) {
                $("#infoWool").show();
                datasets.push(dataDictionary.wool);

            }

            var polyesterMatches = final[i].match(/polyester [0-9]+%/);
            if (polyesterMatches != null) {
                $("#infoPolyester").show();
                datasets.push(dataDictionary.polyester);

            }

            var nylonMatches = final[i].match(/nylon [0-9]+%/);
            if (nylonMatches != null) {
                $("#infoNylon").show();
                datasets.push(dataDictionary.nylon);
            }

            var viscoseMatches = final[i].match(/viscose [0-9]+%/);
            if (viscoseMatches != null) {
                $("#infoViscose").show();
                datasets.push(dataDictionary.viscose);
            }

            var acrylicMatches = final[i].match(/acrylic [0-9]+%/);
            if (acrylicMatches != null) {
                $("#infoAcrylic").show();
                datasets.push(dataDictionary.acrylic);

            }

            else {
                $("#noResultButton").show();
            }
        }
    });
};

var datasets = [
    {
        data: [0, 0, 0, 0, 0],
        label: "N/A",
        backgroundColor: "rgba(0, 50, 0, 0.1)",
        borderColor: "rgba(0, 50, 0, 0.1)",
        fill: true
    },
];

var dataDictionary ={
    "cotton":
        {
            data: [2, 6, 2, 5, 5],
            label: "Cotton",
            backgroundColor: "rgba(57, 165, 248, 0.5)",
            borderColor: "rgba(57, 165, 248, 0.1)",
            fill: true

        },
    "polyester":
        {
            data: [4, 1, 4, 1, 1],
            label: "Polyester",
            backgroundColor: "rgba(192, 149, 248, 0.5)",
            borderColor: "rgba(192, 149, 248, 0.5)",
            fill: true
        },
    "wool":
        {
            data: [1, 2, 1, 6, 6],
            label: "Wool",
            backgroundColor: "rgba(85, 150, 27, 0.5)",
            borderColor: "rgba(85, 150, 27, 0.5)",
            fill: true
        },
    "nylon":
        {
            data: [5, 5, 6, 2, 1],
            label: "Nylon",
            backgroundColor: "rgba(248, 236, 57, 0.5)",
            borderColor: "rgba(248, 236, 57, 0.5)",
            fill: true
        },
    "viscose":
        {
            data: [3, 4, 3, 3, 4],
            label: "Viscose",
            backgroundColor: "rgba(200, 0, 100, 0.5)",
            borderColor: "rgba(200, 0, 100, 0.5)",
            fill: true
        },
    "acrylic":
        {
            data: [6, 3, 5, 5, 1],
            label: "Acrylic",
            backgroundColor: "rgba(236, 125, 110, 0.5)",
            borderColor: "rgba(236, 125, 110, 0.5)",
            fill: true
        },
};

// var ctx = document.getElementById("myChart");
//
// var myRadarChart = new Chart(ctx, {
//     type: 'radar',
//     data: {
//         labels: ['Energy use', 'Water use', 'Greenhouse gas emissions', 'Waste water', 'Land use'],
//         datasets: datasets
//     },
//
//     options: options = {
//
//         scale: {
//             ticks: {
//                 beginAtZero: true,
//                 fontSize: 15
//             },
//             pointLabels: {
//                 fontSize: 20
//             },
//         },
//
//     }
//
// });



var ctx = document.getElementById("myChart");

var myRadarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Energy use', 'Water use', 'GHG Emissions', 'Waste water', 'Land use'],
        xAxisID: "x",
        yAxisID: "y",
        datasets: datasets
    },

    options: options = {

        scales: {
            yAxes: [{
                ticks: {
                    fontSize: 15,
                    fontFamily: 'Montserrat'
                }
            }]
        }

    }

});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

$(".refresh").on("click", function () {
    $('#learnMore').css('display', 'none');
    $('#search').css('display', 'block');
});
