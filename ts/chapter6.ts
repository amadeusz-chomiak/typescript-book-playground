const chapter6 = new Chapter('Import javascript libraries', 6, '187 - 212')
chapter6.create(() => {
    test('npm import declaration standard', '196 - 197', () => {
        logImportant('npm i @types/nameOfPackage')
    })
}) 