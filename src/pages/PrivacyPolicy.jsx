import { Helmet } from "react-helmet"

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Glory Traders | Политика Конфидециальности</title>
        <link
          rel="canonical"
          href="https://www.glory-traders.org/privacy-policy"
        />
        <meta
          name="description"
          content="Политика конфидециальности сайта glory-traders"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Политика конфиденциальности
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            1. Общие положения
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Настоящая Политика конфиденциальности определяет, как ваша личная
            информация собирается, используется и хранится при посещении нашего
            сайта.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            2. Сбор данных
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Мы можем собирать следующие виды данных:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Имя и контактные данные</li>
            <li>Информация о посещениях и использовании сайта</li>
            <li>Другие данные, которые вы предоставляете добровольно</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            3. Использование данных
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Ваши данные используются для:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Предоставления услуг и поддержки</li>
            <li>Улучшения пользовательского опыта</li>
            <li>Связи с вами по запросам</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            4. Защита данных
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Мы принимаем соответствующие меры для защиты вашей информации от
            несанкционированного доступа и использования.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            5. Ваши права
          </h2>
          <p className="text-gray-700 dark:text-gray-300">Вы имеете право:</p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>Запрашивать доступ к вашим данным</li>
            <li>Требовать исправления или удаления данных</li>
            <li>Отозвать согласие на обработку данных</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            6. Контакты
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Если у вас есть вопросы по поводу этой Политики конфиденциальности,
            вы можете связаться с нами по адресу электронной почты:
            <a
              href="mailto:gloryauto.kr@gmail.com"
              className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 ml-1"
            >
              gloryauto.kr@gmail.com
            </a>
          </p>
        </section>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Последнее обновление: Январь 2025 года
        </p>
      </div>
    </>
  )
}

export default PrivacyPolicy
