import React from "react";

const About = () => {
  return (
    <div style={{ margin: "10px", border: "10px" }}>
      <h1 className="header-title">О проекте</h1>
      <h2 style={{color: "coral", textAlign: "center"}}>Приложение-сайт о кино AlexGrig Movie.</h2>
      <ol style={{color: "white", lineHeight: "2"}}>
        <li>
          Приложение работает с API, предоставляемым https://themoviedb.org.
          Данное приложение загружает 1 страницу(20 фильмов) с фильмами (с
          помощью axios), извлекает необходимые данные и выводит списком на
          главную страницу.
        </li>
        <li>
          Одновременно на странице может быть отображено 6 фильмов (сетка 2 Х
          3). По стрелке "Дальше" список отображает следующую часть загруженного
          контейнера с фильмами и так в цикле по кругу.
        </li>
        <li>
          Отдельной кнопкой реализована задгрузка нового контейнера с фильмами.
        </li>
        <li>
          Есть слайдер, который работает только со стартовым списком новинок.
        </li>
        <li>Внизу отдельным списком выводятся топ рейтинговые фильмы.</li>
        <li>Реализована фильтрация по жанрам.</li>
        <li>Реализован поиск интересующего фильма.</li>
        <li>
          Есть возможность перейти на страницу с фильмом, по кнопке "Подробней"
          или по изображению постера.
        </li>
        <li>
          На странице с фильмом можно ознакомиться с разными интересными
          подробностями о фильме.
        </li>
        <li>
          Можно посмотреть официальный ролик фильма (т.к. русских очень мало, я
          решил загружать оригинальный англоязычный трейлер).
        </li>
        <li>Отображается список главных актёров, снявшихся в фильме.</li>
        <li>
          Внизу отображается список схожих фильмов с представленным. За
          рендеринг отвечает тот же компонент, что и и за топ рейтинговые
          фильмы, т.к. они рендерятся независимо по разным маршрутам.
        </li>
        <li>
          При возврате на главную страницу сохраняется выбранный жанр, номер
          загруженного контейнера или список найденный через поиск.
        </li>
        <li>
          Реализованна возможность создать свой список фильмов к просмотру. По
          нажатию кнопки "Добавить", вы создаёте свою таблицу фильмов, которая
          сохраняется в локал сторе вашего браузера.
        </li>
        <li>
          Эту таблицу можно редактировать, внося к фильму доп. информацию в
          виде: вашей оценки, вашего отзыва и состояния о том, просмотрен фильм
          или ещё нет.
        </li>
      </ol>
    </div>
  );
};

export default About;
