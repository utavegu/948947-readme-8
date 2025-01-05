# Личный проект «Readme»

* Студент: [Антон Леонидович](https://up.htmlacademy.ru/nodejs-2/8/user/948947).
* Наставник: [Илиас Эззахид](https://htmlacademy.ru/profile/id2588943).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Проектирование веб-сервисов](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).

---------------

Полезные памятки:

Запуск приложения:
```
npx nx run user:serve
```
где "user" - имя приложения из директории apps 

Запускать команду из директории project

Либо поставить дополнение для VS-code - Nx Console (от nrwl) и запускать через него.

---------------

Пример создания библиотеки (также не забывай делать это из project!):

```
npx nx g @nx/node:library blog-models --directory libs/blog/models
npx nx generate @nx/node:library blog-post --directory libs/blog/blog-post
npx nx generate @nx/node:library pipes --directory libs/shared/pipes
npx nx generate @nx/node:library file-vault-config --directory libs/file-vault/config
```

Инициализировать Prisma (из директории libs/blog/models):

```
npx prisma init --datasource-provider postgresql
```

Проверить модель на корректность:
npx prisma format ./prisma/schema.prisma
(но вс-код расширение Prisma делает это автоматически)

Автоматически сгенерировать миграцию (из директории blog/models):
```
npx prisma migrate dev \
--name "Added model for Post" \
--schema ./prisma/schema.prisma \
--skip-generate
```

name - действие, которое произведет миграция с схемой БД

Команда `migrate dev` используется только на этапе разработки. Её нельзя применять в продуктовом режиме.

Аргументы:

* `--name` — название миграции
* `--schema` — путь к схеме
* `--skip-generate` — пропустить формирование клиента.

-----
Запуск Монги и её админки (также из project)

docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env up -d

Остановить и уничтожить контейнеры (Монги и её админки):
docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env down


Запуск Постгри и её админки:

```
docker compose \
--file ./apps/blog/docker-compose.dev.yml \
--env-file ./apps/blog/blog.env \
--project-name "typoteka-blog" \
up \
-d
```

Остановить и уничтожить контейнеры (Постгреса и её админки):
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "typoteka-blog" --env-file ./apps/blog/blog.env down

Запуск батареи для file-vault:
```
docker compose \
--file ./apps/file/file-vault.compose.dev.yml \
--env-file ./apps/file/file-vault.env \
--project-name "typoteka-file-vault" \
up \
-d
```
И похоже тут пора прибраться и сделать отдельную инструкцию для запуска всех сервисов. Ну либо дойти до главы апи-гэйтвэй/деплой и там уже посмотреть как сделать красиво.

------------------

npx nx run blog:db:lint

Чтобы запустить "db:lint" из apps/blog/project.json (аналог package.json, секции scripts, но для отдельного проекта монорепозитория)
Данная команда валидирует схему призмы

db:migrate - накатить миграцию (не для продакшена!)
db:reset - почистить данные в БД
db:generate - генерирует клиент призмы на основе схемы, чтобы можно было из кода обращаться к базе и выполнять различные операции. Пакет клиенты должен быть установлен - @prisma/client, а в настройках схемы должен быть указан аутпут для клиента (в случае с микросервисами, иначе бы он смотрел в стандартную директорию)

npx nx run blog:db:seed - наполнит БД блога моками (клиент призмы должен быть сгенерирован)

------

Админка Монги:
http://localhost:8081/

Сваггер юзеров:
http://localhost:3000/spec

Апи юзеров:
http://localhost:3000/api

------------

Новые полезные дополнения к VS-коду:
- Prisma (от Prisma)
- PostgreSQL (от Chris Kolkman)
- Nx Console (от nrwl)

------------

rdo - response data object (то, что улетает на фронт)
dto - data-transfer object (то, что прилетает с фронта)

----------------------------

Пакет fs-extra является расширением стандартного модуля `fs` в Node.js и добавляет дополнительные функции для работы с файловой системой, которые не включены в базовый модуль `fs`. Предоставляет дополнительную функциональность  и упрощает ряд задач: копирование файлов и директорий, удаление директорий, работа с JSON файлами и так далее.

Некоторые полезные возможности:

* Копирование файлов и директорий: fs-extra добавляет методы `copy` и `copySync`, упрощают копирование файлов и директорий.

* Удаление директорий. Методы `remove` и `removeSync` позволяют удалять файлы и директории, включая непустые директории.

* Работа с JSON файлами. Методы `readJson`, `readJsonSync`, `writeJson`, и `writeJsonSync` можно легко читать и записывать JSON файлы без необходимости вручную преобразовывать данные в JSON и обратно.

* Обработка путей. Методы `ensureFile`, `ensureFileSync`, `ensureDir`, и `ensureDirSync` убеждаются, что файл или директория существуют, и если нет, то создают их.

И так далее…

-----------------

ИТОГО, ЗАПУСК ВСЕХ МИКРОСЕРВИСОВ (ЧУТЬ ПОЗЖЕ ДОБАВЬ ЕЩЁ СЮДА ПОРТЫ РАЗНЫЕ И ЗАПУСТИ ВСЕХ ВМЕСТЕ):
Из директории project

1) Юзеры
Бэк:
npx nx run user:serve
База и её админка:
docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env up -d
Остановить их:
docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env down

2) Блог
Бэк:
npx nx run blog:serve
База и её админка:
docker compose \
--file ./apps/blog/docker-compose.dev.yml \
--env-file ./apps/blog/blog.env \
--project-name "typoteka-blog" \
up \
-d
Остановить их:
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "typoteka-blog" --env-file ./apps/blog/blog.env down

