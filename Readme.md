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

Пример создания библиотеки:

```
npx nx g @nx/node:library blog-models --directory libs/blog/models
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
