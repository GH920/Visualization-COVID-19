function cleanData(dataset) {
    dataset.columns.forEach(function(c) {
        if (c != '' && c != 'Province/State' && c != 'Country/Region') {
            dataset.forEach(function(d) {
                return d[c] = +d[c]
            })
        return dataset
        }
    });
    return dataset
};

d3.csv('novel-corona-virus-2019-dataset/confirmed_China.csv').then(function(confirmed) {
    var confirmed = cleanData(confirmed);
    d3.csv('novel-corona-virus-2019-dataset/deaths_China.csv').then(function(deaths) {
        var deaths = cleanData(deaths);
        d3.csv('novel-corona-virus-2019-dataset/recovered_China.csv').then(function(recovered) {
            var recovered  = cleanData(recovered);

            console.log(confirmed[0]);
            console.log(deaths[0]);
            console.log(recovered[0]);
            
            var latestData = confirmed.map(function(d) {
                cols = confirmed.columns;
                return {
                    name: d[cols[1]],
                    value: d[cols[cols.length - 1]],
                }
            });
            
            var geoMeta = {};
            confirmed.map(function(d) {
                cols = confirmed.columns;
                geoMeta[d[cols[1]]] = [d[cols[4]], d[cols[3]]];
            });

            console.log(latestData[0]);
            console.log(geoMeta)

            drawChart1(latestData);
            drawChart2(latestData, geoMeta);
        });
    });
});

d3.csv('novel-corona-virus-2019-dataset/growth_confirmed_China.csv').then(function(growth_confirmed) {
    var growth_confirmed = cleanData(growth_confirmed);

    console.log(growth_confirmed);
    drawChart3(growth_confirmed);
});



// $.ajax({
//     url: "novel-corona-virus-2019-confirmedset/confirmed_China.csv",
//     async: false,
//     success: function (csvd) {
//         confirmed = $.csv.toArrays(csvd);
        
//     },
//     confirmedType: "text",
//     complete: function() {
//         confirmed.forEach(function(d) {
//             if (d != confirmed[0]) {
//                 for (let i = 3; i < d.length; i++) {
//                     d[i] = Number(d[i]);
//                 }
//             }
//         })
//         return confirmed
//         // call a function on complete 
//     }
// });

// console.log(confirmed[2])



function drawChart1(data){
    var myChart = echarts.init(document.getElementById('chart-area'));
    
    var option = {
        title: {
            text: 'Choropleth Map: Total Confirmed Cases of COVID-19 in China'
        },
        tooltip: {
            formatter: 'Province: {b}<br/> Total: {c}',
            backgroundColor: 'rgba(95,158,160,0.75)',
            textStyle:{color:"#fff"} 
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['ivory', 'salmon', 'brown']
            }
        },
        series: [{
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: false,
                },    
                emphasis: {
                    show: true,
                    textStyle:{color:"#800080"}
                } 
            },
            itemStyle: {
                normal: {
                    borderWidth: .5,
                    borderColor: '#009fe8',
                    areaColor:"#ffefd5",
                },
                emphasis: {
                    borderWidth: .5,
                    borderColor: '#4b0082',
                    areaColor:"lightblue",
                }
            },
            data: data,
            nameMap: {
                '湖北': 'Hubei',
                '广东': 'Guangdong',
                '河南': 'Henan',
                '浙江': 'Zhejiang',
                '湖南': 'Hunan',
                '安徽': 'Anhui',
                '江西': 'Jiangxi',
                '山东': 'Shandong',
                '江苏': 'Jiangsu',
                '重庆': 'Chongqing',
                '四川': 'Sichuan',
                '黑龙江': 'Heilongjiang',
                '北京': 'Beijing',
                '上海': 'Shanghai',
                '河北': 'Hebei',
                '福建': 'Fujian',
                '广西': 'Guangxi',
                '陕西': 'Shaanxi',
                '云南': 'Yunnan',
                '海南': 'Hainan',
                '贵州': 'Guizhou',
                '天津': 'Tianjin',
                '山西': 'Shanxi',
                '甘肃': 'Gansu',
                '香港': 'Hong Kong',
                '辽宁': 'Liaoning',
                '吉林': 'Jilin',
                '新疆': 'Xinjiang',
                '内蒙古': 'Inner Mongolia',
                '宁夏': 'Ningxia',
                '台湾': 'Taiwan',
                '青海': 'Qinghai',
                '澳门': 'Macau',
                '西藏': 'Tibet',
                '南海诸岛': 'South China Sea Islands',
            }
        }],
    };
    
    myChart.setOption(option);
};

