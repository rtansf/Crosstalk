var ctx_languages = {};
ctx_languages['Arabic'] = ['ar', 'sa'];
ctx_languages['Bulgarian'] = ['bg', 'bg'];
ctx_languages['Catalan'] = ['ca', 'es'];
ctx_languages['Chinese'] = ['zh-CHS', 'cn'];
ctx_languages['Chinese Simplified'] = ['zh-CHS', 'cn'];
ctx_languages['Chinese Traditional'] = ['zh-CHT', 'tw'];
ctx_languages['Czech'] = ['cs', 'cz'];
ctx_languages['Danish'] = ['da', 'dk'];
ctx_languages['Dutch'] = ['nl', 'nl'];
ctx_languages['English'] = ['en', 'us'];
ctx_languages['Estonian'] = ['et', 'ee'];
ctx_languages['Finnish'] = ['fi', 'fi'];
ctx_languages['French'] = ['fr', 'fr'];
ctx_languages['German'] = ['de', 'de'];
ctx_languages['Greek'] = ['el', 'gl'];
ctx_languages['Hebrew'] = ['he', 'il'];
ctx_languages['Hindi'] = ['hi', 'in'];
ctx_languages['Hungarian'] = ['hu', 'hu'];
ctx_languages['Indonesian'] = ['id', 'id'];
ctx_languages['Italian'] = ['it', 'it'];
ctx_languages['Japanese'] = ['ja', 'jp'];
ctx_languages['Korean'] = ['ko', 'kr'];
ctx_languages['Latvian'] = ['lv', 'lv'];
ctx_languages['Lithuanian'] = ['lt', 'lt'];
ctx_languages['Norwegian'] = ['no', 'no'];
ctx_languages['Polish'] = ['pl', 'pl'];
ctx_languages['Portuguese'] = ['pt', 'pt'];
ctx_languages['Romanian'] = ['ro', 'ro'];
ctx_languages['Russian'] = ['ru', 'ru'];
ctx_languages['Slovak'] = ['sk', 'sk'];
ctx_languages['Slovenian'] = ['sl', 'sl'];
ctx_languages['Spanish'] = ['es', 'es'];
ctx_languages['Swedish'] = ['sv', 'sv'];
ctx_languages['Thai'] = ['th', 'th'];
ctx_languages['Turkish'] = ['tr', 'tr'];
ctx_languages['Ukrainian'] = ['uk', 'ua'];
ctx_languages['Vietnamese'] = ['vi', 'vn'];

(function( $ ) {
  $.fn.crosstalk = function(options) {
  
     var settings = $.extend({
        'fromLang' : 'English',
        'toLang'   : 'French',
        'translateButton'   : false
     }, options);


      var doTranslate = function(source, target) {
         var fromLang = ctx_languages[settings.fromLang][0];
         var toLang = ctx_languages[settings.toLang][0];
         $.ajax({
            dataType: 'jsonp',
            data: 'appId=%227C6164893D7666BB221368C12BABCC6D469A5CC8%22&texts=[%22' + source +  '%22]&from=%22' + fromLang + '%22&to=%22'+ toLang + '%22&loc=en&ctr=UnitedStates&rgp=39222855',
            jsonp: 'oncomplete',
            url: 'http://api.microsofttranslator.com/v2/ajax.svc/TranslateArray',
            success: function (data) {
                   var translated = data[0].TranslatedText;
                   target.val(translated);
            }
         });
     };

     return this.each(function() {
         var fromCountryFlag = ctx_languages[settings.fromLang][1];
         var toCountryFlag = ctx_languages[settings.toLang][1];
         var buttonHtml = ''; 
         if (settings.translateButton) {
             buttonHtml = '<div class="xtalk_translate_button"><button>--></button></div>';
         }
         $(this).empty();
         $(this).append('<div class="xtalk_from_container">' +
                        '  <div class="xtalk_fromFlag xtalk_countryFlag"><img src="flags/' + fromCountryFlag + '.gif"/></div>' +
                        '  <div class="xtalk_fromText"><textarea class="xtalk_tlateSource"></textarea></div>' +
                        '</div>' +
                        buttonHtml +
                        '<div class="xtalk_to_container">' +
                        '  <div class="xtalk_toFlag xtalk_countryFlag"><img src="flags/' + toCountryFlag + '.gif"/></div>' +
                        '  <div class="xtalk_toText"><textarea class="xtalk_tlateTarget" id="target"></textarea></div>' +
                        '</div>');

         if (settings.translateButton) {
             $(this).find('button').click(function() {
                 var sib = $(this).parent().siblings();
                 var source = sib.find('.xtalk_tlateSource').val();
                 var target = sib.find('.xtalk_tlateTarget');
                 doTranslate(source, target);
             });
         } else {
             $(this).find('.xtalk_tlateSource').keypress(function(event) {
                 if ( event.which == 13 ) {
                     event.preventDefault();
                     var source = $(this).val();
                     var sib = $(this).parent().siblings();
                     var target = $('#target');
                     doTranslate(source, target);
                 } 
             });
         }
     });

  };
})(jQuery);