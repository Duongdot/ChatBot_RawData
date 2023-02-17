(function(KoreSDK){

    var KoreSDK=KoreSDK||{};

    var botOptionsWiz = {};
    botOptionsWiz.logLevel = 'debug';
    botOptionsWiz.koreAPIUrl = "https://bots.kore.ai";

    botOptionsWiz.JWTUrl = "/jwt_service";
    botOptionsWiz.userIdentity = uuidv4();// Provide users email id here
    botOptionsWiz.botInfo = { name: "Dropdown Demo", "_id": "st-18d99be6-d1c7-5b18-b778-fc2dee7f3ee8"  }; // bot name is case sensitive
    botOptionsWiz.clientId = "cs-6c9a6fa8-c621-5495-8893-e4bb3b935b4a";

    var widgetsConfig = {
        botOptions: botOptionsWiz
    };
    
    KoreSDK.widgetsConfig=widgetsConfig
})(window.KoreSDK);