function drawChart2(latestData, geoMeta){
    var myChart = echarts.init(document.getElementById('chart-area2'));

    var data = latestData;

    var geoCoordMap = geoMeta;
    
    var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
    };

    option = {
        title: {
            text: 'Epicenters of spread in China',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: function(params) {
                return params.seriesName + '<br>' +
                    'Province: ' + params.name + '<br>' + 
                    'Total: ' + params.value[2];
            },
        },
        bmap: {
            center: [107, 33],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series : [
            {
                name: 'Confirmed Cases',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function (val) {
                    return Math.log(val[2]) ** 2 / 2;
                },
                label: {
                    formatter: '{b}',
                    // position: 'right',
                    show: false
                },
                itemStyle: {
                    color: 'purple'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function (val) {
                    return Math.log(val[2]) ** 2 / 2;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    formatter: '{b}',
                    // position: 'right',
                    show: true
                },
                itemStyle: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                },
                zlevel: 1
            }
        ]
    };;
    myChart.setOption(option);
    // if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    // }
};

function drawChart3(data){
    var timeline = data.columns.slice(5,);
    var myChart = echarts.init(document.getElementById('chart-area3'));
    
    var seriesList = [];
    var selectedLegend = {};
    
    for (let i = 0; i < data.length; i++) {
        dataArray = Object.values(data[i]);
        if (i > 2) {
            selectedLegend[dataArray[1]] = false
        }
        seriesList.push({
            name: dataArray[1],
            type: 'line',
            smooth: true,
            data: dataArray.slice(5,),
            markPoint: {
                data: [
                    {type: 'max', name: 'max'},
                ]
            },
        });
        
    };
    

    option = {
        title: {
            text: 'Daily Increment by Province',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: seriesList.name,
            orient: 'horizontal',
            type: 'scroll',
            // right: '0px',
            top: '7%',
            // bottom: '20%',
            selected: selectedLegend,
        },
        grid: {
            top: '20%'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name: 'Time',
            type: 'category',
            boundaryGap: false,
            data: timeline
        },
        yAxis: {
            name: 'Confirmed Cases',
            type: 'value',
        },
        series: seriesList,
    };
    
    myChart.setOption(option);
};


function drawChart4(data){
    var myChart = echarts.init(document.getElementById('chart-area3'));

    var itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    };

    var sizeFunction = function (x) {
        var y = Math.sqrt(x / 5e8) + 0.1;
        return y * 80;
    };
    // Schema:
    var schema = [
        {name: 'Income', index: 0, text: '人均收入', unit: '美元'},
        {name: 'LifeExpectancy', index: 1, text: '人均寿命', unit: '岁'},
        {name: 'Population', index: 2, text: '总人口', unit: ''},
        {name: 'Country', index: 3, text: '国家', unit: ''}
    ];

    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 1000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                label: {
                    color: '#999'
                },
                symbol: 'none',
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    color: '#bbb',
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false,
                    color: '#666',
                    borderColor: '#666'
                },
                emphasis: {
                    label: {
                        color: '#fff'
                    },
                    controlStyle: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },
                data: []
            },
            backgroundColor: '#404a59',
            title: [{
                text: data.timeline[0],
                textAlign: 'center',
                left: '63%',
                top: '55%',
                textStyle: {
                    fontSize: 100,
                    color: 'rgba(255, 255, 255, 0.7)'
                }
            }, {
                text: '各国人均寿命与GDP关系演变',
                left: 'center',
                top: 10,
                textStyle: {
                    color: '#aaa',
                    fontWeight: 'normal',
                    fontSize: 20
                }
            }],
            tooltip: {
                padding: 5,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            xAxis: {
                type: 'log',
                name: '人均收入',
                max: 100000,
                min: 300,
                nameGap: 25,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLabel: {
                    formatter: '{value} $'
                }
            },
            yAxis: {
                type: 'value',
                name: '平均寿命',
                max: 100,
                nameTextStyle: {
                    color: '#ccc',
                    fontSize: 18
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value} 岁'
                }
            },
            visualMap: [
                {
                    show: false,
                    dimension: 3,
                    categories: data.counties,
                    calculable: true,
                    precision: 0.1,
                    textGap: 30,
                    textStyle: {
                        color: '#ccc'
                    },
                    inRange: {
                        color: (function () {
                            var colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
                            return colors.concat(colors);
                        })()
                    }
                }
            ],
            series: [
                {
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[0],
                    symbolSize: function(val) {
                        return sizeFunction(val[2]);
                    }
                }
            ],
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };

    for (var n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n]);
        option.options.push({
            title: {
                show: true,
                'text': data.timeline[n] + ''
            },
            series: {
                name: data.timeline[n],
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.series[n],
                symbolSize: function(val) {
                    return sizeFunction(val[2]);
                }
            }
        });
    }

    myChart.setOption(option);
};
