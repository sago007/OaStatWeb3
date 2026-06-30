{{%AUTOESCAPE context="HTML"}}
<html>
<head>
<base href="{{BASEHREF}}">
<title>{{TITLE}} - {{SUBTITLE}}</title>
<script src="{{STATIC_MEDIA}}/d3.v7.min.js"></script>
{{META_TAGS}}
</head>
<body  bgcolor="silver">
<div id="container" style="text-align:center;">
<center>
<H1>{{TITLE}}</H1>
<H2>{{SUBTITLE}}</H2>
<div id="topmenu" style="background-color:#FFA500;">
<a href=".">Summary</a> <a href="gamelist/0">Gamelist</a>
</div>
{{#BODY_ELEMENT_LIST}}
<div id="element" >
<h2>{{ELEMENT_TITLE}}</h2>
{{BODY_ELEMENT:none}}
</div>
{{/BODY_ELEMENT_LIST}}
</center>
</div>
</body>
</html>
