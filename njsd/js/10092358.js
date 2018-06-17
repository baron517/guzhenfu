if (typeof doyoo == 'undefined' || !doyoo) {
    var d_genId = function() {
        var id = '',
            ids = '0123456789abcdef';
        for (var i = 0; i < 34; i++) { id += ids.charAt(Math.floor(Math.random() * 16)); }
        return id;
    };

    var doyoo = {
        env: {
            secure: true,
            mon: 'https://m9109.talk99.cn/monitor',
            chat: 'https://chat7713.talk99.cn/chat',
            file: 'https://yun-static.soperson.com/131221',
            compId: 20003274,
            confId: 10092358,
            workDomain: '',
            vId: d_genId(),
            lang: 'sc',
            fixFlash: 0,
            fixMobileScale: 0,
            subComp: 28106,
            _mark: 'f1c744ffdc95edd9845e29b82d655a45c387bb9ed189bb4ece8de26884bcf338388ef845f6331d48'
        },
        chat: {
            mobileColor: '#81B626',
            mobileHeight: 80,
            mobileChatHintBottom: 0,
            mobileChatHintMode: 0,
            mobileChatHintColor: '#81B626',
            mobileChatHintSize: 0,
            priorMiniChat: 0
        }

        ,
        monParam: {
            index: 4,
            preferConfig: 0,

            title: '\u5728\u7ebf\u5ba2\u670d',
            text: '<span style="font-family:Simsun;"><span style="background-color: rgb(244, 244, 244);">\u6b22\u8fce\u6765\u5230\u5f00\u5fc3\u590f\u4ee4\u8425</span></span>',
            auto: -1,
            group: '10077925',
            start: '00:00',
            end: '24:00',
            mask: false,
            status: true,
            fx: 0,
            mini: 1,
            pos: 0,
            offShow: 0,
            loop: 0,
            autoHide: 0,
            hidePanel: 0,
            miniStyle: '#0680b2',
            miniWidth: '340',
            miniHeight: '490',
            showPhone: 0,
            monHideStatus: [0, 0, 0],
            monShowOnly: '',
            autoDirectChat: -1,
            allowMobileDirect: 0,
            minBallon: 0,
            chatFollow: 1,
            backCloseChat: 0
        }




    };

    if (typeof talk99Init == 'function') {
        talk99Init(doyoo);
    }
    if (!document.getElementById('doyoo_panel')) {
        var supportJquery = typeof jQuery != 'undefined';
        var doyooWrite = function(html) {
            //document.writeln(html);
        }

        doyooWrite('<div id="doyoo_panel"></div>');


        doyooWrite('<div id="doyoo_monitor"></div>');


        doyooWrite('<div id="talk99_message"></div>')

        doyooWrite('<div id="doyoo_share" style="display:none;"></div>');
        doyooWrite('<link rel="stylesheet" type="text/css" href="css/oms.css?171107"></link>');
        doyooWrite('<script type="text/javascript" src="oms.js?180220" charset="utf-8"></script>');
    }
}