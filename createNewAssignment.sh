echo '<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<!-- <link rel="stylesheet" type="text/css" href="css/'$1'.css"> -->
<link rel="stylesheet" href=
"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<script type="text/javascript" src="javascript/d3.v4.js">
</script>
<!-- <script src="http://d3js.org/d3.v3.min.js"></script> -->

<script type="text/javascript" src=
"javascript/jquery-3.1.1.min.js">
</script>
<script type="text/javascript" src="javascript/chartLib.js">
</script>
<script type="text/javascript" src="javascript/'$1'.js">
</script>
<!-- <script type="text/javascript" src="javascript/random.js"></script> -->
<title></title>
</head>
<body>
<div class="container"></div>
</body>
</html>
' > $1'.html';

echo 'window.onload = function(){
  alert("NO CODE WRITTEN")
}' > 'javascript/'$1'.js';
touch 'css/'$1'.css';
