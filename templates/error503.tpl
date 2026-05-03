{{%AUTOESCAPE context="HTML"}}
<html>
<head>
<title>503 - Database Currently Unavailable</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: silver;
    font-family: sans-serif;
  }
  #container {
    text-align: center;
    padding-top: 40px;
  }
  #topmenu {
    background-color: #FFA500;
    padding: 6px;
    margin-bottom: 30px;
  }
  #error-box {
    display: inline-block;
    background-color: #fff8f0;
    border: 2px solid #FFA500;
    border-radius: 6px;
    padding: 30px 50px;
    margin-top: 20px;
  }
  h1 { margin-top: 0; }
  p { color: #444; line-height: 1.6; }
  .code { font-size: 4em; color: #FFA500; font-weight: bold; margin: 0; }
</style>
</head>
<body>
<div id="container">
  <div id="topmenu">OAstat Web</div>
  <div id="error-box">
    <p class="code">503</p>
    <h1>Database Currently Unavailable</h1>
    <p>
      The statistics database could not be reached.<br>
      Please try again in a few moments.
    </p>
    <p>If the problem persists, contact the site administrator.</p>
  </div>
</div>
</body>
</html>
