const STAGENAME = "/api/v1"; // production for use test instead of local

export var allURLS: {} = {

    TERM_CONDITION:STAGENAME+'/term-condition',

    DETAILS_ONDEMAND_SALE:STAGENAME+'/ondemand-sales',

    DETAILS_RESERVATION_SALE:STAGENAME+'/reservation-sales',

    DRIVER_DETAILS:STAGENAME+'/driver-detail',

    CHFE_DETAILS:STAGENAME+'/chef-detail',
    
    DISTANCE_PRICE:STAGENAME+'/delivery-charge',
    
    SEND_OTP: STAGENAME + "/sendotp",

    VERIFY_OTP: STAGENAME + "/verifyotp",

    FORGOT_PASSWORD:STAGENAME+'/reset-password',

    CHANGE_PASSWORD:STAGENAME+'/change-password',

    EMAIL_LOGIN: STAGENAME + '/emaillogin',

    READ_ALL_CHEF:STAGENAME+"/chef",

    READ_ALL_DRIVER:STAGENAME+"/driver",

    READ_ALL_CUSTOMER:STAGENAME+"/customer",

    DOCUMENTS: STAGENAME+"/document",

    UPLOAD_DOCUMENTS: STAGENAME + '/chefdocuments',

    CHEF_LIST:  STAGENAME + '/chef-list',

    REGISTER_PERSONAL_DETAILS: STAGENAME + '/chef',

    USER_APPROVED: STAGENAME + '/user-appoved',

    SUPERADMIN_LIST : STAGENAME +'/user',

    READ_ALL_DISH: STAGENAME + '/dish',

    READ_ALL_CATEGORY: STAGENAME + '/category',
    
    ALL_CATEGORY: STAGENAME + '/category-list',

    READ_ALL_SUBCATEGORY:STAGENAME+'/sub-category',

    READ_ALL_DIETTYPE: STAGENAME + '/diet-type',

    READ_ALL_SUBDIETTYPE: STAGENAME + '/subdiet-type',

    UPLOAD_DISH_IMAGES: STAGENAME + '/dish/',

    MAKE_DISHES_AVAILABEL: STAGENAME + '/dish/',

    READ_ALL_CUISINE: STAGENAME + '/cuisine',

    READ_COMBO_DISHES: STAGENAME + '/combo',

    READ_PROMOTION: STAGENAME + '/promo',

    LISTING_ORDERS: STAGENAME + "/order",

    PROFILE_DETAILS: STAGENAME + "/my-profile",

    CHEF_AVAILABEL: STAGENAME + '/my-profile/',

    CHEF_RESERVATION: STAGENAME + '/reservation',

    UPLOAD_RESERVATION_IMAGES: STAGENAME + '/reservation/',

    // CHEF_SERVICE: STAGENAME + '/chef-service',

    LOGOUT: STAGENAME + '/logout',

    NOTIFICATION_DEVICE: STAGENAME + "/notification-device",

    UNASSIGN_ORDER: STAGENAME +'/unassigndriver-order',

    ASSIGN_DRIVER: '/assign-driver',
    
    ASSIGN_ORDER: STAGENAME +'/assign-order',
    
    DRIVER_AVAILABLE :'/driver-available',

    // READ_ALL_USER:STAGENAME +'/user',
    
    READ_ALL_USER:STAGENAME+'/subadmin',

    READ_ALL_PERMISSION:STAGENAME+'/permission',

    ORDER_CANCELLED:STAGENAME+'/order-cancel/',

    PROFILE:STAGENAME+'/profile',

    APP_VERSION:STAGENAME+'/app-version'

    // CREATEPAYMENTINTENT: "/create-payment-intent"

}