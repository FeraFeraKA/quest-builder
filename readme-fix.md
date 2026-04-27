# Frontend v1.0 Production Fix Checklist

Этот список собран по текущему состоянию `frontend` перед v1.0. Пункты отсортированы по риску: сначала то, что лучше не тащить в production.

## Release blockers

### 1. Закрыть audit vulnerabilities

- `pnpm audit --prod` нашел 4 уязвимости: 2 high и 2 moderate.
- Проблемные пакеты идут через `vite@8.0.2` и `postcss@8.5.8`.
- Обновить Vite минимум до patched version из audit, PostCSS должен подтянуться транзитивно.
- `@tailwindcss/vite`, `tailwindcss` и `vite` должны быть в `devDependencies`, потому что это build tooling, а не runtime-зависимости.

Файл: `frontend/package.json`

### 2. Защитить destructive actions

Сейчас удаление происходит слишком легко:

- квест удаляется сразу по клику;
- node/edge удаляются сразу по кнопке;
- node/edge удаляются по `Delete`/`Backspace` в graph.

Нужно добавить confirm modal, а лучше undo/soft-delete для критичных действий.

Файлы:

- `frontend/src/components/ui/QuestCard.tsx`
- `frontend/src/pages/Graph.tsx`
- `frontend/src/components/layout/Editor.tsx`

### 3. Исправить семантику карточки квеста

Сейчас карточка квеста сделана как `role="link"`, но внутри нее лежат настоящие кнопки. Это ломает клавиатурное поведение: Enter/Space на вложенных элементах может сработать как переход в graph.

Нужно разделить:

- отдельный `Link` или clickable area для открытия квеста;
- отдельный блок actions для `Play`, `Edit`, `Delete`;
- убрать `role="link"` с контейнера, если внутри есть интерактивные элементы.

Файл: `frontend/src/components/ui/QuestCard.tsx`

### 4. Сделать `Button` безопасным по умолчанию

HTML button по умолчанию имеет `type="submit"`. Сейчас кнопки "Назад" внутри форм могут случайно отправлять форму.

Нужно в компоненте `Button` поставить default `type="button"`, а submit-кнопки явно оставлять `type="submit"`.

Файлы:

- `frontend/src/components/ui/Button.tsx`
- `frontend/src/pages/CreateQuest.tsx`
- `frontend/src/pages/EditQuest.tsx`

### 5. Нормализовать API/auth error handling

Текущие проблемы:

- `requireAuth` редиректит на login при любой ошибке `getMe`, включая 500 или offline;
- `fetcher` ожидает JSON error body всегда;
- HTTP status и error code теряются для обычных ошибок;
- параллельные 401 могут запустить несколько refresh-запросов.

Нужно:

- бросать единый `ApiError` со status/code/message;
- обрабатывать non-JSON ответы и network errors;
- редиректить на login только при настоящем 401;
- сделать single-flight refresh token flow.

Файлы:

- `frontend/src/api/fetcher.ts`
- `frontend/src/main.tsx`
- `frontend/src/helpers/apiError.ts`

## Performance

### 6. Разбить JS bundle

`pnpm build` сейчас собирает один большой JS chunk:

- `617.17 kB` minified;
- `195.18 kB` gzip.

Нужно:

- добавить route-level lazy loading;
- вынести graph/editor в отдельный chunk, потому что `@xyflow/react` тяжелый;
- добавить bundle analyzer;
- ввести bundle budget в CI.

Файлы:

- `frontend/src/main.tsx`
- `frontend/src/pages/Graph.tsx`

### 7. Оптимизировать изображения и public assets

`frontend/public` весит примерно `6.3 MB`, `dist` после build примерно `9.5 MB`.

Что сделать:

- удалить неиспользуемый `panel-frame.png`;
- удалить неиспользуемые `Silkscreen.ttf`, Material Icons и JetBrains import, если они реально не нужны;
- убрать `.DS_Store` из `public`, чтобы он не попадал в `dist`;
- конвертировать тяжелые PNG в WebP/AVIF там, где это не ломает pixel-art;
- добавить preload для критичных assets: background, logo, button/input slices.

Файлы:

- `frontend/public`
- `frontend/index.html`
- `frontend/src/index.css`

### 8. Исправить CSS warning

