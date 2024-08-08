const URL = process.env.REACT_APP_API_URL;

export const urls = {
    LOGIN_URL: `/jwt/login`,
    REFRESH_TOKEN_URL: `/jwt/refresh`,

    TERMINALS_URL: `/api/terminals`,
    SEARCH_TERMINALS_URL: `/api/terminal_search`,
    ADD_NEW_TERMINAL_URL: `/api/terminal`,
    CLOSE_TERMINAL_URL: "/api/terminal/close/",
    EXPORT_TERMINALS_URL: "/api/terminals_export",

    TRANSACTIONS_URL: `/api/transactions`,
    SEARCH_TRANSACTIONS_URL: `/api/transaction_search`,
    EXPORT_TRANSACTIONS_URL: `/api/transactions_export`,

    MCC_URL: `/api/mcc`,
    MCC_PAGE_URL: `/api/mcc_page`,

    CITIES_URL: `/api/cities`,
    CITIES_PAGE_URL: `/api/cities_page`,

    POS_MODELS_URL: `api/pos_models`,
    PAY_SYS_URL: `api/pay_sys`,
    TRANSACTION_TYPES_URL: `api/transaction_types`,
    STATUS_CODES_URL: `api/status_codes`,

    GET_TOKEN_URL: "",
    GET_USER_INFO_URL: "https://fakestoreapi.com/users/1",
    GET_USERS_URL: "",
    GET_TERMINALS_BY_PAGE_URL: "",
    GET_TRANSACTIONS_BY_PAGE_URL: "",
    GET_TERMINALS_TYPES_URL: "",
    GET_TERMINALS_REPORT: "",
    GET_TRANSACTIONS_REPORT: "",
    GET_BANKS_URL: "",
    GET_PAYMENT_SYSTEMS_URL: "",
    GET_TRANSACTION_TYPES_URL: "",
    GET_LANGUAGES_URL: "",
    GET_ROLES_URL: "",
    POST_NEW_TERMINAL_URL: "",
    POST_NEW_USER_URL: "",
    POST_NEW_BANK_URL: "",
    POST_FORGOT_PASSWORD_URL: "",
    PUT_TERMINAL_DATA_URL: "",
    PUT_USER_DATA_URL: "",
    PUT_BANK_DATA_URL: "",
    PUT_CHANGE_PASSWORD_URL: "",
    DELETE_TERMINAL_DATA_URL: "",
    DELETE_USER_DATA_URL: "",
    DELETE_BANK_DATA_URL: "",
};