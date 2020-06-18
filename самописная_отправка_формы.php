<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package test
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">

<?php
  //проверяем, существуют ли переменные в массиве POST
  if(!isset($_POST['phone']) and !isset($_POST['filter']) and !isset($_POST['service'])){
    function footag_func( $atts ){
      return "foo = ". $atts['foo'];
   }
   add_shortcode('footag', 'footag_func');
  ?>
  <main class="main"> 
    <form class="repair__form" name="repair" method="post">
      <input class="repair__input" required type="text" name="user_name" placeholder="ФИО" minlength="2" maxlength="32">
      <input class="repair__input" required type="tel" name="phone" placeholder="Телефон" pattern="^(\+7|8)\s?(\(\d{3}\)|\d{3})\s?[\-]?\d{3}[\-]?\d{2}[\-]?\d{2}$">
      <input class="repair__input" required type="email" name="email" placeholder="Адрес электронной почты" pattern="^[A-Za-z]((\.|-)?[A-Za-z0-9]+)+@[A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+$">
      <input class="repair__input" required type="datetime-local" name="date" placeholder="Желаемая дата и время показа">
      <button type="submit" class="repair__button">Отправить</button>
    </form>
  <?php
  } else {
  //показываем форму
  $user_name = $_POST['user_name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $date = $_POST['date'];
  $user_name = htmlspecialchars($user_name);
  $phone = htmlspecialchars($phone);
  $filter = htmlspecialchars($email);
  $service = htmlspecialchars($date);

  $user_name = urldecode($user_name);
  $phone = urldecode($phone);
  $filter = urldecode($email);
  $service = urldecode($date);

  $user_name = trim($user_name);
  $phone = trim($phone);
  $filter = trim($email);
  $service = trim($date);

  if (wp_mail("lyapindm@yandex.ru", "Заявка на прпосмотр системы iFORA", " Имя: ".$user_name.". Телефон:" .$phone.". Email: ".$email ." Дата просмотра: ".$date,"From: lyapindm@yandex.ru \r\n")){
      echo "Сообщение успешно отправлено";
    } else {
      echo "При отправке сообщения возникли ошибки";
    }
  }
  ?>
</main>
</div>

<?php get_footer(); ?>
