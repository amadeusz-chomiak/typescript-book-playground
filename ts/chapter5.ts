const chapter5 = new Chapter('Declaration files', 5, '167')
chapter5.create(() => {
    test('Basic declaration of global variable from js', '167 - 169', () => {
        logWarning('Without declaration file global.d.ts, this will trow an error, while getting variable from chapter5.js file')
        logWarning('It will not prevent from sending different variable type on run time')
        logImportant('It only show compiler promise of sended type')
        log(unknownArray)
    }) 
    test('local object declaration (namespace) | module', '175 - 177', () => {
        log('unknownObject.getDragon()', unknownObject.getDragon('gold'))
    })
    test('Rest cookbook list in book', '181 - 185', () => {
        logImportant('Look in book')
    })
}) 