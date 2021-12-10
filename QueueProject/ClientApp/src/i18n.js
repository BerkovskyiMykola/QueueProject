import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                Email: "Email",
                Firstname: "First name",
                Lastname: "Last name",
                Password: "Password",
                SignUp: "Sign Up",
                Home: "Home",
                Profile: "Profile",
                LogOut: "LogOut",
                Login: "Login",
                ListEmpty: "List is empty",
                Create: "Create",
                Edit: "Edit",
                Delete: "Delete",
                country: "Country",
                city: "City",
                street: "Street",
                postalCode: "Postal code",
                Actions: "Actions",
                CreateBackup: "Create Backup",
                RestoreDatabase: "Restore Вatabase",
                Addresses: "Addresses",
                OfficeName: "Office name",
                Info: "Info",
                description: "Description",


                "This is not a valid email. Example: example@example.com": "This is not a valid email. Example: example@example.com",
                "The field must be between 2 and 30 characters.": "The field must be between 2 and 30 characters.",
                "The field must be between 3 and 256 characters.": "The field must be between 3 and 256 characters.",
                "The password must be between 8 and 18 characters.": "The password must be between 8 and 18 characters.",
                "The field must be between 3 and 40 characters.": "The field must be between 3 and 40 characters.",

                "Bad Request": "Bad Request",
                "Not Found": "Not Found",
                "User with such Email exists": "User with such Email exists",
                "Email or password is incorrect": "Email or password is incorrect",
            }
        },
        ua: {
            translations: {
                Email: "Пошта",
                Firstname: "Ім'я",
                Lastname: "Прізвище",
                Password: "Пароль",
                SignUp: "Зареєструватись",
                Home: "Домашня сторінка",
                Profile: "Профіль",
                LogOut: "Вийти",
                Login: "Ввійти",
                ListEmpty: "Список пустий",
                Create: "Створити",
                Edit: "Редагувати",
                Delete: "Видалити",
                country: "Країна",
                city: "Місто",
                street: "Вулиця",
                postalCode: "Поштовий індекс",
                Actions: "Дії",
                CreateBackup: "Створити резервну копію",
                RestoreDatabase: "Відновити базу даних",
                Addresses: "Адреси",
                OfficeName: "Назва офіса",
                Info: "Інформація",
                description: "Опис",

                "This field is required!": "Це поле необхідне!",
                "This is not a valid email. Example: example@example.com": "Це не валідна пошта. Наприклад: example@example.com",
                "The field must be between 2 and 30 characters.": "Поле має містити від 2 до 30 символів.",
                "The field must be between 3 and 256 characters.": "The field must be between 3 and 256 characters.",
                "The password must be between 8 and 18 characters.": "Пароль має містити від 8 до 18 символів.",
                "The field must be between 3 and 40 characters.": "Поле має містити від 3 до 40 символів.",

                "Bad Request": "Поганий запит",
                "Not Found": "Не знайдено",
                "User with such Email exists": "Користувач із такою електронною поштою існує",
                "Email or password is incorrect": "Електронна адреса або пароль неправильні",
            }
        }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        useSuspense: false,
    }
});

export default i18n;