3) Файлы
Бэк:
npx nx run file:serve
База и её админка:
docker compose \
--file ./apps/file/file-vault.compose.dev.yml \
--env-file ./apps/file/file-vault.env \
--project-name "typoteka-file-vault" \
up \
-d

Остановить их:
docker compose --file ./apps/file/file-vault.compose.dev.yml --project-name "typoteka-file-vault" --env-file ./apps/file/file-vault.env down

4) Уведомления

Бэк:
npx nx run notification:serve

База, рэббит, почтовый сервис и их админки:
```
docker compose \
--file ./apps/notification/notify.compose.dev.yml \
--env-file ./apps/notification/notify.env \
--project-name "typoteka-notify" \
up \
-d

Остановить:
docker compose --file ./apps/notification/notify.compose.dev.yml --env-file ./apps/notification/notify.env --project-name "typoteka-notify" down
```
-----------------

По почтовому сервису:

Обратите внимание на секцию `ports`. Мы пробрасываем два порта: `8025` и `1083`.

Первый (`8025`) — порт SMTP-сервера. Именно с ним в будущем мы будем соединяться из нашего сервиса. На втором порту (`1085`) доступен веб-интерфейс для проверки отправленных писем (например, http://localhost:1085). Если добавить к адресу `/api/emails` (http://localhost:1085/api/emails) вы попадёте на REST-интерфейс. Полное описание REST-интерфейса доступно в Swagger — `http://localhost:1085/swagger-ui/index.html`.

Попробуйте отправить тестовое письмо, например, с помощью `cURL` (положил его в директорию нотификейшн - запускать оттуда):

```
curl smtp://localhost:8025 --mail-from a@iantonov.me --mail-rcpt keks@htmlacademy.local --upload-file ./email.txt
```

Соединяемся с локальным почтовым сервером и готовим письмо для `keks@htmlacademy.local`. Текст письма и заголовки в файле `email.txt`:

```
From: Igor Antonov <a@iantonov.me>
To: Keks <keks@htmlacademy.local>
Subject: Hello Keks
Date: Mon, 12 Dec 2022 08:00:00
Content-Type: text/html; charset=utf8

<html>
<body>
Hello, Keks!
</body>
```

Для отправки почтовых уведомлений потребуются дополнительные пакеты.
Основной из них: nodemailer. Он предоставляет всю необходимую
функциональность для отправки почты из приложений на Node.js. Для этого
пакета также потребуется установить описания типов — `@types/nodemailer`.
Последним пакетом установим `@nestjs-modules/mailer`. Это обёртка над
пакетом `nodemailer` для интеграции в приложение на Nest с несколькими
дополнительными функциями.

`nodemailer` поддерживает:

* Шаблоны почты. Поддерживает использование шаблонов
почты с помощью различных движков рендеринга, таких как: Handlebars,
Pug, EJS, Nunjucks и др.

* Вложения. Пакет позволяет прикреплять файлы к электронным письмам,
например, изображения или документы.

* Настройка SMTP. Поддерживает различные настройки SMTP: SSL,
авторизация и т.д.

* Кеширование. Поддерживает кеширование, что может повысить
производительность вашего приложения и уменьшить время ответа.

-----------------

По кролику:

Установит @golevelup/nestjs-rabbitmq 
1348668
Для взаимодействия с RabbitMQ потребуется отдельный пакет.
В составе Nest (также распространяется в виде пакета) есть официальный
пакет для работы с RabbitMQ в контексте микросервисов.

Можно воспользоваться им, но во многих случаях им не так удобно пользоваться.

Важные плюсы `@golevelup/nestjs-rabbitmq`:

1. Проще использовать. Декларативный интерфейс.
2. Готовые декораторы для использования разных паттернов взаимодействия
с RabbitMQ.
3. Интеграция с другими модулями.
4. Возможность использовать несколько очередей.

-----

Routing Key — это строка, которая используется для определения, какие очереди в RabbitMQ получат определённые сообщения. Когда producer отправляет сообщение в exchange, он также указывает `Routing Key`. Этот ключ связывает сообщение
с определённой очередью.

Обменник использует Routing Key для определения, какие очереди нужно отправить сообщение. Если Routing Key совпадает с Routing Key, связанным с очередью, сообщение отправляется в эту очередь.

Routing Key может быть любой строкой и может содержать произвольные символы, включая точки и слэши, которые могут быть использованы для организации Routing Key в иерархическую структуру.
