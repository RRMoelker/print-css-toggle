const screenRules = [];
const printRules = [];

function simulatePrintMediaQuery(rules) {
    for ( const rule of rules.screenRules ) {
        rule.media.mediaText = 'disabled';
    }

    for ( const rule of rules.printRules) {
        rule.media.mediaText = 'screen';
    }
}

function restorePrintMediaQuery(rules) {
    for ( const rule of rules.screenRules ) {
        rule.media.mediaText = 'screen';
    }

    for ( const rule of rules.printRules) {
        rule.media.mediaText = 'print';
    }
}

function simulatePrintLink(sheet) {
    if (sheet.media === 'screen') {
        sheet.disabled = true;
    }
    if (sheet.media === 'print') {
        sheet.title = 'print-disabled';
        sheet.media = '';
    }
}

function restoreScreenLink(sheet) {
    if (sheet.media === 'screen') {
          sheet.disabled = false;
    }
    if (sheet.title === 'print-disabled') {
        sheet.title = '';
        sheet.media = 'print';
    }
}

function identifyCssRules() {
    const styleSheets = document.styleSheets;

    for ( const sheet of styleSheets ) {
        const rules = sheet.cssRules || sheet.rules; // IE <= 8 use "rules" property

        for ( const rule of rules ) {
            if ( rule.type == CSSRule.MEDIA_RULE ) {
                const media = rule.media;

                if ( rule.conditionText === 'print' ) {
                    printRules.push(rule);
                } else if ( rule.conditionText === 'screen' ) {
                    screenRules.push(rule);
                }
            }
        }
    }
    return {
        printRules,
        screenRules
    }
}

function simulatePrintMedia() {
    screenRules.length = 0;
    printRules.length = 0;
    const rules = identifyCssRules();
    simulatePrintMediaQuery(rules);
    for ( const sheet of document.getElementsByTagName("link")) {
        simulatePrintLink(sheet);
    }
}

function restoreScreenMedia() {
    const rules = { screenRules, printRules };
    restorePrintMediaQuery(rules);
    for ( const sheet of document.getElementsByTagName("link")) {
        restoreScreenLink(sheet);
    }
}

module.exports = {
    simulatePrintMedia,
    restoreScreenMedia
}
