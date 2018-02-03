<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  if ($request === "Great Divide Brewing") {
    $request = 'great-divide-brewing-company-denver';
  }
  if ($request === 'Denver Art Museum') {
    $request = 'denver-art-museum-denver-2';
  }
  if ($request === 'Voodoo Donuts Mile High') {
    $request = 'voodoo-doughnut-denver';
  }
  if ($request === 'Civic Center Park') {
    $request = 'civic-center-park-denver';
  }
  if ($request === '16th Street Mall') {
    $request = '16th-street-mall-denver-3';
  }

  function get_data($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer V6gG-2WIXNCp-23JV-zI6sNtz3Yj3QNCGcXlbsdwEJ48ZGdus7OvgEAHyhvDHYZnaXCxJClqfCZW_y1R2KAHvMh__HbDTYcDj24srL3Ryrqkt6CqUOFpD23TUlVyWnYx'));
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
  echo get_data('https://api.yelp.com/v3/businesses/'.$request);
?>