# Тестовое задание - Pagination

Этот проект представляет собой простое веб-приложение с использованием Next.js для реализации постраничной навигации. Мы используем технологии Next.js (app router), Tailwind CSS и Axios для создания динамичного и стильного пользовательского интерфейса. Для пагинации и фильтрации используеися Query Parameters, [тестовое задание](https://github.com/ValantisJewelry/TestTaskValantis)

[Demo](https://pagination-psi-flame.vercel.app/)

## Используемые технологии

- [Next.js/React](https://nextjs.org/) - back/frontend
- [Tailwindcss](https://tailwindcss.com/) - CSS
- [Axios](https://axios-http.com/docs/intro) - http request

### Как запустить проект локально

Чтобы запустить проект локально, выполните следующие шаги:

1. Установите зависимости, выполнив команду:

```bash
npm install
```
2. Создайте файл .env в корне проекта и добавьте следующую строку, заменив Your password на ваш реальный пароль:
```.env | .env.local
NEXT_PUBLIC_PASS=Your password
```
3. Запустите проект, выполнив команду:
```bash
npm run dev
```
4. Откройте ваш браузер и перейдите по адресу http://localhost:3000 для просмотра проекта.

#### Структура проекта

```
src
|---app # Root Layout
|---components # Компоненты, используемые в проекте.
|---helpers # Вспомогательные утилиты и функции для обработки данных и логики.
|---ui # Компоненты пользовательского интерфейса
|---utils # API логика
```
Основная структура фильтрации находится в функции compareArray в /helpers
## Roadmap, точки роста

- Мобильная версия



## Authors

- write [@alexjamison](https://t.me/alexjamison) in nvim btw


## License

[MIT](https://choosealicense.com/licenses/mit/)

