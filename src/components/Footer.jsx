import { Link } from "react-router-dom" // Добавляем Link
import LOGO_SRC from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип */}
          <div className="m-auto">
            <img src={LOGO_SRC} alt="Mike Auto Logo" className="h-40 mb-4" />
          </div>

          {/* Информация */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalog"
                  className="text-gray-300 hover:text-white transition"
                >
                  Каталог авто из Кореи
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-gray-300 hover:text-white transition"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-white transition"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>Телефон: +82 10-2329-7807</li>
              <li>
                E-mail:{" "}
                <a
                  href="mailto:gloryauto.kr@gmail.com"
                  className="text-gray-300 hover:text-white transition"
                >
                  gloryauto.kr@gmail.com
                </a>
              </li>
              <li>
                Адрес: 104호, 128-1 Jigok-ro, Danwon-gu, Ansan-si, Gyeonggi-do
                (Южная Корея)
              </li>
            </ul>
          </div>
        </div>

        {/* Дополнительная информация */}
        <p className="text-gray-500 text-sm mt-8">
          Информация на сайте о стоимости автомобилей носит информационный
          характер и не является публичной офертой. Цены могут изменяться в
          зависимости от валютных курсов и условий сторонних организаций. Для
          уточнения информации рекомендуем обращаться к менеджеру.
        </p>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} Glory Traders
        </p>
      </div>
    </footer>
  )
}

export default Footer
