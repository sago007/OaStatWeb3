{{%AUTOESCAPE context="HTML"}}
<html>
<head>

<link rel="stylesheet" type="text/css" media="screen" href="{{STATIC_MEDIA}}/css/ui-lightness/jquery-ui-1.10.3.custom.css" />
<link rel="stylesheet" type="text/css" media="screen" href="{{STATIC_MEDIA}}/css/ui.jqgrid.css" />
 
<style type="text/css">
html, body {
    margin: 0;
    padding: 0;
    font-size: 75%;
}
</style>


<script src="{{STATIC_MEDIA}}/js/jquery-1.9.0.min.js" type="text/javascript"></script>
<script src="{{STATIC_MEDIA}}/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="{{STATIC_MEDIA}}/js/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="{{STATIC_MEDIA}}/oastat_formatters.js" type="text/javascript"></script>
<script src="{{STATIC_MEDIA}}/oastat_common.js" type="text/javascript"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="{{STATIC_MEDIA}}/oastat_d3charts.js" type="text/javascript"></script>

<script type="text/javascript">
$(function () {
    $("#list").jqGrid({
        url: "datasource/killsbyweapon",
        datatype: "json",
        mtype: "GET",
        colNames: ["Weapon", "Kills"],
        colModel: [
            { name: "w",  formatter:weaponFormatter },
            { name: "c" }
        ],
        pager: "",
        sortname: "c",
        sortorder: "desc",
        viewrecords: true,
        gridview: true,
        autoencode: true,
        height: "100%",
        caption: "Kills by weapon"
    }); 

    renderWeaponPieChart('#chart_div', 'datasource/killsbyweapon?sidx=2&sord=DESC');
}); 

</script>

<title>{{TITLE}} - {{SUBTITLE}}</title>
{{META_TAGS}}
</head>
<body  bgcolor="silver">
<div id="container" style="text-align:center;">
<center>
<H1>{{TITLE}}</H1>
<H2>{{SUBTITLE}}</H2>
<div id="topmenu" style="background-color:#FFA500;">
<a href="{{ROOTPATH}}/.">Summary</a> <a href="{{ROOTPATH}}/gamelist/0">Gamelist</a>
</div>
{{#BODY_ELEMENT_LIST}}
<div id="element" >
<h2>{{ELEMENT_TITLE}}</h2>
{{BODY_ELEMENT:none}}
</div>
{{/BODY_ELEMENT_LIST}}
<div id="element" >
<h2>Kills by weapon</h2>
<div id="chart_div" style="width:500px; height:400px"></div>
</div>
<div id="element" >
<h2>Kills by weapon</h2>
<table id="list"><tr><td></td></tr></table> 
 <div id="pager"></div> 
</div>
</center>
</div>

</body>
</html>