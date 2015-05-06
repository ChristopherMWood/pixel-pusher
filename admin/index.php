<link rel="stylesheet" href="admin.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

<div id="admin-header">
  <img src="../public/img/main_icon.png">
  <img src="../public/img/pixelpusher_logo_font.png"><h1 id="header-h1">Admin</h1>
</div>



<div id="tabs">
  <ul>
    <li><a href="#tabs-1">Controls</a></li>
    <!-- <li><a href="#tabs-2">Image Uploader</a></li>
    <li><a href="#tabs-3">Statistics</a></li> -->
  </ul>
  <div id="tabs-1">

    <p><i>Note: To use PixelPusher, start the PHP script StartPixelPusher.php on the server.</i></p>

    Pixel Push Single Image</br>
    <p>
      1. Select Image From Dropdown</br>
      2. Push Button to push pixels
    </p>

    <select id="image-select">
    <?php
    $mysqli = new mysqli("localhost", "root", "addhawk", "addhawk");
    if ($result = $mysqli->query("SELECT DISTINCT id FROM pixel;")) {
    $row = $result->fetch_row();
    echo "<option>" . $row[0] . "</option>";
    }
    ?>
  </select></br>
  <button id="start-button">Push Pixels</button></br></br>

    Pixel Push SlideShow</br>
    <p>
      1. Push Start to begin SlideShow</br>
      2. Push Stop to halt pixel pushing
    </p>
    <button onclick="playSlideshow();">Start Image Slideshow</button>
    <span id="slideshow-count"></span>
    </br>
    <button id="stop-button">Stop Slideshow</button>
  </div>
  <!-- <div id="tabs-2">
    <h1>Image Uploader</h1>
  </div>
  <div id="tabs-3">
    <h1>Statistics</h1>
  </div> -->
</div>



<script src="../public/js/jQuery/jquery-2.1.3.js"></script>
<script src="../public/js/jQuery/jquery-ui.min.js"></script>
<script src="admin_dashboard.js"></script>
<script>
  $(function() {
    $("#tabs").tabs();
  });
</script>