Build предупреждает, что `@import` идет после правил, потому что Tailwind/XYFlow CSS вмешиваются в порядок.

Нужно убрать неиспользуемый Google Fonts import или перенести загрузку шрифта в `index.html` через `preconnect`/`stylesheet`.

Файл: `frontend/src/index.css`

## Accessibility

### 9. Связать labels с controls

`Input` рисует `<label>`, но не связывает его с `<input>` через `htmlFor/id`.

Нужно:

- генерировать или принимать `id`;
- ставить `htmlFor`;
- прокидывать `aria-invalid` и `aria-describedby` для ошибок.

Файл: `frontend/src/components/ui/Input.tsx`

### 10. Довести mobile menu до нормальной a11y-семантики

Сейчас hamburger button без понятного имени и состояния.

Нужно:

- `aria-label`;
- `aria-expanded`;
- `aria-controls`;
- закрытие по Escape;
- фокус внутри открытого меню.

Файл: `frontend/src/components/layout/Navbar.tsx`

### 11. Сделать модалки настоящими dialog

Модалки создания/редактирования квеста сейчас просто fixed div.

Нужно:

- `role="dialog"`;
- `aria-modal="true"`;
- `aria-labelledby`;
- focus trap;
- восстановление фокуса после закрытия;
- Escape должен работать на уровне dialog, не только формы.

Файлы:

- `frontend/src/pages/CreateQuest.tsx`
- `frontend/src/pages/EditQuest.tsx`

### 12. Добавить доступные статусы ошибок и загрузки

Ошибки сейчас выводятся обычными `<p>`, а loading bar не сообщает состояние assistive tech.

Нужно:

- `role="alert"` или `aria-live="polite"` для ошибок;
- `aria-busy` на формы/области загрузки;
- явные loading/empty/error states на страницах.

Файлы:

- `frontend/src/components/layout/GlobalLoadingBar.tsx`
- `frontend/src/components/ui/LoadingBar.tsx`
- формы и pages с mutations/queries.

## UX and resilience

### 13. Добавить route error boundaries

Сейчас в router нет `errorElement`/boundary. Runtime crash или loader error дадут плохой production UX.

Нужно добавить общий route error screen и отдельные fallback states для защищенных страниц.

Файл: `frontend/src/main.tsx`

### 14. Добавить нормальные loading и empty states

Примеры текущих дыр:

- dashboard не показывает понятный loading/empty state;
- graph не показывает состояние загрузки квеста;
- play/playtest не различают "загрузка", "нет стартовой ноды" и "ошибка".

Файлы:

- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/pages/Graph.tsx`
- `frontend/src/pages/Play.tsx`
- `frontend/src/pages/Playtest.tsx`

### 15. Вынести оставшиеся hardcoded strings в i18n

Остались русские строки прямо в компонентах:

- `"Создание..."`
- `"Обновление..."`

Файлы:

- `frontend/src/pages/CreateQuest.tsx`
- `frontend/src/pages/EditQuest.tsx`

## Testing and CI

### 16. Добавить test scripts

Сейчас в `frontend/package.json` есть только:

- `dev`;
- `build`;
- `lint`;
- `preview`.

Перед v1.0 нужен минимум:

- unit tests для `fetcher` и `useQuestTraversal`;
- integration tests для auth/forms;
- Playwright smoke: login, create quest, edit quest, graph node flow, play/playtest, delete confirmation;
- axe/a11y smoke хотя бы на главные страницы;
- CI gate: `lint`, `build`, `test`, `audit`, bundle budget.

Файл: `frontend/package.json`

## Cleanup

### 17. Удалить пустой файл

`frontend/src/helpers/unauthorizedError.ts` пустой. Удалить или реализовать, если он нужен.

### 18. Обновить frontend README

`frontend/README.md` все еще шаблонный Vite README. Для v1.0 нужен свой:

- как запускать frontend;
- какие env/proxy ожидания;
- как собрать production;
- какие проверки запускать перед релизом.

Файл: `frontend/README.md`

## Current verification snapshot

На момент ревью:

- `pnpm lint` проходит.
- `pnpm build` проходит, но предупреждает о большом chunk и CSS `@import`.
- `pnpm audit --prod` падает из-за vulnerabilities.

